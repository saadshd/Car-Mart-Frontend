import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import useAxios from "../../hooks/useAxios";
import { CarType } from "../../entities/carInventory/interface";
import { useEffect, useState } from "react";
import { useForm } from "../../context/FormContext";
import { Controller } from "react-hook-form";

interface MultiSelectFieldProps {
  name: string;
  id: string;
}

const MultiSelectField = (props: MultiSelectFieldProps) => {
  const { name, id } = props;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly CarType[]>([]);
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();
  const { control } = useForm();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/car-inventory?isSold=false");
      setOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching chasisNo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, onChange, value } }) => (
        <Autocomplete
          multiple
          filterSelectedOptions
          id={id}
          open={open}
          options={options}
          loading={loading}
          onBlur={onBlur}
          onChange={(event, newValue) => {
            const selectedChasisNos = newValue.map(
              (car: CarType) => car.chasisNo
            );
            onChange(selectedChasisNos);
          }}
          value={
            Array.isArray(value)
              ? options.filter((option) => value.includes(option.chasisNo))
              : []
          }
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) =>
            option.chasisNo === value.chasisNo
          }
          getOptionLabel={(option) => option.chasisNo}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
};

export default MultiSelectField;
