"use-client";
import { ICommentData, IReplyCard } from "@/components/CommentCard/interfaces";
import CommentGroup from "@/components/CommentGroup/CommentGroup";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { IComment } from "../../utils/interfaces/comments";
let socket: ReturnType<typeof io>;

export default function Home() {
  const [comments, setComments] = useState<ICommentData[]>([]);
  const endOfList = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((comments: IComment[]) => {
        const parcedComments = comments.map((comment) => {
          return parseComment(comment);
        });
        setComments(parcedComments);
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
    if (endOfList.current) desplazarAlFinal();
  }, [comments.length]);

  const desplazarAlFinal = () => {
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
      <div ref={endOfList} />
    </>
  );
}
