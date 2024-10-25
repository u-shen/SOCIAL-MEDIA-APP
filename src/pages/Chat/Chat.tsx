import { useState, useContext, useEffect } from "react";
import { PaperPlane, Chats } from "@phosphor-icons/react";
import { db } from "../../config/firebase";
import { useGetUserLoginInfo } from "../../hooks/useGetUserLoginInfo";
import { Aside } from "../../components/Aside/Aside";
import {
  addDoc,
  onSnapshot,
  query,
  where,
  collection,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext";
import "./Chat.css";
export const Chat = () => {
  const [messages, setMessages] = useState<any[]>(null);
  const [newMsg, setNewMsg] = useState<string>("");
  const { userName, img } = useGetUserLoginInfo();
  const { chatRoom } = useContext(ChatContext);
  const msgRef = collection(db, "messages");
  const queryMsgFromRoom = query(
    msgRef,
    where("room", "==", chatRoom),
    orderBy("createdAt"),
  );
  const getSnapShot = async () => {
    onSnapshot(queryMsgFromRoom, (snapshot) => {
      const data: any[] = [];
      snapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      setMessages(data);
    });
  };
  const addMsg = async () => {
    try {
      await addDoc(msgRef, {
        room: chatRoom,
        msg: newMsg,
        username: userName,
        img: img,
        createdAt: serverTimestamp(),
      });

      setNewMsg("");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getSnapShot();
  }, [chatRoom]);
  return (
    <div className="grid-container">
      <Aside />
      <div className="whole-messages">
        <div className="chat-room-title">
          <h4>
            <label>
              <Chats size={32} />
            </label>
            <p>WELCOME IN {chatRoom.toUpperCase()}</p>
          </h4>
        </div>
        <div className="messages-container">
          {messages?.map((message) => {
            return (
              <div className="msg-data">
                <div className="meta-data-message">
                  <div className="img-container">
                    <img src={message.img} alt="" />
                  </div>
                  <div className="author">
                    <p>{message.username}</p>
                  </div>
                </div>
                <div className="message-msg">
                  <p>{message.msg}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="messages-input-container">
          <div className="typezone ">
            <textarea
              className="textarea-msg"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Say something"
            ></textarea>
            <button onClick={addMsg} type="submit" className="send">
              <PaperPlane size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
