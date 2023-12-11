import { Box, Paper, Typography } from "@mui/material";

import SVG from "react-inlinesvg";

import DiscordIcon from "../../assets/icons/discord.svg";
import { getLoginRedirectUrl } from "../../api/Api";

export default function LoginPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          minWidth: "450px",
          display: "flex",
          padding: "25px",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "20px",
        }}
      >
        <Typography fontSize={"2em"}>Log In</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: "10px",
            alignItems: "center",
          }}
        >
          <Typography>Continue with</Typography>
          <Box
            sx={{
              background: "#5865F2",
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              columnGap: "8px",
              cursor: "pointer",
              transition: "250ms",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => {
              window.location.assign(getLoginRedirectUrl());
            }}
          >
            <SVG
              src={DiscordIcon}
              style={{
                width: "25px",
                height: "25px",
                fill: "white",
              }}
            />
            Discord
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
