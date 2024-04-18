import { FormFieldProps } from "../../components/crud/EntityFormField";

const customerFormFields: FormFieldProps[] = [
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
    id: "chasisNo",
    name: "chasisNo",
    label: "Car Chasis No",
    type: "multiSelect",
    // optionItems: [
    //   "MN 1558",
    //   "VR 1",
    //   "IDC 2558",
    //   "LHE 4567",
    //   "IPC 98",
    //   "IKL 58",
    // ],
  },
  // {
  //   label: "",
  //   name: "",
  //   type: "submit",
  // },
];

export default customerFormFields;
