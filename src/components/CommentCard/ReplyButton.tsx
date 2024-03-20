import UserContext from "@/context/userContext";
import { Icon } from "@iconify/react";
import { useContext } from "react";
interface IReplayButton {
  className?: string;
  type?: "primary" | "secondary";
  commentUserName:string;
}
const ReplyButton: React.FC<IReplayButton> = ({
  className,
  type = "primary",
  commentUserName
}) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("MiComponente debe estar dentro del ThemeContext.Provider");
  }
  const { setOnReply } = userContext;
  const btnType = type === "primary" ? "btn-primary" : "btn-secondary";
  const btnText = "Reply";
  return (
    <div
      className={`font-bold btn ${className} ${btnType} ${
        type === "secondary" ? "w-[104px] h-[48px]" : ""
      }`}
      onClick={()=>setOnReply(commentUserName)}
    >
      {type === "primary" && (
        <Icon icon="icon-park-solid:back" className="text-lg" />
      )}
      {type === "primary" ? btnText : btnText.toUpperCase()}
    </div>
  );
};

export default ReplyButton;
