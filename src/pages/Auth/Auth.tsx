import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, GProvider } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Auth.css";

export const Auth = ({ setIsAuth }) => {
  type TUserInfo = {
    userID: string;
    userName: string | null;
    img: string | null;
  };
  const [userSignInInfo, setUserSignInInfo] = useState<TUserInfo>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const userSchema = yup.object({
    email: yup
      .string()
      .required("Email Is Required")
      .email("Email Format is Not Valid"),
    password: yup
      .string()
      .required("Password Is Required")
      .min(4, "Password Is Weak"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const signInWithGoogle = async () => {
    try {
      const userData = await signInWithPopup(auth, GProvider);
      const filtredUserData = {
        uid: userData.user.uid,
        userName: userData.user.displayName,
        img: auth?.currentUser?.photoURL,
      };
      setUserSignInInfo(filtredUserData);
      localStorage.setItem("userSignInInfo", JSON.stringify(filtredUserData));
      setIsAuth(true);
      navigateTo("/home");
    } catch (error) {
      console.error(error);
    }
  };
  const signInWithEmailAndPassword = async () => {
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const filtredUserData = {
        userID: userData.user.uid,
        userName: userData.user.email,
        img: `https://avatar.iran.liara.run/username?username=[${auth.currentUser?.email}]`,
      };
      setUserSignInInfo(filtredUserData);
      localStorage.setItem("userSignInInfo", JSON.stringify(filtredUserData));
      setIsAuth(true);
      navigateTo("/home");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (window.localStorage.getItem("userSignInInfo")) {
      navigateTo("/home");
      console.log(userSignInInfo);
    }
  }, [userSignInInfo]);
  return (
    <div className="whole-auth-container">
      <div className="auth-container">
        <h1 className="welcome-title">Welcome !</h1>
        <form
          onSubmit={handleSubmit(signInWithEmailAndPassword)}
          className="form-sign-in"
        >
          <label htmlFor="email">Your Email</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="YourEmail@domain.com"
          />
          {errors?.email && (
            <small style={{ fontWeight: "Bold", color: "red" }}>
              {errors.email.message}
            </small>
          )}
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="**********"
          />
          {errors?.password && (
            <small style={{ fontWeight: "Bold", color: "red" }}>
              {errors.password.message}
            </small>
          )}
          <button
            style={{
              color: isValid ? "black" : "gray",
              backgroundColor: isValid ? "#fff" : "#a6a7a9",
            }}
            className="sign-in"
            type="submit"
          >
            Sign in To Your Account
          </button>
        </form>
        <div className="or">
          <span>or</span>
        </div>
        <div className="sign-with-google">
          <button
            onClick={signInWithGoogle}
            className="sign-with-google-btn login-with-google-btn"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};
