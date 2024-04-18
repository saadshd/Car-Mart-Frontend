import { FormFieldProps } from "../../components/crud/EntityFormField";

const carFormFields: FormFieldProps[] = [
  {
    id: "chasisNo",
    label: "Chasis No",
    type: "text",
    name: "chasisNo",
    autoFocus: true,
  },
  {
    id: "engineNo",
    label: "Engine No",
    type: "text",
    name: "engineNo",
  },
  {
    id: "make",
    label: "Make",
    type: "text",
    name: "make",
  },
  {
    id: "modelName",
    label: "Model",
    type: "text",
    name: "modelName",
  },
  {
    id: "variant",
    name: "variant",
    label: "Variant",
    type: "text",
  },
  {
    id: "price",
    name: "price",
    label: "Price",
    type: "number",
    startAdornment: "PKR",
  },
  {
    id: "modelYear",
    name: "modelYear",
    label: "Model Year",
    type: "number",
  },
  {
    id: "fuelType",
    name: "fuelType",
    label: "Fuel Type",
    defaultValue: "Petrol",
    type: "select",
    optionItems: ["Petrol", "Diesel", "Electric", "Hybrid", "LPG", "CNG"],
  },
  {
    id: "registeredIn",
    name: "registeredIn",
    label: "Registered In",
    type: "select",
    defaultValue: "Punjab",
    optionItems: [
      "Un-Registered",
      "Balochistan",
      "Islamabad",
      "KPK",
      "Punjab",
      "Sindh",
    ],
  },
  {
    id: "registrationNo",
    name: "registrationNo",
    label: "Registration No",
    type: "text",
  },

  {
    id: "mileage",
    name: "mileage",
    label: "Mileage",
    type: "number",
    endAdornment: "KM",
  },
  {
    id: "assembly",
    name: "assembly",
    label: "Assembly",
    defaultValue: "Local",
    type: "select",
    optionItems: ["Local", "Imported"],
  },
  {
    id: "taxHistory",
    name: "taxHistory",
    label: "Tax History",
    type: "select",
    defaultValue: "Token/Tax Paid",
    optionItems: ["Token/Tax Paid", "Token Remaining", "Lifetime Token Paid"],
  },
  {
    id: "transmissionType",
    name: "transmissionType",
    label: "Transmission Type",
    type: "radio",
    optionItems: ["Automatic", "Manual"],
  },
  {
    id: "document",
    name: "document",
    label: "Documents",
    type: "checkbox",
    defaultValue: [false],
    optionItems: [
      "Original Book",
      "Auction Sheet Available",
      "Duplicate Book",
      "Duplicate Number Plate",
      "Fresh Import",
      "Complete Original File",
      "Duplicate File",
    ],
  },
  {
    type: "file",
    name: "image",
    label: "Uplaod Image",
  },
  // {
  //   label: "",
  //   name: "",
  //   type: "submit",
  // },
];

export default carFormFields;