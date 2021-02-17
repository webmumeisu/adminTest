/**
 * 生成随机len位数字
 */
export const randomLenNum = (len) => {
  let random = ''
  random = Math.random().toString(36).substring(2)
  while (random.length < len) {
    random += Math.random().toString(36).substring(2)
  }
  random = random.substr(0, len)
  return random
}

export const dateFormat = (date, str) => {
  const o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds(), // millisecond
    D: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
  }

  let format = str
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
  }

  Object.keys(o).forEach(k => {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length))
    }
  })
  return format
}

// 计算n天未进出
export function notIntoDays(oldDate) {
  let date = new Date()
  let oldDate1 = oldDate.slice(0, 10) + ' ' + '00:00:00'
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  // var h = date.getHours()
  // var m1 = date.getMinutes()
  // var s = date.getSeconds()
  m = m < 10 ? ("0" + m) : m
  d = d < 10 ? ("0" + d) : d
  let nowDate = y + "-" + m + "-" + d + ' ' + '00:00:00'
  let time = new Date(nowDate).getTime() - new Date(oldDate1).getTime()
  return time / (24 * 60 * 60 * 1000)
}

export function excelDate() {
  const date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  m = m < 10 ? ("0" + m) : m
  d = d < 10 ? ("0" + d) : d
  return y + '' + m + '' + d
}

// 拼接幢、单元、房间号
export function build({ buildNo, unitNo, roomNo }) {
  let build = buildNo ? (buildNo + ((unitNo || roomNo) ? '幢-' : '幢')) : ''
  let unit = unitNo ? (unitNo + (roomNo ? '单元-' : '单元')) : ''
  let room = roomNo ? (roomNo + '房间') : ''
  return build + unit + room
}

export function addStar(str, num) {
  if (str && num) {
    str = str.substr(0, str.length - num)
    for (let i = 0; i < num; i++) {
      str += '*'
    }
  }
  return str
}

export function addStar2(str, type) {
  if (str && type) {
    if (type === '1') {
      str = str.slice(0, 3) + '****' + str.slice(-4)
    } else if (type === '2') {
      str = str.slice(0, 5) + '********' + str.slice(-5)
    }

    return str
  } else {
    return ''
  }
}
