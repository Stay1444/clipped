import { Box, Typography, Icon, useTheme } from "@mui/material";

import style from "../../styles/atomic/molecules/SidebarIcon.module.scss";
import { useLocation, useNavigate } from "react-router";

export interface SidebarIconProps {
  icon: string;
  text: string;
  bottom?: boolean;
  type: { route: string } | { handler: () => void; active: boolean };
}

export default function SidebarIcon({
  icon,
  text,
  bottom,
  type,
}: SidebarIconProps) {
  const location = useLocation();
  const navigate = useNavigate();

  let isActive: boolean;

  if ("route" in type && location.pathname.includes(type.route)) {
    isActive = true;
  } else if ("active" in type) {
    isActive = type.active;
  } else {
    isActive = false;
  }

  const theme = useTheme();

  return (
    <Box
      className={style.container}
      sx={{
        "&:hover": {
          background: theme.palette.primary.dark,
        },
        marginTop: bottom ? "auto" : 0,
      }}
      onClick={() => {
        if ("handler" in type) {
          type.handler();
        } else if ("route" in type && !isActive) {
          navigate(type.route);
        }
      }}
    >
      <Icon
        className={style.icon}
        sx={{
          color: isActive
            ? theme.palette.primary.main
            : theme.palette.action.disabled,
        }}
      >
        {icon}
      </Icon>
      <Typography
        className={style.text}
        sx={{
          color: isActive
            ? theme.palette.primary.light
            : theme.palette.action.disabled,
        }}
        fontSize={20}
      >
        {text}
      </Typography>
    </Box>
  );
}
