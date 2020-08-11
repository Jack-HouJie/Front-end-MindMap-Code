/**
 * 判断字符串是否表示数值
 * @param {String} str 
 */
function isNumeric (str) {
  if (!str) {
    return false
  }
  let point_count = 0
  let e_count = 0

  let e_tag = false
  for (let i = 0; i < str.length; i++) {
    // 只能出现数字、符号位、小数点、指数位
    let reg_all = /[0-9eE.+-]/
    if (!reg_all.test(str[i])) {
      return false
    }
    // 小数点，指数符号不能出现在开头结尾
    if (i == 0 || i == str.length - 1) {
      let reg_eE = /[eE.]/
      if (reg_eE.test(str[i])) {
        return false
      }
    }
    // 统计 eE. 次数
    // 指数位出现后，小数点不允许在出现
    if (str[i] == '.') {
      point_count++
      if (e_tag) {
        return false
      }
    } else if (str[i] == 'e' || str[i] == 'E') {
      e_count++
      e_tag = true
    }
    // 符号位只能出现在开头和指数位后面
    if (str[i] == '+' || str[i] == '-') {
      if (i != 0 && str[i - 1] != "e" && str[i - 1] != "E") {
        return false
      }
    }

  }
  // 小数点，指数符号只能出现一次
  if (point_count > 1 || e_count > 1) {
    return false
  }
  return true
}
console.log(isNumeric("1+.21e3234"));