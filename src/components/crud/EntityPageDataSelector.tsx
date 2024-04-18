import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Typography,
} from "@mui/material";

interface EntityPageSortFieldProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string | undefined;
  onChange: (value: string) => void;
}

const EntityPageDataSelector: React.FC<EntityPageSortFieldProps> = ({
  label,
  options,
  selectedValue,
  onChange,
}) => {
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  return (
    <Box display="flex" alignItems="center">
      <InputLabel
        sx={{
          fontSize: "0.7rem",
        }}
      >
        {label}
      </InputLabel>
      <FormControl
        variant="outlined"
        size="small"
        sx={{ ml: 1, minWidth: 100 }}
      >
        <Select
          value={selectedValue}
          onChange={handleSortChange}
          sx={{
            fontSize: "0.7rem",
            "& .MuiSelect-icon": {
              fontSize: "1rem",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Typography variant="body2" sx={{ fontSize: "0.7rem" }}>
                {option.label}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default EntityPageDataSelector;
