// import { useEffect, useState } from "react";
// import { onSnapshot, query, where, collection } from "firebase/firestore";
// import { db } from "../config/firebase";
// import { useContext } from "react";
// import { ChatContext } from "../context/ChatContext";

// export const useGetMessageFromDb = () => {
//   const [messages, setMessages] = useState();
//   const { chatRoom } = useContext(ChatContext);
//   const msgRef = collection(db, "messages");
//   const queryMsgFromRoom = query(msgRef, where("room", "==", chatRoom));
//   const getMessageFromDb = () => {
//     const data = [];
//     onSnapshot(queryMsgFromRoom, (snapshot) => {
//       snapshot.docs.map((doc) => data.push({ ...doc.data(), id: doc.id }));
//     });
//     setMessages(data);
//   };
//   useEffect(() => {
//     console.log(messages);
//   }, []);
//   getMessageFromDb();
//   return { messages };
// };
