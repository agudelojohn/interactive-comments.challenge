import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { createContext, useContext, useState } from "react";
import UserContext from "@/context/userContext";
import { IUserData } from "utils/interfaces/comments";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<IUserData>();
  const [onEdit, setOnEdit] = useState<boolean>(false)
  const [editText, setEditText] = useState('')
  return (
    <UserContext.Provider value={{ user, setUser, onEdit, setOnEdit, editText, setEditText }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
