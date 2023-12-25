import * as yup from "yup";

export const pay4meSchema = yup.object().shape({
  email: yup.string().required("Email is required").email(),
});

export const deliverySchema = yup.object().shape({
  delivery_code: yup.string().required("Delivery code is required").length(6),
});