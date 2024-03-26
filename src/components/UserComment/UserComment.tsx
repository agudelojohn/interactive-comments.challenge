import UserContext from "@/context/userContext";
import Image from "next/image";
import { FormEvent, useContext, useEffect, useState } from "react";
import { sendData } from "utils/dataFetching";
import { INewComment } from "utils/interfaces/comments";
import ActionButtons from "./ActionButtons";

const UserComment: React.FC = () => {
  const [value, setValue] = useState("");
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("MiComponente debe estar dentro del ThemeContext.Provider");
  }
  const {
    user,
    onEdit: { editText },
    onReply,
    setOnReply,
  } = context;
  useEffect(() => {
    setValue(editText);
  }, [editText]);

  useEffect(() => {
    if (onReply != "") {
      const toReply = `@${onReply}`;
      setValue((prev) => {
        if (prev) {
          if (prev.startsWith("@")) {
            const oldText = prev.split(" ");
            oldText[0] = toReply;
            return oldText.join(" ");
          }
          return toReply?.concat(` ${prev}`);
        }
        return toReply;
      });
      setOnReply("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onReply]);

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
        setValue("");
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
          className="rounded-full col-span-2 md:col-span-1 m-auto order-2 md:order-1"
        />
        <textarea
          className="rounded-lg col-span-12 md:col-span-9 row-span-2 min-h-24 p-2 border-[1px] border-lightGray order-1 md:order-2 mb-5 md:mb-0"
          placeholder="Add a comment..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="order-3 col-span-10 md:col-span-2 ml-auto md:m-auto">
          <ActionButtons />
        </div>
      </form>
    </div>
  );
};

export default UserComment;
