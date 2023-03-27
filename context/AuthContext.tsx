import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  updateProfile,
} from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import { user } from "@types";
import { collection, addDoc } from "firebase/firestore";

type AuthContextType = {
  user: user | null;
  login: (email: string, password: string) => Promise<UserCredential | void>;
  register: (
    email: string,
    password: string,
    userName: string
  ) => Promise<UserCredential | void>;
  logout: () => Promise<UserCredential | void>;
  addUserDocument?: any;
};

type AuthProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType>({
  user: {
    uid: "",
    username: "",
    email: "",
    coin: 0,
    ticket: 0,
  },
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  addUserDocument: () => Promise.resolve(),
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<user | null>({
    uid: "",
    username: "",
    email: "",
    coin: 0,
    ticket: 0,
  });
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (User) => {
      if (User) {
        setUser({
          username: User.displayName,
          uid: User.uid,
          email: User.email,
          coin: 100000,
          ticket: 0,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUserDocument = (email: string, name: string) => {
    return addDoc(collection(firestore, "users"), {
      email: email,
      displayName: name,
    });
  };

  const register = (email: string, password: string, userName: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (User) => {
        updateProfile(User.user, {
          displayName: userName,
        });
      }
    );
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, addUserDocument }}
    >
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};
