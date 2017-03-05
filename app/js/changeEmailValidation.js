import memoize from 'lru-memoize';
import {createValidator, required, email} from './validation';

const changeEmailValidation = createValidator({
  email: [required, email]
});
export default memoize(10)(changeEmailValidation);