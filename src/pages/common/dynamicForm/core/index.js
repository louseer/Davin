import { OPTIONTYPE } from './constants.js'
/**
 * 生成各项控件的基础配置项
 * TODO:考虑值为数组的状态
 */
export class Option {
  constructor(option,form){
    Object.assign(this,option)
    this._oldvalue = option.defaultVal
    this._value = option.defaultVal
    this.hide = option.hide || false;
    this._form = form; //值变化时的回调函数
  }

  set value (val){
    if(val === this._value){
      return;
    }
    this._oldvalue = this._value
    this._value = val
    this._form.update(this)
  }
  
  get value () {
    return this._value;
  }

  get oldvalue () {
    return this._oldvalue;
  }

  //支持简单值(string,number)得格式化,数组会将每个元素都格式化
  format(val) {
    if(typeof(val) === 'string' || typeof(val) === 'number'){
      return this.formatter.replace("{n}",val)
    }else if(Array.isArray(val)){
      let arr = []
      val.forEach((v) => {
        arr.push(this.format(v))
      })
      return arr
    }else{
      return val
    }
  }

  deformation(val) {
    //TODO:具体业务逻辑还没写
    if(typeof(val) === 'string' || typeof(val) === 'number'){
      return this.formatter.replace("{n}",val)
    }else if(Array.isArray(val)){
      let arr = []
      val.forEach((v) => {
        arr.push(this.format(v))
      })
      return arr
    }else{
      return val
    }
  }

  bindCallback (callback) {
    this.callback = callback
  }
}

export class Group {
  constructor(group){
    this.name = group.name;
    this.noview = group.noview || false;
    this.type = OPTIONTYPE.GROUP
    this.children = {}
  }

  setChildren (obj) {
    this.children = obj
  }

  setChild (obj) {
    this.children = Object.assign(this.children,obj)
  }

  bindCallback (callback) {
    for(var child in this.children){
      child.bindCallback(callback)
    }
  }
}

export class List {
  constructor({name}){
    this.name = name;
    this.type = OPTIONTYPE.LIST
    this.children = []
  }

  setChildren (obj) {
    this.children = obj
  }

  addChild () {
    this.children.push(this.children[0])
  }

  bindCallback (callback) {
    for(var child in this.children){
      child.bindCallback(callback)
    }
  }
}



/**
 * 生成用于表单视图渲染的{form表单项}，这个json规定了每个控件的默认值和change回调
 * @param {Object/Array} configurer 表单项配置器对象：普通对象或者json
 * @param {Function} callback 所有表单项值发生改变都会触发的通用回调，一般是提交动作
 * @param {String} nameprefix 当configurer是一个Array时，子配置组名字的统一前缀。
 */
export const generateOptions = (configurer,callback,nameprefix='') => {
  let islist = Array.isArray(configurer)
  let options = islist ? []:{}
  for(var k in configurer){
    let name = nameprefix ? `${nameprefix}${k}`:'';
    configurer[k].name = configurer[k].name || name;
    if(configurer[k].children){
      if(configurer[k].type === OPTIONTYPE.GROUP){
        options[k] = new Group(configurer[k])
        options[k].children = generateOptions(configurer[k].children,callback,nameprefix)
      }else if(configurer[k].type === OPTIONTYPE.LIST){
        options[k] = new List(configurer[k])
        options[k].children = generateOptions(configurer[k].children,callback,configurer[k].name)
      }
    }else{
      options[k] = new Option(configurer[k],callback)
    }
  }
  return options;
}


/**
 * 获取表单非默认值的选项
 * 暂时没用：用户存值必须存全量。以防版本升级修改默认值导致用户视图发生变化。
 * TODO: 是否对比的可枚举属性，尤其关照setter。
 * @param {Option / Group 对象组合的对象} options form表单项
 */
export const getNonDefaultSetting = (options) => {
  let configured = null;
  for(var k in options) {
    if(options[k].type === OPTIONTYPE.GROUP){
      let o = getNonDefaultSetting(options[k].children);
      if(null !== o){
        configured = configured || {}
        configured[k] = o
      }
    }else{
      if(options[k].value !== options.defaultVal){
        configured = configured || {}
        configured[k] = options[k].value
      }
    }
  }
  return configured
}

