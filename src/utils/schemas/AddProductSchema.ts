import * as Yup from 'yup';
import { isRequiredMessage } from './validationVariables';

export const getAddProductSchema = (validateStock?: boolean) => (
  Yup.object({
    name: Yup.string().required(isRequiredMessage),
    description: Yup.string().required(isRequiredMessage),
    images: Yup.mixed().test('non-empty', isRequiredMessage, (value) => {
      return (
        value !== '' &&
        value !== null &&
        value !== undefined &&
        !(Array.isArray(value) && value.length === 0)
      );
    }),
    category_id: Yup.string().required(isRequiredMessage),
    stock: validateStock ? Yup.number().required(isRequiredMessage) : Yup.mixed().nullable(),
    price:Yup.string()
      .required("Price is required")
      .test("is-valid-number", "Price must be a valid number", (value) => !isNaN(Number(value))),
    discounted_price: Yup
      .string()
      .nullable()
      .test("is-valid-number", "Discounted price must be a valid number", (value) => {
        if (!value) return true;
        return !isNaN(Number(value));
      })
      .test(
        "is-less-than-price",
        "Discounted price cannot be greater than price",
        function (value) {
          if (!value) return true; 
          const { price } = this.parent;
          return Number(value) <= Number(price);
        }
      ),
  })
)

export default getAddProductSchema;


