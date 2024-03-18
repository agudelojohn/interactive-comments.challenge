import UserContext from "@/context/userContext";
import Image from "next/image";
import { FormEvent, useContext, useEffect, useState } from "react";
import ActionButtons from "./ActionButtons";
import { IBaseComment, INewComment } from "utils/interfaces/comments";
import { sendData } from "utils/dataFetching";

const UserComment: React.FC = () => {
  const [value, setValue] = useState("");
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("MiComponente debe estar dentro del ThemeContext.Provider");
  }
  const { user, editText } = context;
  useEffect(() => {
    setValue(editText);
  }, [editText]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (user && value) {
      const newComment: INewComment = {
        comment: {
          content: value,
          createdAt: new Date().toString(),
          score: 0,
          user: {
            image: {
              png: user.image?.png ?? "",
              webp: user.image?.webp ?? "",
            },
            username: user.username,
          },
        },
        replies: [],
      };
      try {
        await sendData(newComment);
        setValue('')
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <div className="bg-white w-full rounded-lg p-5">
      <form className="grid grid-cols-12" onSubmit={handleSubmit}>
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <ActionButtons />
      </form>
    </div>
  );
};

export default UserComment;
