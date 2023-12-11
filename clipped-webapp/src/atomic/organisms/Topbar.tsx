import { Box } from "@mui/material";

import AccountMenu from "../molecules/AccountMenu";
import SpaceUsageWidget from "../molecules/SpaceUsageWidget";

export default function Topbar() {
  return (
    <Box
      sx={{
        minHeight: "60px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "20px",
        paddingRight: "10px",
      }}
    >
      <SpaceUsageWidget />
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
