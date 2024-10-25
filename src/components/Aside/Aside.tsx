import { useContext, useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { ChatCenteredDots } from "@phosphor-icons/react";

import { db } from "../../config/firebase";
import "./Aside.css";
import { ChatContext } from "../../context/ChatContext";
import { useNavigate } from "react-router-dom";
export const Aside = () => {
  const [existRoom, setExistRoom] = useState<string[] | null>(null);
  const { setChatRoom, chatRoom } = useContext(ChatContext);
  const navigateTo = useNavigate();
  const msgRef = collection(db, "messages");
  const getSnapShot = async () => {
    onSnapshot(msgRef, (snapshot) => {
      const data: any[] = [];
      const room: string[] = [];
      snapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      data.map((doc) => room.push(doc.room));
      setExistRoom([...new Set(room)]);
    });
  };
  useEffect(() => {
    getSnapShot();
  }, []);
  return (
    <>
      <div className="aside-container">
        {/* <div className="aside-title"> */}
        {/*   <h4>ROOMS : </h4> */}
        {/* </div> */}
        <div className="aside-links">
          <nav>
            <ul>
              {existRoom?.map((item, key) => {
                return (
                  <li key={key}>
                    <input
                      className="radio-input"
                      name="chat-room"
                      id={item}
                      type="radio"
                      checked={chatRoom === item}
                      value={item}
                      onChange={(e) => {
                        setChatRoom(e.target.value);
                        window.location.pathname == "/home"
                          ? navigateTo("/chat")
                          : navigateTo("/chat");
                      }}
                    />
                    <span className="custom-radio"></span>
                    <label htmlFor={item}>
                      <ChatCenteredDots size={25} />
                      <div className="item">{item}</div>
                    </label>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
