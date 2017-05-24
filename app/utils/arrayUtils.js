/* equivalent to _.find(users, ['active', false]);
  where
    var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];*/
export function matchesProperty(array, property) {
  if (!array || !property || !Array.isArray(property) || property.length !== 2)
    return null;

  var key = property[0];
  var value = property[1];
  var found = false;
  var i = 0;
  var obj = null;

  while (i < array.length && !found) {
    obj = array[i];
    found = obj && obj.hasOwnProperty(key) && obj[key] === value;
    i++;
  }
  if (found) {
    return obj;
  }
  return null;
}