import { useState } from "react";
import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { TrashSimple } from "@phosphor-icons/react";
import { useGetPostsFromDb } from "../../hooks/useGetPostsFromDb";
import { useGetUserLoginInfo } from "../../hooks/useGetUserLoginInfo";
import { auth, db } from "../../config/firebase";
import { Aside } from "../../components/Aside/Aside";
import "./Home.css";
export const Home = () => {
  const [newPost, setNewPost] = useState("");
  const { allPosts, getPostsFromDb } = useGetPostsFromDb();
  const { img, userName } = useGetUserLoginInfo();
  const postsRef = collection(db, "posts");
  const addNewPost = async () => {
    try {
      await addDoc(postsRef, {
        uid: auth?.currentUser?.uid,
        img: img,
        username: userName,
        createdAt: serverTimestamp(),
        date: `${new Date().getFullYear()}`,
        post: newPost,
      });
      setNewPost("");
      getPostsFromDb();
    } catch (err) {
      console.error(err);
    }
  };
  const deletPost = async (id: string) => {
    const docRef = doc(db, "posts", id);
    try {
      await deleteDoc(docRef);
      getPostsFromDb();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="app">
      <div className="grid-container">
        <Aside />
        <div className="post-container">
          <section className="add-post">
            <div className="new-posts-container">
              <div className="img-container">
                <img className="img-sign-in" src={img} alt="Img Sign In User" />
              </div>
              <textarea
                className="new-post-input"
                placeholder="what is on your mind ?"
                onChange={(e) => setNewPost(e.target.value)}
                value={newPost}
              ></textarea>
            </div>
            <span className="line"></span>
            <div className="share">
              <button onClick={addNewPost} className="share-btn">
                Share
              </button>
            </div>
          </section>
          <section className="view-posts">
            {allPosts?.map((post) => {
              return (
                <>
                  <div className="post-container">
                    <div className="post-meta-data">
                      <div className="post-img">
                        <img className="img-post" src={post.img} alt="" />
                      </div>
                      <div className="post-name">
                        <p>{post.username}</p>
                      </div>
                      <div className="post-date">
                        <small className="date">{post.date}</small>
                      </div>
                      {post.uid === auth?.currentUser?.uid && (
                        <button
                          onClick={() => deletPost(post.id)}
                          className="delete-trash"
                        >
                          <TrashSimple size={25} />
                        </button>
                      )}
                    </div>
                    <div className="post-text">
                      <p>{post.post}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
};
