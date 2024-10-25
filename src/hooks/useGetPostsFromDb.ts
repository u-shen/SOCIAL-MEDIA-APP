import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
export const useGetPostsFromDb = () => {
  const [allPosts, setAllPosts] = useState();
  const postsRef = collection(db, "posts");
  const getPostsFromDb = async () => {
    const data = await getDocs(postsRef);
    const filtredData = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setAllPosts(filtredData);
  };
  useEffect(() => {
    getPostsFromDb();
  }, []);
  return { allPosts, getPostsFromDb };
};
