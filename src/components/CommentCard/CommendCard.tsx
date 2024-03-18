import { useContext, useEffect } from "react";
import InfoBar from "./InfoBar";
import LikeButton from "./LikeButton";
import { ICommentCard } from "./interfaces";
import UserContext from "@/context/userContext";

export interface IProps {
  data: ICommentCard;
}

const CommentCard: React.FC<IProps> = ({
  data: { userData, comment, likes },
}) => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("MiComponente debe estar dentro del ThemeContext.Provider");
  }
  const { user, onEdit, setEditText } = context;
  useEffect(() => {
    if (onEdit) setEditText(comment);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEdit]);
  return (
    <div className="w-full bg-white rounded-lg p-5 flex flex-row gap-6">
      {/* 1. Buttons */}
      <LikeButton
        onPlusClick={() => console.log("plusClick")}
        onMinusClick={() => console.log("minusClick")}
        likes={likes}
      />
      {/* 2. Data relevant */}
      <div className="w-full flex flex-col gap-4 mb-2">
        <div>
          <InfoBar
            userName={userData.userName}
            dateOfComment={userData.dateOfComment}
            imgSrc={userData.image}
            isOwnComment={user?.username === userData.userName}
          />
        </div>
        <div className="text-grayishBlue text-base leading-6">{comment}</div>
      </div>
    </div>
  );
};

export default CommentCard;
