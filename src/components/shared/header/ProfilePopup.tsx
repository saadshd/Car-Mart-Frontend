import * as React from "react";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import ActionDialog from "../ActionDialog";
import { useAuth } from "../../../context/AuthContext";

export default function ProfilePopup() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { logout } = useAuth();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleDialogClose();
    handleClose();
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          p: 0,
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box style={{ cursor: "pointer" }}>
          <Avatar
            sx={{ height: 32, width: 32 }}
            onClick={handleClick}
            src="https://source.unsplash.com/man-in-white-crew-neck-shirt-wearing-black-framed-eyeglasses-C8Ta0gwPbQg"
          />
        </Box>
        <Tooltip title="Profile settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 0, color: "white" }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          ></IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar src="https://source.unsplash.com/man-in-white-crew-neck-shirt-wearing-black-framed-eyeglasses-C8Ta0gwPbQg" />{" "}
          My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleDialogOpen}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        {dialogOpen && (
          <ActionDialog
            open={dialogOpen}
            handleClose={handleDialogClose}
            onConfirm={handleLogout}
            title="Logout"
            contentText="Are you sure you want to logout?"
            onConfirmText="Logout"
          />
        )}
      </Menu>
    </React.Fragment>
  );
}
