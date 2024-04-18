// import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import * as React from "react";
// import { FormProvider } from "../../context/FormContext";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { getSchema } from "../../schemas";

// export interface FormData {
//   [key: string]: string | string[] | Boolean[] | FileList;
// }

// type FormProps = {
//   handleClose: () => void;
//   children: React.ReactNode;
//   title: string;
// };

// const EntityForm = (props: FormProps) => {
//   const { handleClose, children, title } = props;

//   const schema = getSchema(title);

//   const form = useForm<FormData>({
//     resolver: yupResolver(schema),
//   });
//   const { register, handleSubmit, control, watch, formState, reset } = form;
//   const { errors } = formState;

//   const onSubmit = (data: FormData) => {
//     console.log("Form Submitted", data);
//     handleClose();
//     reset();
//   };

//   return (
//     <FormProvider
//       errors={errors}
//       watch={watch}
//       register={register}
//       control={control}
//       handleClose={handleClose}
//     >
//       <>
//         <form onSubmit={handleSubmit(onSubmit)} noValidate>
//           {children}
//         </form>
//         <DevTool control={control} />
//       </>
//     </FormProvider>
//   );
// };

// export default EntityForm;
