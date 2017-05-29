
export function padStart(o, pad) {
  var str = "" + o;
  return pad.substring(0, pad.length - str.length) + str;
}

