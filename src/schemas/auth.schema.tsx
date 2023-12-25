import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required").email(),
  password: yup.string().required("Password is required"),
});

export const forgotPassword = yup.object().shape({
  email: yup.string().required("Email is required").email(),
});

export const resetPasswordSchema = yup.object().shape({
  code: yup.string().required("Code is required"),
  password: yup.string().required("Password is required"),
  password_confirmation: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const signupSchema = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required").email(),
  phone: yup.string().required("Phone Number is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("Role is required"),
});

export const signupSchema2 = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required").email(),
  phone: yup.string().required("Phone Number is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("Role is required"),
  business_state_id: yup.string().required("State is required"),
  seller_category: yup.array().min(1, "Category is required"),
});

export const changePasswordSchema = yup.object().shape({
  old_password: yup.string().required("Old Password is required"),
  password: yup.string().required("Password is required"),
  password_confirmation: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
