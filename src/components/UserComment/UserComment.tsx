import Image from "next/image";
import { IUserData } from "../CommentCard/interfaces";
// interface IProps {
//   userData: IUserData
// }
// const UserComment: React.FC<IProps> = (userData) => {

const UserComment: React.FC = () => {
  const imgSrc = null;
  return (
    <div className="bg-white w-full rounded-lg p-5">
      <div className="grid grid-cols-12">
        <Image
          src={imgSrc ?? "/user.png"}
          alt="user image"
          width={40}
          height={40}
          className="rounded-full col-span-1 m-auto"
        />
        <textarea
          className="col-span-9 row-span-2 min-h-24 p-2 border-[1px] border-lightGray"
          placeholder="Add a comment..."
        />
        {/* <input type="text" className="col-span-8 row-span-2 min-h-24" placeholder="Add a comment..."/> */}
        <button className="btn btn-secondary col-span-2 font-bold h-12 w-[104px] m-auto ">
          SEND
        </button>
      </div>
    </div>
  );
};

export default UserComment;
