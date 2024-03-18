import { BlockingView } from "@/components/BlockingView/BlockingView";
import { DeleteConfirmation } from "@/components/CommentCard/DeleteConfirmation";
import CommonContext from "@/context/commonContext";
import UserContext from "@/context/userContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { IUserData } from "utils/interfaces/comments";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<IUserData>();
  const [onEdit, setOnEdit] = useState<{
    id: number;
    isEditing: boolean;
    editText: string;
  }>({
    id: 0,
    isEditing: false,
    editText: "",
  });
  const [focusView, setFocusView] = useState<JSX.Element|undefined>(undefined);
  return (
    <CommonContext.Provider value={{ focusView, setFocusView }}>
      <UserContext.Provider value={{ user, setUser, onEdit, setOnEdit }}>
        {focusView !== undefined && <BlockingView />}
        <Component {...pageProps} />
      </UserContext.Provider>
    </CommonContext.Provider>
  );
}
