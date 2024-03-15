import InfoBar from "./InfoBar";
import LikeButton from "./LikeButton";
import { ICommentCard } from "./interfaces";

export interface IProps {
  data: ICommentCard;
}

const CommentCard: React.FC<IProps> = ({
  data: { userData, comment, likes },
}) => {
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
          />
        </div>
        <div className="text-grayishBlue text-base leading-6">{comment}</div>
      </div>
    </div>
  );
};

export default CommentCard;
