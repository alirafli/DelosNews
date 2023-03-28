import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import { AuthContextType, AuthProps, user } from "@types";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

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
  userBuyArticle: () => {},
  getUserDataByEmail: () => Promise.resolve(),
  getUserArticle: () => Promise.resolve(),
  getUserPrize: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<user | null>({
    uid: "",
    username: "",
    email: "",
    coin: 0,
    ticket: 0,
    isGet50: false,
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
          isGet50: false,
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
      username: name,
      coin: 100000,
      ticket: 0,
      isGet50: false,
    });
  };

  const getUserDataByEmail = async (email: string) => {
    const colRef = collection(firestore, "users");

    const snapshot = await getDocs(colRef);

    const docs = snapshot.docs.map((doc) => {
      const id = doc.id;
      const data = doc.data();

      return { data: data, id: id };
    });
    return docs.filter((e) => e.data.email === email);
  };

  const getUserArticle = async (email: string) => {
    const colRef = collection(firestore, "buy-article");

    const snapshot = await getDocs(colRef);

    const docs = snapshot.docs.map((doc) => {
      const data = doc.data();

      return data;
    });
    return docs.filter((e) => e.email === email);
  };

  const userBuyArticle = async (
    email: string,
    title: string,
    link: string,
    price: number,
    coin: number,
    ticket: number,
    name: string,
    id: string
  ) => {
    if (coin - price <= 0) return alert("not enough coin!");

    const userDoc = doc(firestore, "users", id);
    await updateDoc(userDoc, {
      email: email,
      username: name,
      coin: coin - price,
      ticket: ticket + 1,
    });

    return addDoc(collection(firestore, "buy-article"), {
      link: link,
      title: title,
      email: email,
    });
  };

  const getUserPrize = async (
    type: string,
    key: number,
    value: number,
    id: string,
    ticket: number,
    coin: number
  ) => {
    let data = {};
    if (type === "coin") {
      if (key === 1) {
        data = { coin: coin + value, isGet50: true, ticket: ticket - 1 };
      } else {
        data = {
          coin: coin + value,
          ticket: ticket - 1,
        };
      }
    }
    if (type === "ticket") {
      if (key === 3) {
        data = {
          ticket: ticket - 1,
        };
      }
    }
    const userDoc = doc(firestore, "users", id);
    await updateDoc(userDoc, data);
    return data;
  };

  const register = async (
    email: string,
    password: string,
    userName: string
  ) => {
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
      value={{
        user,
        login,
        register,
        logout,
        addUserDocument,
        userBuyArticle,
        getUserDataByEmail,
        getUserArticle,
        getUserPrize,
      }}
    >
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};
