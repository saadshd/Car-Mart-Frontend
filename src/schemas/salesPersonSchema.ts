import * as yup from "yup";

export const salesPersonSchema = () =>
  yup.object({
    name: yup
      .string()
      .required("Name is required")
      .matches(/^[A-Za-z]{1,20}$/, "Enter valid Name"),
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
        message: "CNIC must be exactly 13 digits",
        test: (value) => {
          const stringValue = value?.toString() || "";
          return stringValue.length === 13;
        },
      }),
    address: yup.string().required("Address is required"),
    contact: yup
      .number()
      .required("Contact is required")
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Contact must be a number")
      .positive("Contact must be a positive number")
      .integer("Contact must be an integer")
      .test({
        name: "len",
        message: "Contact must be exactly 11 digits",
        test: (value) => {
          const stringValue = value?.toString() || "";
          return stringValue.length === 11;
        },
      }),
  });
