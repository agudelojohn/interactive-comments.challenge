import InfoBar from "./InfoBar";
import LikeButton from "./LikeButton";

type IUserData = {
  userName: string;
  dateOfComment: Date;
  image?:string;
};

interface IReplyCard {
  userData: IUserData;
  likes: number;
  comment: string;
}

export type ICommentCard = {
  userData: IUserData;
  comment: string;
  likes: number;
};

interface IProps {
  data: ICommentCard;
}

const CommentCard: React.FC<IProps> = ({ data: { userData, comment, likes } }) => {
  return (
    <div className="w-full bg-white rounded-lg p-5 flex flex-row gap-5">
      {/* 1. Buttons */}
      <LikeButton
        onPlusClick={() => console.log("plusClick")}
        onMinusClick={() => console.log("minusClick")}
        likes={likes}
      />
      {/* 2. Data relevant */}
      <div className="w-full flex flex-col">
        <div>
          <InfoBar
            userName={userData.userName}
            dateOfComment={userData.dateOfComment}
            imgSrc={userData.image}
          />
        </div>
        <div>{comment}</div>
      </div>
    </div>
  );
};

export default CommentCard;
