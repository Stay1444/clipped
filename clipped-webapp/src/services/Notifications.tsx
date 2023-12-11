import { Box } from "@mui/material";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import Notification from "../atomic/molecules/Notification";
import NotificationAudio from "../assets/sounds/notification.mp3";

export type NotificationType = "Information" | "Warning" | "Critical";

// eslint-disable-next-line react-refresh/only-export-components
export function useNotify() {
  const ctx = useNotificationContext();

  return ({
    type,
    message,
    icon,
    duration,
  }: {
    type?: NotificationType;
    message: string;
    icon?: string;
    duration?: number;
  }) => {
    ctx.push({
      id: ++NOTIFICATION_ID,
      message,
      duration: duration ?? 10,
      type: type ?? "Information",
      icon:
        icon ??
        (type == "Information"
          ? "info"
          : type == "Warning"
            ? "warning"
            : "dangerous"),
    });
  };
}

export type Notification = {
  message: string;
  type: NotificationType;
  icon: string;
  duration: number;
  id: number;
};

export interface INotificationContext {
  notifications: Notification[];
  push: (notification: Notification) => void;
}

export const NotificationContext = createContext<
  INotificationContext | undefined
>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useNotificationContext() {
  const ctx = useContext(NotificationContext);

  if (!ctx) {
    throw new Error("useNotificationContext couldn't find context");
  }

  return ctx;
}

let NOTIFICATION_ID = 0;
export function NotificationContextProvider({ children }: PropsWithChildren) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const audio = new Audio(NotificationAudio);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        push: (notification) => {
          audio.play();
          setNotifications((current) => [...current, notification]);
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "350px",
          top: "90px",
          right: "20px",
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
        }}
      >
        {notifications.map((v) => {
          return (
            <Notification
              key={v.id}
              type={v.type}
              message={v.message}
              icon={v.icon}
              duration={v.duration}
              onClose={() => {
                setNotifications((current) => [
                  ...current.filter((x) => x.id != v.id),
                ]);
              }}
            />
          );
        })}
      </Box>
      {children}
    </NotificationContext.Provider>
  );
}

