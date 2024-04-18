import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ListItemIcon } from "@mui/material";

interface MenuButtonProps {
  menuItems: { label: string; icon: React.ReactNode }[];
  onMenuItemClick: (item: string) => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  menuItems,
  onMenuItemClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item: string) => {
    onMenuItemClick(item);
    handleClose();
  };

  return (
    <React.Fragment>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map((menuItem, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(menuItem.label)}
          >
            <ListItemIcon>{menuItem.icon}</ListItemIcon>
            {menuItem.label}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default MenuButton;
