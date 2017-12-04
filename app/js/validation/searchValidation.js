import memoize from 'lru-memoize';
import {createValidator, required} from './validation';

const searchValidation = createValidator({
  searchText: [required]
});
export default memoize(10)(searchValidation);