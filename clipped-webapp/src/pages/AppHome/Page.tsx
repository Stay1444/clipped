import { Box } from "@mui/material";
import VideoCard from "../../atomic/molecules/VideoCard";

const PLACEHOLDER_VIDEOS = [
  {
    name: "Arma 3 coche volando",
    uploadedAt: new Date(),
    duration: 33,
    size: 102 * 1024 * 1024,
    owner: "Stay1444",
  },
  {
    name: "2023-05-03_04-23-55.mp4",
    uploadedAt: new Date(),
    duration: 12.3,
    size: 22.6 * 1024 * 1024,
    owner: "Frask",
  },
  {
    name: "Fallout 76 supermutante volando",
    uploadedAt: new Date(),
    duration: 5.3,
    size: 8 * 1024 * 1024,
    owner: "Stay1444",
  },
  {
    name: "pImfSEGZogmQztOIBM",
    uploadedAt: new Date(),
    duration: 531,
    size: 5523 * 1024 * 1024,
    owner: "Zenk",
  },
  {
    name: "aoiw awdif aawo mfwaoi aoawawo oawmwaowaofaoawfoaw ofwa awofoawoai",
    uploadedAt: new Date(),
    duration: 612.2,
    size: 2 * 1024 * 1024,
    owner: "PapaliSuki",
  },
];

export default function AppHome() {
  return (
    <Box
      sx={{
        padding: "20px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: "20px",
        rowGap: "20px",
        alignContent: "start",
      }}
    >
      {PLACEHOLDER_VIDEOS.map((v, k) => (
        <VideoCard
          key={k}
          name={v.name}
          uploadedAt={v.uploadedAt}
          duration={v.duration}
          size={v.size}
          owner={v.owner}
          showOwner
          showOptions
        />
      ))}
    </Box>
  );
}
