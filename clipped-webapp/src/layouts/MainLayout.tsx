import { Outlet } from "react-router";

import style from "../styles/layouts/MainLayout.module.scss";
import { Box, Paper } from "@mui/material";
import Topbar from "../atomic/organisms/Topbar";
import { NotificationContextProvider } from "../services/Notifications";

export default function MainLayout() {
  return (
    <NotificationContextProvider>
      <Box className={style.container}>
        <Paper className={style.topbar}>
          <Topbar />
        </Paper>
        <Box className={style.center}>
          <Box className={style.pageContent}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </NotificationContextProvider>
  );
}

