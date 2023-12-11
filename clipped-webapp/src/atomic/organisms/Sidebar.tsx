import { Box } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";

import { useState } from "react";
import SidebarIcon from "../molecules/SidebarIcon";

type Mode = "Collapsed" | "Expanded" | "Auto";
const CollapsedWidth = 70;
const ExpandedWidth = 300;

export default function Sidebar() {
  const [mode, setMode] = useLocalStorage<Mode>("Auto");

  const [expanded, setExpanded] = useState<boolean>(false);

  if (mode == "Collapsed" && expanded) {
    setExpanded(false);
  } else if (mode == "Expanded" && !expanded) {
    setExpanded(true);
  }

  return (
    <Box
      sx={{
        width: `${expanded ? ExpandedWidth : CollapsedWidth}px`,
        transitionDuration: "250ms",
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
        alignItems: "center",
        height: "100%",
        paddingBottom: "15px",
        paddingTop: "15px",
      }}
      onMouseEnter={() => {
        if (mode == "Auto" && !expanded) {
          setExpanded(true);
        }
      }}
      onMouseLeave={() => {
        if (mode == "Auto" && expanded) {
          setExpanded(false);
        }
      }}
    >
      <SidebarIcon icon="home" text="Home" type={{ route: "home" }} />
      <SidebarIcon icon="sparkles" text="Browse" type={{ route: "browse" }} />
      <SidebarIcon icon="upload" text="Upload" type={{ route: "upload" }} />
      <SidebarIcon
        icon="settings"
        text="Preferences"
        type={{ route: "preferences" }}
      />
      <SidebarIcon
        icon="dashboard"
        text={mode}
        bottom
        type={{
          handler: () => {
            if (mode == "Auto") {
              setMode("Collapsed");
              setExpanded(false);
            } else if (mode == "Collapsed") {
              setMode("Expanded");
              setExpanded(true);
            } else {
              setMode("Auto");
              setExpanded(true);
            }
          },
          active: false,
        }}
      />
    </Box>
  );
}
