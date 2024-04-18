import {
  Box,
  Backdrop,
  CircularProgress,
  circularProgressClasses,
} from "@mui/material";
import theme from "../../utils/theme";

interface CircularProgressIndicatorProps {
  loading: boolean;
}

function CircularProgressIndicator(props: CircularProgressIndicatorProps) {
  const { loading } = props;

  return (
    <Backdrop open={loading} style={{ zIndex: 9999 }}>
      <Box sx={{ position: "relative" }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: theme.palette.grey[300],
          }}
          size={50}
          thickness={6}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: "primary",
            animationDuration: "1s",
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
          size={50}
          thickness={6}
        />
      </Box>
    </Backdrop>
  );
}

export default CircularProgressIndicator;
