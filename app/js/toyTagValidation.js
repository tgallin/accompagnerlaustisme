import memoize from 'lru-memoize';
import {createValidator, required, maxLength} from './validation';

const toyTagValidation = createValidator({
  name: [required, maxLength(50)]
});
export default memoize(10)(toyTagValidation);