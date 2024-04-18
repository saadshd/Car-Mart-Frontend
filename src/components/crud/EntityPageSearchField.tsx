import * as React from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface EntityPageSearchFieldProps {
  onSearch: (query: string) => void;
  placeholder: string;
  fullWidth?: boolean;
}

const EntityPageSearchField: React.FC<EntityPageSearchFieldProps> = ({
  onSearch,
  placeholder,
  fullWidth,
}) => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <TextField
      placeholder={placeholder}
      value={searchQuery}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      variant="outlined"
      size="small"
      fullWidth={fullWidth}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {searchQuery ? (
              <IconButton onClick={handleClear} size="small">
                <ClearIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleSearch} size="small">
                <SearchIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default EntityPageSearchField;
