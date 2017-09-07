import memoize from 'lru-memoize';
import {createValidator, required, maxLength, atLeastOneValueMustBeChecked} from './validation';

var toyValidation = createValidator({
  name: [required, maxLength(30)]
}, {categories: [atLeastOneValueMustBeChecked]});

export default memoize(10)(toyValidation);