/**
 * 获取表单项当前的值。全量
 * @param {Option / Group 对象组合的对象} options form表单项
 */
export const getValues = (options) => {
  let obj = {};
  for(var k in options){
    if(options[k].type === OPTIONTYPE.GROUP){
      obj[k] = getValues(options[k].children)
    }else{
      obj[k] = Array.isArray(options[k].value) ? [...options[k].value]:options[k].value
    }
  }
  return obj 
}

/**
 * 快照：找出前后两次全量设置的不同。返回相对此次设置，前一次设置的不同项。
 * target 与 source 是属性完全相同的两个对象。暂时不考虑属性不同的对象。
 * 存差量考虑性能问题。存全量数据会非常庞大
 * @param {Object} target //前一次
 * @param {Object} source  //此次
 */
export const snapshot = (target,source) => {
  let back = null, //后退
  redo = null; //重做。记录source当前的变更
  for(var k in target){
    const type = Object.prototype.toString.call(target[k]);
    if("[object Object]" === type){
      let obj = snapshot(target[k],source[k])
      if(obj.back) {
        back = back || {}
        back[k] = obj.back
      }
      if(obj.forward) {
        redo = redo || {}
        redo[k] = obj.forward
      }
    }else if("[object Array]" === type){
      
    }else{
      if(target[k] !== source[k]){
        back = back || {}
        back[k] = Array.isArray(target[k]) ? [...target[k]]:target[k]
        redo = redo || {}
        redo[k] = Array.isArray(source[k]) ? [...source[k]]:source[k]
      }
    }
  }
  return {back,redo};
}

/**
 * 将确定的值合入表单项
 * @param {Option / Group 对象组合的对象} options form表单项
 * @param {Object} setting 设置值。普通对象
 */
// export const assignValue = (options,setting) => {
//   for(var k in setting){
//     if("[object Object]" === Object.prototype.toString.call(setting[k])){
//       assignValue(options[k].children,setting[k])
//     }else{
//       if(options[k]){
//         options[k]._value =  Array.isArray(setting[k]) ? [...setting[k]]:setting[k]
//       }
//     }
//   }
// }


export class DynamicForm {
  constructor(configurer,handlers,setting=null,callback){
    this.handlers = handlers; //表单项独立回调
    this.options = generateOptions(configurer,this,setting);
    this.callback = callback;
    if(setting){
      this.setSetting(setting);
    }
    this.step = -1;
    this.recording = true;
    this.snapshot = []; //快照，历史
  }

  setPrevious() {
    this.previousSetting = getValues(this.options); //上一步的全量设置；
  }

  setHistory(newSetting){
    if(!this.recording){ //assignValue赋值不打快照。只有用户操作才打快照。
      return;
    }
    this.snapshot = this.snapshot.slice(0,this.step) //当前步骤之后的所有快照都要失效。
    this.snapshot.push(snapshot(this.previousSetting,newSetting))
  }

  setSetting(setting) {
    this.assignValue(setting)
    setting = getValues(this.options)
    this.originSetting = setting
    this.previousSetting = setting
  }

  back(){
    let backSetting = this.snapshot[this.step].back;
    this.assignValue(backSetting)
    this.step--;
  }

  redo(){
    this.step++
    let redoSetting = this.snapshot[this.step].redo;
    this.assignValue(redoSetting)
  }

  /**
   * 将确定的值合入表单项
   * @param {Option / Group 对象组合的对象} options form表单项
   * @param {Object} setting 设置值。普通对象
   */
  assignValue (setting) {
    for(var k in setting){
      if(this.options[k]){
        if("[object Object]" === Object.prototype.toString.call(setting[k])){
          this.assignValue(setting[k])
        }else{
          this.options[k]._value =  Array.isArray(setting[k]) ? [...setting[k]]:setting[k]
          this.execHandler(this.options[k])
        }
      }
    }
  }
  
  execHandler(option){
    if(option.handle && 'function' === typeof(this.handlers[option.handle])){
      const {value,oldvalue} = option;
      this.handlers[option.handle].call(this.options,value,oldvalue)
    }
  }

  update(option) {
    this.step++ ;
    this.execHandler(option)
    let newSetting = getValues(this.options);
    this.setHistory(newSetting)
    this.callback && this.callback(newSetting)
  }
}
