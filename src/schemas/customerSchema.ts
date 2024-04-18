import * as yup from "yup";

export const customerSchema = () =>
  yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(20, "Name cannot exceed 20 characters")
      .matches(/^[A-Za-z\s']+$/, "Enter valid Name"),
    cnic: yup
      .number()
      .required("CNIC is required")
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("CNIC must be a number")
      .positive("CNIC must be a positive number")
      .integer("CNIC must be an integer")
      .test({
        name: "len",
        message: "CNIC must be 13 digits",
        test: (value) => {
          const stringValue = value?.toString() || "";
          return stringValue.length === 13;
        },
      }),
    address: yup.string().required("Address is required"),
    contact: yup
      .string()
      .required("Contact is required")
      .min(11, "Name must be 11 digits")
      .max(11, "Name must be 11 digits"),
  });
