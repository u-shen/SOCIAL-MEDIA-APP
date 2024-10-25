import { MagnifyingGlass, Chat, UserCircleGear } from "@phosphor-icons/react";
import { UserLogOut } from "../UserLogOut/UserLogOut";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import "./Navbar.css";
import { useState } from "react";
export const Navbar = ({
  setIsAuth,
}: {
  setIsAuth: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [isChatRoom, setIsChatRoom] = useState<boolean>(false);
  const [userSettings, setUserSettings] = useState<boolean>(false);
  return (
    <div className="container-social-media">
      <header className="social-meida-header">
        <div className="social-media-logo">Social Icon</div>
        <div className="search-input">
          <MagnifyingGlass className="search-icon icon" size={16} />
          <input type="search" placeholder="Search For A Post" />
        </div>
        <div className="social-media-info">
          <button
            onClick={() => {
              setUserSettings(false);
              setIsChatRoom((prev: boolean) => !prev);
            }}
            className="chat-room"
          >
            <Chat className="icon" size={32} />
          </button>
          {isChatRoom && <ChatRoom />}
          <button
            onClick={() => {
              setIsChatRoom(false);
              setUserSettings((prev: boolean) => !prev);
            }}
            className="user-settings"
          >
            <UserCircleGear size={32} />
            {userSettings && <UserLogOut setIsAuth={setIsAuth} />}
          </button>
        </div>
      </header>
    </div>
  );
};
