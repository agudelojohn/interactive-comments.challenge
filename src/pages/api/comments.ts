//@ts-ignore
const io = global.io;
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { Server } from "socket.io";

var fs = require("fs");

interface IBaseComment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
}

interface IComment extends IBaseComment {
  replies: IBaseComment[];
}

interface IReply extends IBaseComment {
  replyingTo: string;
}

interface IData {
  currentUser: { image?: { png?: string; webp?: string }; username: string };
  comments: IComment[];
}

const filePath = path.join(process.cwd(), "data.json");
const fileData: IData = JSON.parse(fs.readFileSync(filePath, "utf8"));

function getLastId(comments: Array<IComment | IBaseComment>) {
  let lastId = 0;
  comments.forEach((comment) => {
    lastId = Math.max(lastId, comment.id);
    if ("replies" in comment && comment.replies.length > 0) {
      lastId = Math.max(lastId, getLastId(comment.replies));
    }
  });
  return lastId;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const { comment } = req.body;

    if (fileData) {
      const { comments } = fileData;
      const lastId = getLastId(comments);
      comments.push({ id: lastId + 1, ...comment });
      fs.writeFileSync(filePath, JSON.stringify(fileData));

      const io = (global as any).io as Server;
      io.emit("itemAdded", comment);

      return res.status(200).json({ message: "Comment added successfully" });
    }
    return (res.status(505).end().statusMessage = "Error getting data");
  } else {
    // Manejar otros métodos HTTP o devolver un error
    return res.status(405).end();
  }

  //   const comment: IComment = {
  //     id: 1,
  //     content:
  //       "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
  //     createdAt: "1 month ago",
  //     score: 12,
  //     user: {
  //       image: {
  //         png: "./images/avatars/image-amyrobson.png",
  //         webp: "./images/avatars/image-amyrobson.webp",
  //       },
  //       username: "amyrobson",
  //     },
  //     replies: [],
  //   };
  //   res.status(200).json([comment]);
}
