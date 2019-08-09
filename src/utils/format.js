/**
 * 时间格式化
 * @param {Number} timestamp 时间戳
 * @param {String} fmt 日期格式
 */
function timeFormat(timestamp, fmt) {
  const date = new Date(timestamp)
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
//转换树形结构
function nodeListToTree(list) {
  let DOList = list.sort((a, b) => b.zindex - a.zindex)
  for (let i = 0; i < DOList.length; i++) {
    if (DOList[i].type === 'group' && DOList[i].cid !== null) {
      DOList[i].children = []
      for (let j = 0; j < DOList.length; j++) {
        if (DOList[i].id === DOList[j].pid) {
          DOList[i].children.push(DOList[j])
        }
      }
      nodeListToTree(DOList[i].children)
    }
  }
  return DOList.filter(n => n.pid === null)
}

export { timeFormat, nodeListToTree }
