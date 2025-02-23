import * as Yup from 'yup';
import { isEmail, isRequiredMessage } from './validationVariables';

export default Yup.object({
  email: Yup.string().email(isEmail).required(isRequiredMessage),
  phone: Yup.string().required(isRequiredMessage).min(9),
  name: Yup.string().required(isRequiredMessage),
});
