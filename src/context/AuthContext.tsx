import { getCurrentAccount } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITAIL_STATA = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthed: false,
  setUser: () => {},
  setIsAuthed: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITAIL_STATA);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentAccount();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthed(true);
        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null
    )
      navigate("/sign-in");
    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthed,
    setIsAuthed,
    checkAuthUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
