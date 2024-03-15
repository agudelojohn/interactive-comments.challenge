"use-client";
import { ICommentData, IReplyCard } from "@/components/CommentCard/interfaces";
import CommentGroup from "@/components/CommentGroup/CommentGroup";
import { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { IComment, IResponseData } from "../../utils/interfaces/comments";
import UserComment from "@/components/UserComment/UserComment";
import UserContext from "@/context/userContext";
let socket: ReturnType<typeof io>;

export default function Home() {
  const [comments, setComments] = useState<ICommentData[]>([]);
  const endOfList = useRef<HTMLInputElement>(null);

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("MiComponente debe estar dentro del ThemeContext.Provider");
  }
  const { setUser } = context;

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data: IResponseData) => {
        const { currentUser, comments } = data;
        const parcedComments = comments.map((comment) => {
          return parseComment(comment);
        });
        setComments(parcedComments);
        setUser(currentUser)
      });

    if (!socket) {
      socket = io();
      console.log("Socket On");
      socket.on("itemAdded", (item: any) => {
        setComments((prevItems) => [...prevItems, parseComment(item)]);
        console.log("itemAdded", item);
      });
    }

    return () => {
      socket.off("itemAdded");
      console.log("Removed -> Socket Off");
    };
  }, []);

  useEffect(() => {
    if (endOfList.current) scrollToBottom();
  }, [comments.length]);

  const scrollToBottom = () => {
    endOfList.current?.scrollIntoView({ behavior: "smooth" });
  };

  function parseComment(rawComment: IComment) {
    let comment: ICommentData = {
      main: {
        comment: rawComment.content,
        likes: rawComment.score,
        userData: {
          dateOfComment: new Date(rawComment.createdAt),
          userName: rawComment.user.username,
          // image:
        },
      },
      replies: rawComment.replies.map((reply) => {
        const replyData: IReplyCard = {
          comment: reply.content,
          likes: reply.score,
          userData: {
            dateOfComment: new Date(reply.createdAt),
            userName: reply.user.username,
            // image
          },
        };
        return replyData;
      }),
    };
    return comment;
  }

  return (
    <>
      <div className="flex justify-center py-8">
        <div className="w-[730px]">
          {comments &&
            comments.map((comment, i) => {
              return <CommentGroup key={i} data={comment} />;
            })}
        </div>
      </div>
      <UserComment />
      <div ref={endOfList} />
    </>
  );
}
