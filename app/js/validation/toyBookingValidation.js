import memoize from 'lru-memoize';
import {createValidator, required} from './validation';

const toyBookingValidation = createValidator({
  borrowerId: [required],
  toyId: [required],
  reference: [required]
});
export default memoize(10)(toyBookingValidation);