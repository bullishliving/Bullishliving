import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export default Yup.object({
  name: Yup.string().required(isRequiredMessage),
  description: Yup.string().required(isRequiredMessage),
  images: Yup.mixed()
    .nullable() // Allow null values first
    .test('non-empty', isRequiredMessage, (value) => {
      return (
        value !== '' &&
        value !== null &&
        value !== undefined &&
        !(Array.isArray(value) && value.length === 0)
      );
    }),
  category_id: Yup.string().required(isRequiredMessage),
  price:Yup.string().required(isRequiredMessage),
});
