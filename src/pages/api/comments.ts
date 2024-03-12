//@ts-ignore
const io = global.io;
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { Server } from "socket.io";
import {
  IBaseComment,
  IComment,
  IData,
} from "../../../utils/interfaces/comments";

var fs = require("fs");

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
      const newComment = { id: lastId + 1, ...comment };
      comments.push(newComment);
      fs.writeFileSync(filePath, JSON.stringify(fileData));
      const io = (global as any).io as Server;
      io.emit("itemAdded", newComment);
      return res.status(200).json({ message: "Comment added successfully" });
    }
    return (res.status(505).end().statusMessage = "Error getting data");
  } else if (req.method === "GET") {
    if (fileData) {      
      const { comments } = fileData;
      return res.status(200).json(comments)
    }
    return (res.status(505).end().statusMessage = "Error getting data");
  } else {
    return res.status(405).end();
  }
}
