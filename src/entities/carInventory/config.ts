import carFormFields from "./CarFormField";

export const carInventoryConfig = {
  title: "Car",
  fields: carFormFields,
  placeholder: "Search by Chasis No...",
  endpoint: "/car-inventory",
  contentType: "multipart/form-data",
  sortInitial: "createdAt-desc",
  sortOptions: [
    { value: "createdAt-desc", label: "Date Created (New to Old)" },
    { value: "createdAt-asc", label: "Date Created (Old to New)" },
    { value: "updatedAt-desc", label: "Date Updated (New to Old)" },
    { value: "updatedAt-asc", label: "Date Updated (Old to New)" },
    { value: "price-desc", label: "Price (High to Low)" },
    { value: "price-asc", label: "Price (Low to High)" },
    {
      value: "modelYear-desc",
      label: "Model Year (New to Old)",
    },
    {
      value: "modelYear-asc",
      label: "Model Year (Old to New)",
    },
    {
      value: "mileage-desc",
      label: "Mileage (High to Low)",
    },
    { value: "mileage-asc", label: "Mileage (Low to High)" },
  ],
  filterInitial: "all",
  filterOptions: [
    { value: "all", label: "All" },
    { value: "true", label: "Sold" },
    { value: "false", label: "Available" },
  ],
};
