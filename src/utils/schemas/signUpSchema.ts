import * as Yup from 'yup';
import { isEmail, isRequiredMessage } from './validationVariables';

export default Yup.object({
  email: Yup.string().email(isEmail).required(isRequiredMessage),
  password: Yup.string().min(6, "Password must be at least 6 characters").required(isRequiredMessage),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required(isRequiredMessage),
});
