import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProfilePopup from "./ProfilePopup";
import theme from "../../../utils/theme";
import { DRAWER_WIDTH } from "../../../utils/constants";
import { Link } from "react-router-dom";

interface TopBarProps {
  handleDrawerToggle: () => void;
}

function TopBar(prop: TopBarProps) {
  const { handleDrawerToggle } = prop;
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: "none",
        color: theme.palette.primary.main,
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { sm: `${DRAWER_WIDTH}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                display: { xs: "block", sm: "none" },
                color: "primary.main",
              }}
              variant="h5"
              fontWeight="bold"
              noWrap
              component="div"
            >
              CAR MART
            </Typography>
          </Link>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <ProfilePopup />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
