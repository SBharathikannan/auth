import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter Valid Email")
    .required("please enter Email"),
});
