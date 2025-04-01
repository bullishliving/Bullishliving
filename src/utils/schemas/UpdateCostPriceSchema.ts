import * as Yup from "yup";
import { isRequiredMessage } from "./validationVariables";

export const getUpdateCostPriceSchema = (price?: number) =>
  Yup.object({
    costPrice: Yup.string()
      .required(isRequiredMessage)
      .test(
        "is-less-than-price",
        "Discounted price cannot be greater than price",
        function (value) {
          if (!price) return true; 
          return Number(value) <= price 
        }
      ),
  });
