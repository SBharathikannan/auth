import * as Yup from "yup";

const ValidationSchema = Yup.object({
  name: Yup.string().min(3, "Username must be at least 3 characters"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter email"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password Required"),
});

export default ValidationSchema;
