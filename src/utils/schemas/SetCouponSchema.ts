import * as Yup from 'yup';
import { isRequiredMessage, isEmail } from './validationVariables';

export default Yup.object({
  name: Yup.string().required(isRequiredMessage),
  amount: Yup.string().required(isRequiredMessage),
  assignee_name: Yup.string().required(isRequiredMessage),
  assignee_email: Yup.string().email(isEmail).required(isRequiredMessage),
  commission_percentage: Yup.string().required(isRequiredMessage),
});
