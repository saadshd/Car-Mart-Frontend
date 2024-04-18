import { FormFieldProps } from "../../components/crud/EntityFormField";

const salesPersonFormFields: FormFieldProps[] = [
  {
    id: "name",
    name: "name",
    label: "Name",
    type: "text",
    autoFocus: true,
  },
  {
    id: "cnic",
    name: "cnic",
    label: "CNIC",
    type: "number",
  },
  {
    id: "address",
    name: "address",
    label: "Address",
    type: "text",
  },
  {
    id: "contact",
    name: "contact",
    label: "Contact",
    type: "number",
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

export default salesPersonFormFields;
