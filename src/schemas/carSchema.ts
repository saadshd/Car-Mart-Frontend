import * as yup from "yup";
import { YEAR } from "../utils/constants";

export const carSchema = () =>
  yup.object({
    chasisNo: yup
      .string()
      .required("Chasis No is required")
      .min(2, "Chasis No must be atleast 2 characters")
      .max(20, "Chasis No cannot exceed 20 characters"),
    engineNo: yup
      .string()
      .required("Engine No is required")
      .min(2, "Engine No must be atleast 2 characters")
      .max(20, "Engine No cannot exceed 20 characters"),
    make: yup
      .string()
      .required("Make is required")
      .min(2, "Make must be atleast 2 characters")
      .max(20, "Make cannot exceed 20 characters"),
    modelName: yup
      .string()
      .required("Model is required")
      .min(2, "Model must be atleast 2 characters")
      .max(20, "Model cannot exceed 20 characters"),
    variant: yup.string().required("Variant is required"),
    price: yup
      .number()
      .required("Price is required")
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Price must be a number")
      .positive("Price must be a positive number")
      .integer("Price must be an integer")
      .min(50000, "Price must be at least 50,000")
      .max(100000000, "Price must be at most 10 Crore"),
    modelYear: yup
      .number()
      .required("Model Year is required")
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Model Year be a number")
      .positive("Model Year must be a positive number")
      .integer("Model Year must be an integer")
      .min(1923, "Model Year must be at least 1923")
      .max(YEAR, `Model Year must be at most ${YEAR}`),
    fuelType: yup.string().required("Please select Fuel Type"),
    registeredIn: yup.string().required("Please select Registered In"),
    registrationNo: yup.string().when("registeredIn", {
      is: (registeredIn: string) => registeredIn !== "Un-Registered",
      then: (carSchema) => carSchema.required("Registration No is required"),
    }),
    mileage: yup
      .number()
      .required("Mileage is required")
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .typeError("Mileage must be a number")
      .positive("Mileage must be a positive number")
      .integer("Mileage must be an integer")
      .min(100, "Mileage must be at least 100")
      .max(1000000, "Mileage cannot exceed 10 Lakh"),
    transmissionType: yup.string().required("Please select Transmission Type"),
    taxHistory: yup.string().required("Please select Tax History"),
    assembly: yup.string().required("Please select Assembly"),
    document: yup
      .array()
      .required("Select at least one option")
      .min(1, "Select at least one option"),
    // image: yup.string().required("Image required"),
    image: yup
      .mixed()
      .required("Image is required")
      .test("fileSize", "File size too large", (value) => {
        if (value && value instanceof File) {
          console.log(value);
          const maxSize = 500 * 1024;
          return value.size <= maxSize;
        }
        return true;
      })
      .test("fileType", "Invalid file type", (value) => {
        if (value && value instanceof File) {
          const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
          return allowedTypes.includes(value.type);
        }
        return true;
      }),
  });
