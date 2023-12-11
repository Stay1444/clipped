import { Box, Paper, Typography, useTheme } from "@mui/material";

import style from "../../styles/atomic/molecules/VideoCard.module.scss";
import { MoreVert } from "@mui/icons-material";

export interface IVideoCardProps {
  name: string;
  uploadedAt: Date;
  duration: number;
  size: number;
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
        </Box>
      </Box>
      <Box className={style.detailsContainer}>
        <Typography fontSize={20} className={style.videoName}>
          {props.name}
        </Typography>
        <Typography fontSize={14} color={theme.palette.info.dark}>
          {`${props.uploadedAt.toDateString()} ${props.uploadedAt.toLocaleTimeString()}`}
        </Typography>
      </Box>
    </Box>
  );
}

function formatDuration(duration: number): string {
  duration = Math.floor(duration);

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  while (duration > 3600 && duration - 3600 > 0) {
    duration -= 3600;
    hours++;
  }

  while (duration > 60 && duration - 60 > 0) {
    duration -= 60;
    minutes++;
  }

  seconds = duration;

  let result = "";

  if (hours > 0) {
    result += `${hours}h `;
  }

  if (minutes > 0) {
    result += `${minutes}m `;
  }

  if (seconds > 0) {
    result += `${seconds}s`;
  }

  return result.trim();
}

function formatSize(size: number): string {
  size = Math.floor(size);

  if (size > 1024 * 1024 * 1024) {
    // 1 gigabyte
    return `${+(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  } else if (size > 1024 * 1024) {
    // 1 megabyte
    return `${Math.round(size / (1024 * 1024))} MB`;
  } else if (size > 1024) {
    return `${Math.round(size / 1024)} KB`;
  } else {
    return `${size} B`;
  }
}
