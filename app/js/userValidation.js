import memoize from 'lru-memoize';
import {createValidator, required} from './validation';

const userValidation = createValidator({
  email: [required]
});
export default memoize(10)(userValidation);