import { UserCredential } from "firebase/auth";
import { user } from "./user";

export type AuthContextType = {
  user: user | null;
  login: (email: string, password: string) => Promise<UserCredential | void>;
  register: (
    email: string,
    password: string,
    userName: string
  ) => Promise<UserCredential | void>;
  logout: () => Promise<UserCredential | void>;
  addUserDocument?: any;
  userBuyArticle?: any;
  getUserDataByEmail?: any;
  getUserArticle?: any;
};

export type AuthProps = {
  children: React.ReactNode;
};
