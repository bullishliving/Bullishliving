import * as Yup from 'yup';
import { isRequiredMessage, isEmail } from './validationVariables';

export default Yup.object({
  email: Yup.string().email(isEmail).required(isRequiredMessage),
  firstName: Yup.string().required(isRequiredMessage),
  lastName: Yup.string().required(isRequiredMessage),
  country: Yup.string().required(isRequiredMessage),
  state: Yup.string().required(isRequiredMessage),
  address: Yup.string().required(isRequiredMessage),
  phone: Yup.string().required(isRequiredMessage),
});
