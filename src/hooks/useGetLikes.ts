import { useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
export const useGetLikes = () => {
  const [likesUserId, setLikesUserId] = useState<string[] | null>(null);
  const likesRef = collection(db, "likes");
  const getLikes = (postId: string) => {
    const likesQuery = query(likesRef, where("postId", "==", postId));
    onSnapshot(likesQuery, (snapshot) => {
      const data: any[] = [];
      snapshot.docs.map((doc) => data.push({ ...doc.data(), id: doc.id }));
      const filtredData = data.map((doc) => doc.uid);
      const unqiueData = [...new Set(filtredData)];
      setLikesUserId(unqiueData);
    });
  };
  return { getLikes, likesUserId };
};
