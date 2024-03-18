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
  id: number;
  replies: IBaseComment[];
}

export interface IReply extends IBaseComment {
  id: number;
  replyingTo: string;
}

export interface IUserData {
  image?: { png?: string; webp?: string };
  username: string;
}

export interface IResponseData {
  currentUser: IUserData;
  comments: IComment[];
}

export interface INewComment {
  comment: {
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
  };
  replies?: IBaseComment[];
}
