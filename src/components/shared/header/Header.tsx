import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import TopBar from "./TopBar";

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Box>
  );
}
