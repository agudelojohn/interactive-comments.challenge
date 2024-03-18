import React from "react";
import { IUserData } from "utils/interfaces/comments";

interface IContext {
  user: IUserData | undefined;
  setUser: (user: IUserData) => void;
  onEdit: boolean;
  setOnEdit: (onEdit: boolean) => void;
  editText: string;
  setEditText: (text: string) => void;
}

const UserContext = React.createContext<IContext | undefined>(undefined);

export default UserContext;
