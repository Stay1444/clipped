import { Box, Paper, Typography, useTheme } from "@mui/material";

import style from "../../styles/atomic/molecules/VideoCard.module.scss";
import { MoreVert } from "@mui/icons-material";
import { formatDuration, formatSize } from "../../utils";

export interface IVideoCardProps {
  name: string;
  uploadedAt: Date;
  duration: number;
  size: number;
  owner: string;
  showOwner: boolean;
  showOptions: boolean;
}

export default function VideoCard(props: IVideoCardProps) {
  const theme = useTheme();
  return (
    <Box className={style.parent}>
      <Box className={style.thumbnailWrapper}>
        <Paper elevation={10} className={style.thumbnail}>
          <img src="https://static-cse.canva.com/blob/1252421/1600w-wK95f3XNRaM.jpg" />
        </Paper>
        <Box className={style.thumbnailLayer}>
          <Paper
            elevation={5}
            className={`${style.thumbnailDecoration} ${style.duration}`}
          >
            {formatDuration(props.duration)}
          </Paper>
          <Paper
            elevation={5}
            className={`${style.thumbnailDecoration} ${style.size}`}
          >
            {formatSize(props.size)}
          </Paper>
          {props.showOptions && (
            <Box
              className={`${style.thumbnailDecoration} ${style.options}`}
              sx={{
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <MoreVert />
            </Box>
          )}
        </Box>
      </Box>
      <Box className={style.detailsContainer}>
        <Typography fontSize={20} className={style.videoName}>
          {props.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontSize={14} color={theme.palette.info.dark}>
            {`${props.uploadedAt.toDateString()} ${props.uploadedAt.toLocaleTimeString()}`}
          </Typography>
          {props.showOwner && (
            <Typography fontSize={14} color={theme.palette.info.main}>
              {props.owner}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
