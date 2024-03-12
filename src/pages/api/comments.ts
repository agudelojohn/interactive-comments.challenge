//@ts-nocheck
// Agregar al inicio del archivo
const io = global.io;
import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

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

let fileData:{items:any[]} = { items: [] };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const { item } = req.body;

    // const filePath = path.join(process.cwd(), "public", "data.json");
    // const fileData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    fileData.items.push(item);

    // fs.writeFileSync(filePath, JSON.stringify(fileData));

    const io = (global as any).io as Server;
    io.emit("itemAdded", item); // Emitir el evento de nuevo item

    return res.status(200).json({ message: "Item added successfully" });
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
