

/** 判断两个JSON相等
 * 
 * @param {Object} json1 
 * @param {Object} json2 
 */

function equalJSON (json1, json2) {
  return JSON.stringify(json1) === JSON.stringify(json2)
}