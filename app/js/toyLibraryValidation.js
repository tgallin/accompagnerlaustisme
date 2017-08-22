import memoize from 'lru-memoize';
import {createValidator, required, integer, maxLength} from './validation';

const toyLibraryValidation = createValidator({
  street: [required],
  postalCode: [required, integer, maxLength(5)],
  city: [required]
});
export default memoize(10)(toyLibraryValidation);