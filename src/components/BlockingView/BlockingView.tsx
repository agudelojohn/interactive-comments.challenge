import CommonContext from "@/context/commonContext";
import { useContext } from "react";

export const BlockingView: React.FC = () => {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error("MiComponente debe estar dentro del ThemeContext.Provider");
  }
  const { focusView } = context;
  return (
    <div
      className="w-full h-full fixed z-[9999] flex justify-center items-center"
      style={{
        backgroundColor: "rgba(0,1,0,0.7)",
      }}
    >
      {focusView}
    </div>
  );
};
