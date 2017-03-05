import memoize from 'lru-memoize';
import {createValidator, required, integer, maxLength} from './validation';

const individualAddressValidation = createValidator({
  street: [required],
  postalCode: [required, integer],
  city: [required]
});
export default memoize(10)(individualAddressValidation);