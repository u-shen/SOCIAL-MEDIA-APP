import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useGetUserLoginInfo } from "../../hooks/useGetUserLoginInfo";
import { SignOut, GlobeHemisphereEast } from "@phosphor-icons/react";

import "./UserLogOut.css";

export const UserLogOut = ({
  setIsAuth,
}: {
  setIsAuth: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { img, userName } = useGetUserLoginInfo();
  const navigateTo = useNavigate();
  const userSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setIsAuth(null);
      navigateTo("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="user-log-out-container">
      <h4>User settings</h4>
      <div className="settings">
        <div className="img-setting">
          <img src={img} className="img-setting" />
          <p>{userName}</p>
        </div>
        <div className="language-setting">
          <GlobeHemisphereEast color="#1877f2" size={40} />
          AR
        </div>
        <span className="line"></span>
        <div onClick={userSignOut} className="logOut-setting">
          <SignOut color="#1877f2" size={40} />
          <p>Log Out</p>
        </div>
      </div>
    </div>
  );
};
