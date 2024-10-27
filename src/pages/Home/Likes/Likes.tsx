import { useState, useEffect } from "react";
import {
  onSnapshot,
  doc,
  collection,
  addDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { ThumbsUp, ThumbsDown } from "@phosphor-icons/react/dist/ssr";
import { db } from "../../../config/firebase";
import { useGetLikes } from "../../../hooks/useGetLikes";
import { useGetUserLoginInfo } from "../../../hooks/useGetUserLoginInfo";

import "./Likes.css";
export const Likes = ({ postId }) => {
  const [deletedLikedId, setDeletedLikedId] = useState<string>("");
  const { getLikes, likesUserId } = useGetLikes();
  const { uid } = useGetUserLoginInfo();
  const likesRef = collection(db, "likes");
  const hasLiked = likesUserId?.find((userID) => userID == uid);
  const addLikes = async () => {
    try {
      await addDoc(likesRef, { uid, postId });
    } catch (err) {
      console.log(err);
    }
  };
  const deleteLikes = async () => {
    const queryLiked = query(
      likesRef,
      where("uid", "==", uid),
      where("postId", "==", postId),
    );
    onSnapshot(queryLiked, (snapshot) => {
      const id = snapshot?.docs[0]?.id;
      setDeletedLikedId(id);
    });
    const docRef = doc(db, "likes", deletedLikedId);
    await deleteDoc(docRef);
  };

  useEffect(() => {
    getLikes(postId);
  }, []);
  return (
    <div className="likes-container">
      <button className="btn-like" onClick={hasLiked ? deleteLikes : addLikes}>
        <label className="label-like">
          {hasLiked ? (
            <ThumbsDown size={30} color="#1877f2" weight="bold" />
          ) : (
            <ThumbsUp size={30} color="#1877f2" weight="bold" />
          )}
        </label>
      </button>
      <p>{likesUserId?.length}</p>
    </div>
  );
};
