import memoize from 'lru-memoize';
import {createValidator, required} from './validation';

var adminToyValidation = createValidator({
  ownerId: [required]
});

export default memoize(10)(adminToyValidation);