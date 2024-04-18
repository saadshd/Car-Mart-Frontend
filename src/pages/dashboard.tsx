import { Box, Typography } from "@mui/material";

function Dashboard() {
  return (
    <>
      <Box
        sx={{
          height: "74vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h1">Dashboard</Typography>
        <Typography variant="body1">
          Experience the Future of Car Shopping with <strong>Car Mart</strong>.
        </Typography>
        <Typography variant="body1">
          The Destination for Quality Cars and Exceptional Service
        </Typography>
      </Box>
    </>
  );
}

export default Dashboard;
