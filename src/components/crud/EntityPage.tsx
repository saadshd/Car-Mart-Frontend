import { useEffect, useState } from "react";
import { Theme, Toolbar, useMediaQuery, Box, CardContent } from "@mui/material";
import EntityCard from "./EntityCard";
import EntityPageHeader from "./EntityPageHeader";
import EntityPageSearchField from "./EntityPageSearchField";
import EntityPageResultRange from "./EntityPageResultRange";
import EntityPageDataSelector from "./EntityPageDataSelector";
import EntityPagePagination from "./EntityPagePagination";
import ActionDialog from "../shared/ActionDialog";
import { FormFieldProps } from "./EntityFormField";
import { CarType } from "../../entities/carInventory/interface";
import { CustomerType } from "../../entities/customer/interface";
import { SalesPersonType } from "../../entities/salesPerson/interface";
import { useSnackbar } from "../../context/SnackbarContext";
import useAxios from "../../hooks/useAxios";
import EntityPageSkeleton from "./EntityPageSkeleton";

interface EntityPageProps {
  title: string;
  fields: FormFieldProps[];
  endpoint: string;
  sortInitial?: string;
  filterInitial?: string;
  sortOptions?: { value: string; label: string }[];
  filterOptions?: { value: string; label: string }[];
  placeholder?: string;
  contentType?: string;
}

export interface ResponseData {
  message: string;
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  data: CarType[] | CustomerType[] | SalesPersonType[];
}

function EntityPage({
  fields,
  title,
  endpoint,
  sortInitial,
  sortOptions,
  filterInitial,
  filterOptions,
  placeholder,
  contentType,
}: EntityPageProps) {
  const [data, setData] = useState<ResponseData>({
    message: "",
    page: 1,
    limit: 10,
    totalPages: 0,
    totalItems: 0,
    data: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [sortOption, setSortOption] = useState<string | undefined>(sortInitial);
  const [filterOption, setfilterOption] = useState<string | undefined>(
    filterInitial
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const axiosInstance = useAxios();
  const { openSnackbar } = useSnackbar();

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const handlefilterChange = (value: string) => {
    setfilterOption(value);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const fetchData = async () => {
    try {
      setError(null);
      setloading(true);
      const response = await axiosInstance.get(endpoint, {
        params: {
          pageNumber,
          pageSize,
          sortBy: sortOption?.split("-")[0],
          sortOrder: sortOption?.split("-")[1],
          isSold:
            filterOption === "true"
              ? true
              : filterOption === "false"
              ? false
              : undefined,
          search: searchQuery,
        },
      });
      const data = response.data;
      setData(data);
    } catch (error: any) {
      setError(error);
      setOpenDialog(true);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, pageNumber, sortOption, filterOption, searchQuery]);

  const handleDeleteItem = async (id: string) => {
    try {
      setError(null);
      setloading(true);
      const response = await axiosInstance.delete(`${endpoint}/${id}`);
      const message = response.data.message;
      openSnackbar(message, "success");
      fetchData();
    } catch (error: any) {
      setError(error);
      openSnackbar(error, "error");
    } finally {
      setloading(false);
    }
  };

  const handlePostItem = async (postData: any, id?: string) => {
    let response;
    try {
      setError(null);
      setloading(true);
      if (id) {
        response = await axiosInstance.put(`${endpoint}/${id}`, postData, {
          headers: {
            "Content-Type": contentType,
          },
        });
      } else {
        response = await axiosInstance.post(endpoint, postData, {
          headers: {
            "Content-Type": contentType,
          },
        });
      }
      const message = response.data.message;
      openSnackbar(message, "success");
      fetchData();
    } catch (error: any) {
      setError(error);
      openSnackbar(error, "error");
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <Box>
        <Toolbar />
        <EntityPageHeader
          title={title}
          formFields={fields}
          contentType={contentType}
          onPost={handlePostItem}
        />

        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-end", md: "center" },
              mx: 1,
              mb: 2,
            }}
          >
            {placeholder && (
              <EntityPageSearchField
                onSearch={handleSearch}
                placeholder={placeholder}
                fullWidth={isSmallScreen}
              />
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "flex-end",
                alignItems: { xs: "flex-end", md: "center" },
                mt: 1,
                "& > :not(:last-child)": {
                  mb: { xs: 1, md: 0 },
                  mr: { xs: 0, md: 1 },
                },
              }}
            >
              {sortOptions && (
                <EntityPageDataSelector
                  label="Sort By"
                  options={sortOptions}
                  selectedValue={sortOption}
                  onChange={handleSortChange}
                />
              )}
              {filterOptions && (
                <EntityPageDataSelector
                  label="Availability"
                  options={filterOptions}
                  selectedValue={filterOption}
                  onChange={handlefilterChange}
                />
              )}
              {!loading && !error && data ? (
                <EntityPageResultRange
                  pageNumber={pageNumber}
                  pageSize={pageSize}
                  totalItems={data.totalItems}
                />
              ) : null}
            </Box>
          </Box>
          {loading && <EntityPageSkeleton />}
          {error && openDialog && (
            <ActionDialog
              open={openDialog}
              title="Error"
              contentText={error}
              onConfirmText="Ok"
              onConfirm={handleCloseDialog}
            />
          )}
          {!loading && data && (
            <>
              <EntityCard
                data={data.data}
                endpoint={endpoint}
                onDelete={handleDeleteItem}
                title={title}
                formFields={fields}
                contentType={contentType}
                onPost={handlePostItem}
              />
              {!loading && !error && data.totalPages !== 1 && (
                <EntityPagePagination
                  setPageNumber={setPageNumber}
                  pageNumber={pageNumber}
                  page={pageNumber}
                  count={data.totalPages}
                />
              )}
            </>
          )}
        </CardContent>
      </Box>
    </>
  );
}

export default EntityPage;
