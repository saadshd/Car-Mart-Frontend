import * as yup from "yup";
import { carSchema } from "./carSchema";
import { customerSchema } from "./customerSchema";
import { salesPersonSchema } from "./salesPersonSchema";

export const getSchema = (title: string) => {
  switch (title) {
    case "Car":
      return carSchema();
    case "Customer":
      return customerSchema();
    case "Sales Person":
      return salesPersonSchema();
    default:
      return yup.object();
  }
};
