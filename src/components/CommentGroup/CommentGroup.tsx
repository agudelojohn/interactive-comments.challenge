import CommentCard from "../CommentCard/CommendCard";
import { ICommentData } from "../CommentCard/interfaces";

interface IProps {
  data: ICommentData;
}

export const CommentGroup: React.FC<IProps> = ({ data: { main, replies } }) => {
  return (
    <div className="grid grid-cols-12 mb-4">
      <div className="col-span-12">{main && <CommentCard data={main} />}</div>
      {replies && replies.length > 0 && (
        <>
          <div className="col-span-1 row-span-12  bg-blue-500"></div>
          <div className="col-span-11 gap-4 grid mt-4">
            {replies.map((reply, id) => {
              return <CommentCard key={id} data={reply} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentGroup;
