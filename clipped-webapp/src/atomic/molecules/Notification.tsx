import { Box, Icon, Paper, Typography, useTheme } from "@mui/material";
import { NotificationType } from "../../services/Notifications";

import style from "../../styles/atomic/molecules/Notification.module.scss";
import { useEffect } from "react";

export default function Notification(
    { type, message, icon, duration, onClose }: { type: NotificationType, message: string, icon: string, duration: number, onClose: () => void }
) {
    const theme = useTheme();

    useEffect(() => {
        console.log("Notification initialized timeout with " + duration)
        const id = setTimeout(() => {
            console.log("Notification timed out")
            onClose()
        }, duration * 1000)

        return () => clearTimeout(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Paper elevation={5} className={style.container}>
        <Box className={style.content}>
            <Icon sx={{
                color: type == "Information" ? theme.palette.primary.dark : type == "Warning" ? theme.palette.warning.dark : theme.palette.error.dark,
                fontSize: 30
            }}>{icon}</Icon>
            <Typography>{message}</Typography>
            <Icon className={style.close} sx={{
                fontSize: '18px'
            }} onClick={onClose}>close</Icon>
        </Box>
        <Box className={style.closeTimer} sx={{
            background: theme.palette.primary.dark,
            animationDuration: `${duration}s`
        }}/>
    </Paper>
}