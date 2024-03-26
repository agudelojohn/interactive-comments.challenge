"use-client";
import { ICommentData } from "@/components/CommentCard/interfaces";
import CommentGroup from "@/components/CommentGroup/CommentGroup";
import UserComment from "@/components/UserComment/UserComment";
import UserContext from "@/context/userContext";
import { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { getData, parseComment } from "utils/dataFetching";
let socket: ReturnType<typeof io>;

export default function Home() {
  const [comments, setComments] = useState<ICommentData[]>([]);
  const endOfList = useRef<HTMLInputElement>(null);


  const context = useContext(UserContext);
  if (!context) {
    throw new Error("MiComponente debe estar dentro del ThemeContext.Provider");
  }
  const { setUser, onEdit } = context;

  useEffect(() => {
    async function fetchData() {
      const { currentUser, parcedComments } = await getData();
      setComments(parcedComments);
      setUser(currentUser);
    }
    fetchData();
  }, []);

  useEffect(() => {
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
  }, [comments.length, onEdit]);

  const scrollToBottom = () => {
    endOfList.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <>
      <div className="flex justify-center py-8 px-8 w-full">
        <div className="w-full md:w-[730px]">
          {comments &&
            comments.map((comment, i) => {
              return <CommentGroup key={i} data={comment} />;
            })}
        </div>
      </div>
      <div  className="px-4 md:px-0 pb-3"><UserComment /></div>      
      <div ref={endOfList} />
    </>
  );
}
