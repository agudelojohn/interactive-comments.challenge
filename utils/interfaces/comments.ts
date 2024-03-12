export interface IBaseComment {
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

export interface IComment extends IBaseComment {
  replies: IBaseComment[];
}

export interface IReply extends IBaseComment {
  replyingTo: string;
}

export interface IData {
  currentUser: { image?: { png?: string; webp?: string }; username: string };
  comments: IComment[];
}
