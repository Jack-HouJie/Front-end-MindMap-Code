/** 检测浏览器插件
 * 
 * @param {String} name 
 */
function hasPlugin (name) {
  name = name.toLowerCase();
  plu = navigator.plugins;
  plu_len = plu.length;
  for (var i = 0; i < plu_len; i++) {
    if (plu[i].name.toLowerCase.indexOf(name) > -1) {
      return true;
    }
  }
  return false;
}