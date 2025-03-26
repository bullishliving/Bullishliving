import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export const ProductVariantSchema =  Yup.object({
  stock: Yup.string().required(isRequiredMessage),
  value: Yup.string().required(isRequiredMessage),
  type: Yup.string().required(isRequiredMessage),
});


export const variantschema = Yup.object().shape({
  items: Yup.array()
    .of(
      Yup.object().shape({
        stock: Yup.string().required(isRequiredMessage),
        value: Yup.string().required(isRequiredMessage),
        type: Yup.string().required(isRequiredMessage),
      })
    )
    .min(1, 'At least one item is required'),
});
