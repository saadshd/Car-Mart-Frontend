import { FC } from "react";
import { Typography, Container } from "@mui/material";

const NotFound: FC = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" fontWeight="bold" color="primary" align="center">
        404
      </Typography>

      <Typography
        variant="h5"
        fontWeight="bold"
        color="primary"
        align="center"
        mb={5}
      >
        PAGE NOT FOUND
      </Typography>

      <Typography align="center">
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </Typography>
    </Container>
  );
};

export default NotFound;
