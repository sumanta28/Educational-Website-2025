"use client";

import React, { createContext, useContext, useState } from "react";

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    msg: string,
    type?: "success" | "error" | "info",
    autoDismiss?: boolean
  ) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (
    msg: string,
    type: "success" | "error" | "info" = "info",
    autoDismiss = true // default: true
  ) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, message: msg, type }]);

    if (autoDismiss) {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 5000); // 5 seconds
    }
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be inside NotificationProvider");
  return ctx;
};
