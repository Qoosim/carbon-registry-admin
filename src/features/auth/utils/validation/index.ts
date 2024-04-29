import * as yup from "yup";

export const signupSchema = yup.object({
  username: yup
    .string()
    .required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .min(11, "Phone number must be at least 10 characters")
    .required("Phone number is required"),
  // gender: yup.string().required("Gender is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required();

export const companyInfoSchema = yup.object({
    name: yup
      .string()
      .required('Name is required'),
    address: yup
      .string()
      .required("Address is required"),
    lga: yup
      .string()
      .required('LGA is required'),
    regNumb: yup
    .string()
    .required('Registration number is required'),
    industry: yup
      .string()
      .required('Industry is required'),
    website: yup
      .string()
      .required('Website is required'),
  })
  .required();

export const companyRoleSchema = yup.object({
    name: yup
    .string()
    .required('Name is required'),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    role: yup
      .string()
      .required("Password is required"),
  })
  .required();

  // Create Project inputs validation
  export const projectBaseInfoSchema = yup.object({
    headline: yup
    .string()
    .required('Headline is required'),
    full_name: yup
      .string()
      .required("Full Name is required"),
    lga: yup
      .string()
      .required('LGA is required'),
    desc: yup
      .string()
      .required("Project short description is required"),
    group_option: yup
      .string()
      .required("This field is required"),
    is_public: yup
      .string()
      .required("This field is required"),
    website: yup
      .string()
      .required("Website is required"),
  })
  .required();

  export const sectorSchema = yup.object({
    sector: yup
    .string()
    .required('Kindly select a sector')
  })
  .required();


  export const ghgProgramSchema = yup.object({
    sector: yup
    .string()
    .required('Kindly select a sector')
  })
  .required();

  export const ghgStartDateSchema = yup.object({
    date: yup
    .string()
    .required('Kindly select start date for the project')
  })
  .required();