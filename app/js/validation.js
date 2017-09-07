const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Adresse email invalide';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Obligatoire';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Doit être d'au moins ${min} caractères`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Ne doit pas dépasser ${max} caractères`;
    }
  };
}

export function integer(value) {
  if (value && !Number.isInteger(Number(value))) {
    return 'Doit être un entier';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Doit être une de ces valeurs : ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Ne correspond pas';
      }
    }
  };
}

function allValuesAreFalse(obj) {
  var allFalse = true;
  // var obj = [0: {id1:true}, 1: {id2:false}, 2: {id3:false}];
  for (var i in obj) {
    // i will be 0, 1 and 2
    // obj[i] will be {id1:true}, {id2:false} and {id3:false}
    if (obj[i]) {
      var keys = Object.keys(obj[i]);
      // keys will be [id1], [id2] and [id3]
      if (keys && keys.length > 0 && obj[i][keys[0]] === true) {
        allFalse = false;
        break;
      }
    }
  }
  return allFalse;
}

export function atLeastOneValueMustBeChecked(values) {
    if (!values || !values.length || allValuesAreFalse(values)) {
      return `Vous devez sélectionner au moins une valeur`;
    }
}

export function createValidator(rules, arrRules = {} ) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
     Object.keys(arrRules).forEach((key) => {
      const rule = join([].concat(arrRules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key]);
      if (error) {
        errors[key] ={ _error: error};
      }
    });

    return errors;
  };
}