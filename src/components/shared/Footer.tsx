import { Box, Typography } from "@mui/material";
import { YEAR } from "../../utils/constants";

const Footer = () => {
  return (
    <Box
      component="footer"
      flexDirection={"column"}
      sx={{
        color: "primary",
        p: 4,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body2">
        &copy; <strong> {YEAR} Cache Cloud INC. All Rights Reserved.</strong>
      </Typography>
    </Box>
  );
};

export default Footer;
