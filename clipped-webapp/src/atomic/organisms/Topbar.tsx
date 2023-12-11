import { Box, Icon, Paper, Typography, useTheme } from "@mui/material";

import style from "../../styles/atomic/organisms/topbar.module.scss";
import { useNavigate } from "react-router";
import AccountMenu from "../molecules/AccountMenu";

export default function Topbar() {
  return (
    <Box
      sx={{
        minHeight: "60px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <LinkIcon icon="upload" link="/app/upload" />
      <Box
        sx={{
          marginLeft: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AccountMenu image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/EHT_Saggitarius_A_black_hole.tif/lossy-page1-375px-EHT_Saggitarius_A_black_hole.tif.jpg" />
      </Box>
    </Box>
  );
}

function ProfileBox() {
  const theme = useTheme();

  return (
    <Paper elevation={10} className={style.profileBox}>
      <Typography
        className={style.profileBoxName}
        fontSize={20}
        fontWeight={600}
      >
        Stay
      </Typography>
      <img
        className={style.profileBoxImage}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/EHT_Saggitarius_A_black_hole.tif/lossy-page1-375px-EHT_Saggitarius_A_black_hole.tif.jpg"
      />
      <Box
        className={style.profileHoverAction}
        sx={{
          background: theme.palette.error.main,
        }}
      >
        <Typography fontSize={20} fontWeight={600}>
          Log Out
        </Typography>
      </Box>
    </Paper>
  );
}

function LinkIcon({ icon, link }: { icon: string; link: string }) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      className={style.icon}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px",
        cursor: "pointer",
        borderRadius: "50%",
        transitionDuration: "250ms",
        color: theme.palette.text.disabled,

        "&:hover": {
          background: theme.palette.primary.dark,
          color: "white",
        },
      }}
      onClick={() => {
        navigate(link);
      }}
    >
      <Icon sx={{ fontSize: "30px" }}>{icon}</Icon>
    </Box>
  );
}
