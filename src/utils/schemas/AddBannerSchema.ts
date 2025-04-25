import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  image: Yup.mixed().test('non-empty', isRequiredMessage, (value) => {
    return (
      value !== '' &&
      value !== null &&
      value !== undefined &&
      !(Array.isArray(value) && value.length === 0)
    );
  }),  
});
