import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";

interface EntiyPagePaginationProps {
  count: number;
  page: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

export default function EntityPagePagination(props: EntiyPagePaginationProps) {
  const { count, page, pageNumber, setPageNumber } = props;
  const theme = createTheme();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    if (newPage === pageNumber + 1) {
      setPageNumber(pageNumber + 1);
    } else if (newPage === pageNumber - 1) {
      setPageNumber(Math.max(pageNumber - 1, 1));
    } else {
      setPageNumber(newPage);
    }
  };

  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Pagination
        count={count}
        page={page}
        shape="rounded"
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        sx={{
          [theme.breakpoints.down("sm")]: {
            "& .MuiPaginationItem-root": {
              fontSize: "inherit",
              minWidth: "auto",
            },
          },
        }}
      />
    </Box>
  );
}
