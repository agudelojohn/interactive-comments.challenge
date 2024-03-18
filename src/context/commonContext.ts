import React from "react";

interface IContext {
  focusView: JSX.Element|undefined,
  setFocusView: (element:JSX.Element|undefined) => void
}

const CommonContext = React.createContext<IContext | undefined>(undefined);

export default CommonContext;