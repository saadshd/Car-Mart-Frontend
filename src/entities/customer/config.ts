import customerFormFields from "./CustomerFormField";

export const customerConfig = {
  title: "Customer",
  fields: customerFormFields,
  placeholder: "Search by CNIC...",
  endpoint: "/customer",
  sortInitial: "updatedAt-desc",
  sortOptions: [
    { value: "updatedAt-desc", label: "Date Updated (New to Old)" },
    { value: "updatedAt-asc", label: "Date Updated (Old to New)" },
    { value: "createdAt-desc", label: "Date Created (New to Old)" },
    { value: "createdAt-asc", label: "Date Created (Old to New)" },
  ],
};
