import { Cloud as SpaceIcon } from "@mui/icons-material";
import { Box, LinearProgress, Typography, useTheme } from "@mui/material";
import { formatSize } from "../../utils";

export default function SpaceUsageWidget() {
  const used = 1200 * 1024 * 1024 * 1024;
  const total = 1000 * 1024 * 1024 * 1024;
  const usedPercent = Math.min(Math.max(used / total, 0), 1);
  const theme = useTheme();

  const color =
    usedPercent < 0.5 ? "info" : usedPercent < 0.75 ? "warning" : "error";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: "10px",
      }}
    >
      <SpaceIcon sx={{ color: theme.palette.primary.light }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <LinearProgress
          color={color}
          variant="determinate"
          value={usedPercent * 100}
          sx={{
            width: "150px",
            height: "6px",
            borderRadius: "4px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "5px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            color: theme.palette.action.disabled,
          }}
        >
          <Typography fontSize={14}>{formatSize(used)}</Typography>
          <Typography fontSize={14}>{formatSize(total)}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
