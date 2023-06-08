/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * 一般导出文档的时候用到拼接日期
 * @param {string} str
 * @returns {年 月 日}
 */
export function excelDate() {
  const date = new Date()
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  m = m < 10 ? ('0' + m) : m
  d = d < 10 ? ('0' + d) : d
  return y + '' + m + '' + d
}
