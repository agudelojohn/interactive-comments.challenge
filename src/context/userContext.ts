import React from "react";
import { IUserData } from "utils/interfaces/comments";

interface IContext {
  user: IUserData|undefined;
  setUser: (user:IUserData) => void;
}

const UserContext = React.createContext<IContext | undefined>(undefined);

export default UserContext;
