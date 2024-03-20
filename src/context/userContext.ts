import React from "react";
import { IUserData } from "utils/interfaces/comments";

interface IContext {
  user: IUserData | undefined;
  setUser: (user: IUserData) => void;
  onEdit: { id: number; isEditing: boolean; editText: string };
  setOnEdit: ({
    id,
    isEditing,
    editText,
  }: {
    id: number;
    isEditing: boolean;
    editText: string;
  }) => void;
  onReply: string;
  setOnReply: (userName: string) => void;
}

const UserContext = React.createContext<IContext | undefined>(undefined);

export default UserContext;
