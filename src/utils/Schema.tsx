import * as Yup from "yup";

export const validationSchemaAdd = Yup.object().shape({
  id: Yup.string().min(5, "Id must be at least 5 characters long!"),
  name: Yup.string()
    .min(5, "Id must be at least 5 characters long!")
    .required("This field is required!"),
  type: Yup.string()
    .oneOf(["Available", "Busy", "Unavailable"], "Invalid type value")
    .required("This field is required!"),
  color: Yup.string()
    .min(5, "Id must be at least 5 characters long!")
    .required("This field is required!"),
  size: Yup.number().required("This field is required!"),
  price: Yup.number().required("This field is required!"),
  description: Yup.string()
    .min(5, "Id must be at least 5 characters long!")
    .required("This field is required!"),
});

export const validationSchemaRegister = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum length is 2 characters")
    .matches(/^[A-Za-z\s]+$/, "Wrong Fullname")
    .required("This field is required!"),
  email: Yup.string()
    .email("Wrong Email")
    .matches(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, "Wrong Email")
    .required("This field is required!"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long!")
    .required("This field is required!"),
});
export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong Email")
    .matches(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, "Wrong Email")
    .required("This field is required!"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long!")
    .required("This field is required!"),
});
