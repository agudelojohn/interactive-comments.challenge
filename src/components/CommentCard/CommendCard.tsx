import UserContext from "@/context/userContext";
import { useContext } from "react";
import { CommentActions } from "./CommentActions";
import InfoBar from "./InfoBar";
import LikeButton from "./LikeButton";
import { ICommentCard } from "./interfaces";
import ReplyButton from "./ReplyButton";

export interface IProps {
  data: ICommentCard;
}

const CommentCard: React.FC<IProps> = ({
  data: { id, userData, comment, likes, replyingTo },
}) => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("MiComponente debe estar dentro del ThemeContext.Provider");
  }
  const { user, setOnEdit } = context;
  const isOwnComment = user?.username === userData.userName;

  function handleOnEdit() {
    setOnEdit({
      id,
      isEditing: true,
      editText: comment,
    });
  }
  return (
    <div className="w-full bg-white rounded-lg p-5 flex flex-col-reverse md:flex-row gap-6">
      {/* 1. Buttons */}
      <div className="flex md:block">
        <LikeButton
          onPlusClick={() => console.log("plusClick")}
          onMinusClick={() => console.log("minusClick")}
          likes={likes}
        />
        <div className="md:hidden m-auto mr-0">
          {isOwnComment && (
            <CommentActions commentId={id} handleOnEdit={handleOnEdit} />
          )}
          {!isOwnComment && user && (
            <ReplyButton type="primary" commentUserName={user.username} />
          )}
        </div>
      </div>
      {/* 2. Data relevant */}
      <div className="w-full flex flex-col gap-4 mb-2">
        <div>
          <InfoBar
            userName={userData.userName}
            dateOfComment={userData.dateOfComment}
            imgSrc={userData.image}
            isOwnComment={isOwnComment}
            commentId={id}
            handleOnEdit={handleOnEdit}
          />
        </div>
        <div className="text-grayishBlue text-base leading-6">
          {replyingTo && (
            <span className="text-moderateBlue font-bold mr-1 cursor-pointer">{`@${replyingTo}`}</span>
          )}
          {comment}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
