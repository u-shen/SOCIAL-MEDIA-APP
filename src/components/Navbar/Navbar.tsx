import { MagnifyingGlass, Chat, UserCircleGear } from "@phosphor-icons/react";
import { UserLogOut } from "../UserLogOut/UserLogOut";
import { ChatRoom } from "../ChatRoom/ChatRoom";
import LOGO from "../../assets/CHAT.png";
import "./Navbar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
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
        <NavLink to="/home">
          <div className="social-media-logo">
            <img className="navbar-logo" src={LOGO} alt="" />
          </div>
        </NavLink>
        <div className="search-input">
          <MagnifyingGlass
            color="#1877f2"
            className="search-icon icon"
            size={16}
          />
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
            <Chat className="icon" color="#1877f2" size={32} />
          </button>
          {isChatRoom && <ChatRoom setIsChatRoom={setIsChatRoom} />}

          <button
            onClick={() => {
              setIsChatRoom(false);
              setUserSettings((prev: boolean) => !prev);
            }}
            className="user-settings"
          >
            <UserCircleGear color="#1877f2" size={32} />
            {userSettings && <UserLogOut setIsAuth={setIsAuth} />}
          </button>
        </div>
      </header>
    </div>
  );
};
