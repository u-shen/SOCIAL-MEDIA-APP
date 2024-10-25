import React, { createContext, useState } from "react";
type TValue = {
  chatRoom: string | null;
  setChatRoom: React.Dispatch<React.SetStateAction<string>>;
};
export const ChatContext = createContext<TValue | null>(null);
export const ChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [chatRoom, setChatRoom] = useState("");
  return (
    <ChatContext.Provider value={{ chatRoom, setChatRoom }}>
      {children}
    </ChatContext.Provider>
  );
};
