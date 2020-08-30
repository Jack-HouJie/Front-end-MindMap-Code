
/** 点击列表项得到索引
 * <ul id=”test”>
 *  <li>这是第一条</li>
 *  <li>这是第二条</li>
 *  <li>这是第三条</li>
 * </ul>
 */
function getIdx () {
  let lis = document.querySelectorAll('ul li')
  for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click', function () {
      console.log(i);
    })
  }
}
getIdx()
