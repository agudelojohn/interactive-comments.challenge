import UserContext from "@/context/userContext";
import Image from "next/image";
import { useContext } from "react";

const UserComment: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("MiComponente debe estar dentro del ThemeContext.Provider");
  }
  const { user } = context;
  return (
    <div className="bg-white w-full rounded-lg p-5">
      <div className="grid grid-cols-12">
        <Image
          src={user?.image?.png ?? user?.image?.webp ?? "/user.png"}
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
