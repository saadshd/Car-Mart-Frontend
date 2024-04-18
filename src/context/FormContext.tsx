import React from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { useContext } from "react";
// import { FormData } from "../components/crud/EntityForm";
import { FormData } from "../components/crud/EntityDialog";

interface FormContextProps {
  children?: React.ReactNode;
  register: UseFormRegister<FormData>;
  watch: UseFormWatch<FormData>;
  errors: FieldErrors<FormData>;
  control: Control<FormData>;
  handleClose: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage: File | null;
  handleImageRemove: () => void;
}

const FormContext = React.createContext<FormContextProps | undefined>(
  undefined
);

export const FormProvider: React.FC<FormContextProps> = (props) => {
  const { children, ...rest } = props;
  return <FormContext.Provider value={rest}>{children}</FormContext.Provider>;
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormContextProvider");
  }
  return context;
};
