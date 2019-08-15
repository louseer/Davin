import {objDeepMerge} from '@/utils/index'

const importFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    import(`${fileName}`).then((module) => {
      const template = module.default
      resolve(template)
    }).catch( e=>{
      console.log(`导入图表模板：${fileName}出错：`)
      reject(e)
    })
  });
};

/**
 * 获取图表模板
 * @param {String} chartType 图表类型
 * @param {String} version 图表版本
 */
const getChartTemp = async function (chartType,version = '1',callback) {
  if(!chartType){
    console.log("chart type is required")
    return false
  }
  let p1 = await importFile(`./v${version}/${chartType}.js`);
  const p2 = await importFile(`./v${version}/common.js`);
  const p = Promise.all([p1,p2]).then(([template,commnTemp]) => {
    let temp = objDeepMerge({},commnTemp);
    temp = objDeepMerge(temp,template);
    return temp
  }).catch(e=>{
    console.log(e)
  })
  return p;
};


export {
  getChartTemp
}