import { useState } from "react";
import { Button, Typography, CardHeader } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FormFieldProps } from "./EntityFormField";
import EntityDialog from "./EntityDialog";

interface Props {
  title: string;
  formFields: FormFieldProps[];
  contentType?: string;
  onPost: (postData: any, id?: string) => void;
}

function EntityPageHeader(prop: Props) {
  const { title, formFields, contentType, onPost } = prop;
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <CardHeader
        title={
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
          >{`${title}s`}</Typography>
        }
        action={
          <Button
            variant="contained"
            color="primary"
            aria-label="add"
            onClick={handleOpenDialog}
          >
            <AddIcon />
            Add {title}
          </Button>
        }
      />
      {openDialog && (
        <EntityDialog
          title={title}
          formFields={formFields}
          open={openDialog}
          handleClose={handleCloseDialog}
          contentType={contentType}
          onPost={onPost}
        />
      )}
    </>
  );
}

export default EntityPageHeader;
