import React from "react";
import { Box, Typography } from "@mui/material";

interface ResultRangeProps {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
}

const EntityPageResultRange: React.FC<ResultRangeProps> = ({
  pageNumber,
  pageSize,
  totalItems,
}) => {
  const startIndex = (pageNumber - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems);

  return (
    <Box>
      <Typography variant="body2">
        <span
          style={{ fontWeight: "bold" }}
        >{`${startIndex} - ${endIndex}`}</span>{" "}
        of <span style={{ fontWeight: "bold" }}>{totalItems}</span> Results
      </Typography>
    </Box>
  );
};

export default EntityPageResultRange;
