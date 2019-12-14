const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December',
];
const dayOfWeekNames = [
  'Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday',
];
function twoDigitPad(num) {
  return num < 10 ? `0${num}` : num;
}
function formatDate(date, patternStr) {
  let newPatternStr = patternStr;
  if (!newPatternStr) {
    newPatternStr = 'M/d/yyyy';
  }
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const miliseconds = date.getMilliseconds();
  const h = hour % 12;
  const hh = twoDigitPad(h);
  const HH = twoDigitPad(hour);
  const mm = twoDigitPad(minute);
  const ss = twoDigitPad(second);
  const aaa = hour < 12 ? 'AM' : 'PM';
  const EEEE = dayOfWeekNames[date.getDay()];
  const EEE = EEEE.substr(0, 3);
  const dd = twoDigitPad(day);
  const M = month + 1;
  const MM = twoDigitPad(M);
  const MMMM = monthNames[month];
  const MMM = MMMM.substr(0, 3);
  const yyyy = `${year}`;
  const yy = yyyy.substr(2, 2);
  // checks to see if month name will be used
  newPatternStr = newPatternStr
    .replace('hh', hh).replace('h', h)
    .replace('HH', HH).replace('H', hour)
    .replace('mm', mm)
    .replace('m', minute)
    .replace('ss', ss)
    .replace('s', second)
    .replace('S', miliseconds)
    .replace('dd', dd)
    .replace('d', day)

    .replace('EEEE', EEEE)
    .replace('EEE', EEE)
    .replace('yyyy', yyyy)
    .replace('yy', yy)
    .replace('aaa', aaa);
  if (newPatternStr.indexOf('MMM') > -1) {
    newPatternStr = newPatternStr
      .replace('MMMM', MMMM)
      .replace('MMM', MMM);
  } else {
    newPatternStr = newPatternStr
      .replace('MM', MM)
      .replace('M', M);
  }
  return newPatternStr;
}

export default function log(filename, ...args) {
  const filepath = filename.split('?')[0];
  // let prefix = 'webpack-yourCode:///./';
  // if (filepath.slice(-3) === 'vue') {
  //   prefix = 'webpack-yourCode:///';
  // }

  // const file = prefix + filepath;
  if (typeof args[1] === 'object') {
    console.groupCollapsed(formatDate(new Date(), '[yy-MM-dd hh:mm:ss.S]:'), args[0]);
    Object.keys(args[1]).map(v => [`${v}:`, args[1][v]]).forEach((v) => {
      console.log(...v);
    });
    console.log('location:', filepath);
    console.groupEnd();
  } else {
    console.groupCollapsed(formatDate(new Date(), '[yy-MM-dd hh:mm:ss.S]:'), ...args);
    console.log('location:', filepath);
    console.groupEnd();
  }
}
