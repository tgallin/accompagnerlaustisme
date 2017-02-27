import memoize from 'lru-memoize';
import {createValidator, required, email} from './validation';

const forgotPasswordValidation = createValidator({
  email: [required, email]
});
export default memoize(10)(forgotPasswordValidation);