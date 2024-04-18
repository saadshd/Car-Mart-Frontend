import {
  Box,
  Typography,
  Grid,
  Button,
  Select,
  Checkbox,
  MenuItem,
  TextField,
  FormControl,
  FormGroup,
  FormLabel,
  FormHelperText,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  IconButton,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useForm } from "../../context/FormContext";
import MultiSelectField from "../shared/MultiSelectField";

export type FormFieldProps = {
  id?: string;
  label: string;
  type: string;
  optionItems?: string[];
  defaultValue?: string | Boolean[];
  startAdornment?: string;
  endAdornment?: string;
  name: string;
  watchField?: string;
  autoFocus?: boolean;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const EntiyFormField = (props: FormFieldProps) => {
  const {
    id,
    label,
    type,
    name,
    optionItems,
    defaultValue,
    startAdornment,
    endAdornment,
    autoFocus,
  } = props;
  const {
    register,
    errors,
    control,
    watch,
    selectedImage,
    handleFileChange,
    handleImageRemove,
  } = useForm();
  const registeredInValue = watch("registeredIn");

  if (type === "select" && optionItems) {
    return (
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <FormLabel id={id} sx={{ mb: 1 }}>
            {label}
          </FormLabel>
          <Select
            labelId={id}
            id={id}
            defaultValue={defaultValue ? defaultValue : ""}
            {...register(name)}
          >
            {optionItems.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText error={!!errors[name]}>
            {errors[name]?.message as string}
          </FormHelperText>
        </FormControl>
      </Grid>
    );
  }

  if (type === "multiSelect") {
    return (
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <FormLabel id={id} sx={{ mb: 1 }}>
            {label}
          </FormLabel>
          <MultiSelectField name={name} id={id!} />
        </FormControl>
      </Grid>
    );
  }

  if (type === "radio" && optionItems) {
    return (
      <Grid item xs={12} sm={6}>
        <FormControl sx={{ ml: 1 / 2 }}>
          <FormLabel id="demo-row-radio-buttons-group-label" sx={{ mb: 1 }}>
            {label}
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {optionItems.map((optionItem, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={optionItem}
                  control={<Radio />}
                  label={optionItem}
                  {...register(name)}
                />
              );
            })}
          </RadioGroup>
          <FormHelperText error={!!errors[name]}>
            {errors[name]?.message as string}
          </FormHelperText>
        </FormControl>
      </Grid>
    );
  }

  if (type === "checkbox" && optionItems) {
    return (
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormLabel id={id} sx={{ mb: 1 }}>
            {label}
          </FormLabel>
          <FormGroup row>
            {optionItems.map((optionItem, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox {...register(name)} />}
                label={optionItem}
                value={optionItem}
              />
            ))}
          </FormGroup>
          <FormHelperText error={!!errors[name]}>
            {errors[name]?.message as string}
          </FormHelperText>
        </FormControl>
      </Grid>
    );
  }

  if (type === "file") {
    return (
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "0.5px solid #ccc",
                  borderRadius: 2,
                  p: 2,
                  bgcolor: "#F9F9FA",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<AddPhotoAlternateIcon />}
                  >
                    {label}
                    <VisuallyHiddenInput
                      type={type}
                      multiple={false}
                      accept=".jpg, .png, .jpeg"
                      onChange={(e) => {
                        field.onChange(e);
                        handleFileChange(e);
                      }}
                    />
                  </Button>
                  <Typography mt={1} variant="body2">
                    (Max limit 500 KB)
                  </Typography>
                </Box>
                {selectedImage && (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt={selectedImage.name}
                    style={{
                      marginTop: "10px",
                      maxWidth: "70%",
                      borderRadius: "6px",
                    }}
                  />
                )}
              </Box>
            )}
          />

          <FormHelperText error={!!errors[name]}>
            {errors[name]?.message as string}
          </FormHelperText>
        </FormControl>
      </Grid>
    );
  }

  if (
    type === "text" &&
    name === "registrationNo" &&
    registeredInValue === "Un-Registered"
  ) {
    return null;
  }

  return (
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
        <FormLabel id={id}>{label}</FormLabel>
        <TextField
          autoFocus={autoFocus}
          margin="dense"
          id={id}
          type={type}
          {...register(name)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span>{startAdornment}</span>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <span>{endAdornment}</span>
              </InputAdornment>
            ),
          }}
        />
        <FormHelperText error={!!errors[name]}>
          {errors[name]?.message as string}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default EntiyFormField;
