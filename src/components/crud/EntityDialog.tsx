import { FC, useEffect, useState } from "react";
import {
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { FormProvider } from "../../context/FormContext";
import { getSchema } from "../../schemas";
import EntityFormField, { FormFieldProps } from "./EntityFormField";

type EntityDialogProps = {
  title: string;
  formFields: FormFieldProps[];
  open: boolean;
  handleClose: () => void;
  contentType?: string;
  onPost: (postData: any, id?: string) => void;
  id?: string | undefined;
  initialData?: FormData | null;
};

export type FormData = {
  [key: string]: string | string[] | File;
};

const EntityDialog: FC<EntityDialogProps> = ({
  title,
  formFields,
  open,
  handleClose,
  contentType = "application/x-www-form-urlencoded",
  onPost,
  id,
  initialData,
}) => {
  const schema = getSchema(title);
  const form = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { handleSubmit, register, watch, control, formState, reset } = form;
  const { errors } = formState;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (initialData) {
      console.log(initialData);
      reset(initialData);
    }
  }, [open, initialData]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    let postData;

    if (contentType === "multipart/form-data") {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]: [string, any]) => {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, value);
        }
      });
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      postData = formData;
    } else if (contentType === "application/x-www-form-urlencoded") {
      const urlSearchParams = new URLSearchParams();
      Object.entries(data).forEach(([key, value]: [string, any]) => {
        if (Array.isArray(value)) {
          if (key === "chasisNo") {
            value.forEach((item: string, index: number) => {
              urlSearchParams.append(
                `purchaseHistory[${index}][chasisNo]`,
                item
              );
            });
          } else {
            value.forEach((item, index) => {
              urlSearchParams.append(`${key}[${index}]`, item);
            });
          }
        } else {
          urlSearchParams.append(key, value);
        }
      });
      postData = urlSearchParams;
    } else {
      console.log("Content Type not correct");
      return;
    }

    if (id) {
      await onPost(postData, id);
    } else {
      await onPost(postData);
    }
    reset();
    handleClose();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        encType={contentType}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          <FormProvider
            errors={errors}
            register={register}
            watch={watch}
            control={control}
            handleClose={handleClose}
            handleFileChange={handleFileChange}
            selectedImage={selectedImage}
            handleImageRemove={handleImageRemove}
          >
            <Grid container spacing={2}>
              {formFields.map((formField: FormFieldProps, index) => (
                <EntityFormField {...formField} key={index} />
              ))}
            </Grid>
          </FormProvider>
          <DevTool control={control} />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              minWidth: 80,
              minHeight: 36,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              minWidth: 80,
              minHeight: 36,
            }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EntityDialog;
