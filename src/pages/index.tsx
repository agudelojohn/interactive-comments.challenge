// use-client
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { IComment } from "../../utils/interfaces/comments";

let socket: ReturnType<typeof io>;

export default function Home() {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((comments) => setComments(comments));

    if (!socket) {
      socket = io();

      socket.on("itemAdded", (item: any) => {
        setComments((prevItems) => [...prevItems, item]);
        console.log("itemAdded", item);
      });
    }

    return () => {
      socket.off("itemAdded");
      console.log("Removed -> Socket Off");
    };
  }, []);

  return (
    <ul>
      {comments &&
        comments.map((comment) => {
          return <li key={comment.id}>{comment.content}</li>;
        })}
    </ul>
  );
}
