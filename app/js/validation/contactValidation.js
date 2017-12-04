import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email} from './validation';

const contactValidation = createValidator({
  firstname: [required, maxLength(20)],
  surname: [required, maxLength(20)],
  email: [required, email],
  subject: [required, maxLength(100)],
  message: [required, maxLength(2000)],
  captcharesponse : [required]
});
export default memoize(10)(contactValidation);