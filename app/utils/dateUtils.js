import { padStart } from './stringUtils';

export function formatToDate(value) {
  var result = null;
  if (value && value !== '') {
    var dateParts = value.split("/");
    // we want to convert DD/MM/YYYY to YYYY/MM/DD
    result = new Date(Date.UTC(dateParts[2], dateParts[1] - 1, dateParts[0], 0 , 0, 0));
  }
  return result;
}

export function formatDateToString(value) {
  var result = '';
  if (value && value !== '') {
    var date = new Date(value);
    var dateParts = [];
    dateParts.push(padStart(date.getUTCDate().toString(), "00"));
    dateParts.push(padStart((date.getUTCMonth() + 1).toString(), "00"));
    dateParts.push(date.getUTCFullYear());
    result = dateParts.join('/');
  } 
  return result;
}