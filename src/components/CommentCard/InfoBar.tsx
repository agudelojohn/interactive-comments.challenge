import Image from "next/image";
import { getTimeDifference } from "utils/timeHandling";
import { CommentActions } from "./CommentActions";
import ReplyButton from "./ReplyButton";

interface IInfoBar {
  imgSrc?: string;
  userName: string;
  dateOfComment: Date;
  isOwnComment: boolean;
  commentId: number;
  handleOnEdit: () => void;
}

const InfoBar: React.FC<IInfoBar> = ({
  imgSrc,
  userName,
  dateOfComment,
  isOwnComment,
  commentId,
  handleOnEdit,
}) => {
  return (
    <div className="w-full flex flex-row gap-5 items-center">
      {/* Image */}
      <Image
        src={imgSrc ?? "/user.png"}
        alt="user image"
        width={32}
        height={32}
        className="rounded-full"
      />
      {/* name */}
      <small className="text-darkBlue text-base font-bold">{userName}</small>
      {/* date */}
      <small className="text-grayishBlue">
        {getTimeDifference(dateOfComment)}
      </small>
      {/* Reply Button ? */}
      {isOwnComment && (
        <div className="hidden md:flex ml-auto"><CommentActions commentId={commentId} handleOnEdit={handleOnEdit} /></div>
      )}
      {!isOwnComment && (
        <ReplyButton
          className="ml-auto hidden md:flex items-start"
          type="primary"
          commentUserName={userName}
        />
      )}
    </div>
  );
};

export default InfoBar;
