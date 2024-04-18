import { Link, NavLink } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import Person from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import theme from "../../../utils/theme";
import { DRAWER_WIDTH } from "../../../utils/constants";

interface Props {
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export default function Sidebar(props: Props) {
  const { window, mobileOpen, handleDrawerToggle } = props;

  const listItems = [
    { text: "Dashboard", path: "/" },
    { text: "Car Inventory", path: "/car-inventory" },
    { text: "Customer", path: "/customer" },
    { text: "Sales Person", path: "/sales-person" },
  ];

  const listItemIcons = [DashboardIcon, DirectionsCarIcon, PeopleIcon, Person];

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <Toolbar
        sx={{
          color: "primary.contrastText",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", cursor: "pointer" }}>
          <Typography
            sx={{
              display: { xs: "none", sm: "block" },
              color: "primary.contrastText",
            }}
            variant="h5"
            fontWeight="bold"
            noWrap
            component="div"
          >
            CAR MART
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" } }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {listItems.map((item, index) => {
          const ListItemIcons = listItemIcons[index];
          return (
            <NavLink
              to={item.path}
              key={index}
              preventScrollReset={true}
              style={({ isActive }) => {
                return {
                  textDecoration: "none",
                  color: isActive
                    ? theme.palette.primary.light
                    : theme.palette.primary.contrastText,
                };
              }}
            >
              <ListItem
                key={index}
                disablePadding
                sx={{
                  display: "block",
                }}
                onClick={handleDrawerToggle}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "initial",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "primary.light",
                      minWidth: 0,
                      mr: 2,
                      justifyContent: "center",
                    }}
                  >
                    <ListItemIcons />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            bgcolor: "primary.main",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            bgcolor: "primary.main",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
