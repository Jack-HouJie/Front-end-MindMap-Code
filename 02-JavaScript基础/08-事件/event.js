/** 视能力分别使用dom0||dom2||IE方式 来绑定事件
 * 
 * @param {Element} element 操作的元素
 * @param {Strign} type 事件名称 'click'
 * @param {Function} handler 事件处理程序
 */
function myAddEvent (element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false)
  }
  else if (element.attachEvent) {
    element.attachEvent('on' + type, function () {
      handler.call(element)
    })
  } else {
    element['on' + type] = handler
  }
}