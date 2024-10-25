export const useGetUserLoginInfo = () => {
  const data = JSON.parse(
    window.localStorage.getItem("userSignInInfo") as string,
  );
  const { uid, userName, img } = data;
  return { uid, userName, img };
};
