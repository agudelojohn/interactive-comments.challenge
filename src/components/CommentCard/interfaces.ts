export type IUserData = {
  userName: string;
  dateOfComment: Date;
  image?: string;
};

export interface IReplyCard {
  id: number;
  userData: IUserData;
  likes: number;
  comment: string;
  replyingTo: string;
}

export type ICommentCard = {
  id: number;
  userData: IUserData;
  comment: string;
  likes: number;
  replyingTo?: string;
};

export type ICommentData = {
  main: ICommentCard;
  replies: IReplyCard[];
};
