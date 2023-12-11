import { Box, Paper } from "@mui/material";
import { Outlet } from "react-router";
import Sidebar from "../atomic/organisms/Sidebar";

import style from "../styles/layouts/MainLayout.module.scss";

export default function SidebarLayout() {
  return (
    <Box className={style.center}>
      <Paper className={style.sidebar}>
        <Sidebar />
      </Paper>
      <Box className={style.pageContent}>
        <Outlet />
      </Box>
    </Box>
  );
}
