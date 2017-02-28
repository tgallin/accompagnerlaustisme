import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email} from './validation';

const accountSettingsValidation = createValidator({
  firstname: [required, maxLength(20)],
  surname: [required, maxLength(20)],
  email: [required, email]
});
export default memoize(10)(accountSettingsValidation);