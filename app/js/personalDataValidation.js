import memoize from 'lru-memoize';
import {createValidator, required, integer, maxLength} from './validation';

const personalDataValidation = createValidator({
  firstname: [required, maxLength(20)],
  surname: [required, maxLength(20)]
});
export default memoize(10)(personalDataValidation);