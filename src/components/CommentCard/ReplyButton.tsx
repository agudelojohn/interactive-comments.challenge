import { Icon } from "@iconify/react";
interface IReplayButton {
  className?: string;
  type?: "primary" | "secondary";
}
const ReplyButton: React.FC<IReplayButton> = ({
  className,
  type = "primary",
}) => {
  const btnType = type === "primary" ? "btn-primary" : "btn-secondary";
  const btnText = "Reply";
  return (
    <div
      className={`font-bold btn ${className} ${btnType} ${
        type === "secondary" ? "w-[104px] h-[48px]" : ""
      }`}
    >
      {type === "primary" && (
        <Icon icon="icon-park-solid:back" className="text-lg" />
      )}
      {type === "primary" ? btnText : btnText.toUpperCase()}
    </div>
  );
};

export default ReplyButton;
