import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email, integer} from './validation';

const registerValidation = createValidator({
  firstname: [required, maxLength(20)],
  surname: [required, maxLength(20)],
  email: [required, email],
  password: [required],
  body: [required, maxLength(2000)]
});
export default memoize(10)(registerValidation);