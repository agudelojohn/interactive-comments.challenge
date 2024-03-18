import { ICommentData, IReplyCard } from "@/components/CommentCard/interfaces";
import { IComment, INewComment, IResponseData } from "./interfaces/comments";

export async function getData() {
  const response = (await fetch("/api/comments")).json();
  const commentsData: IResponseData = await response;
  const { currentUser, comments } = await commentsData;
  const parcedComments = comments.map((comment) => {
    return parseComment(comment);
  });
  return { currentUser, parcedComments };
}

export async function sendData(newComment: INewComment) {
  const res = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify(newComment),
  });
  if (!res.ok) {
    throw new Error("Error sending data");
  }
  const response = await res.json();
  return response;
}

export function parseComment(rawComment: IComment) {
  let comment: ICommentData = {
    main: {
      comment: rawComment.content,
      likes: rawComment.score,
      userData: {
        dateOfComment: new Date(rawComment.createdAt),
        userName: rawComment.user.username,
        image: rawComment.user.image.png ?? rawComment.user.image.webp ?? "",
      },
    },
    replies: rawComment.replies.map((reply) => {
      console.log(reply);
      const replyData: IReplyCard = {
        comment: reply.content,
        likes: reply.score,
        userData: {
          dateOfComment: new Date(reply.createdAt),
          userName: reply.user.username,
          image: reply.user.image.png ?? reply.user.image.webp ?? "",
        },
      };
      return replyData;
    }),
  };
  return comment;
}
