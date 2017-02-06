import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email, integer} from './validation';

const registerValidation = createValidator({
  firstname: [required, maxLength(20)],
  surname: [required, maxLength(20)],
  age: [integer],
  email: [required, email],
  password: [required]
});
export default memoize(10)(registerValidation);