import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
export const Layout = ({ isAuth, setIsAuth }) => {
  return (
    <>
      {isAuth ? (
        <>
          <Navbar setIsAuth={setIsAuth} />
          <Outlet />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};
