import memoize from 'lru-memoize';
import {createValidator, required, email, integer, maxLength} from './validation';

const userValidation = createValidator({
  email: [required, email],
  firstname: [maxLength(30)],
  surname: [maxLength(30)],
  entityName: [maxLength(60)],
  mobile: [integer, maxLength(10)],
  landline: [integer, maxLength(10)],
  postalCode: [integer, maxLength(5)],
});
export default memoize(10)(userValidation);