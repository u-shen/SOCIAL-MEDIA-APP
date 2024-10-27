import { useNavigate } from "react-router-dom";
import { useState, useContext, useRef, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import { ChatCenteredDots } from "@phosphor-icons/react";
import "./ChatRoom.css";
export const ChatRoom = ({ setIsChatRoom }) => {
  const [roomName, setRoomName] = useState("");
  const { setChatRoom } = useContext(ChatContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigateTo = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChatRoom(roomName.toLowerCase());
    navigateTo("/chat");
    setIsChatRoom(false);
  };
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);
  return (
    <div className="chat-room-container">
      <h4>Chat-Room</h4>
      <form onSubmit={handleSubmit} className="form-room">
        <input
          className="chat-room-input"
          onChange={(e) => setRoomName(e.target.value)}
          type="text"
          placeholder="Room Name!"
          ref={inputRef}
        />
        <button className="chat-room-btn" type="submit">
          <label>
            <ChatCenteredDots size={25} />
          </label>
          Enter Room
        </button>
      </form>
    </div>
  );
};
