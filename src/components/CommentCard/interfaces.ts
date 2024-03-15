export type IUserData = {
  userName: string;
  dateOfComment: Date;
  image?: string;
};

export interface IReplyCard {
  userData: IUserData;
  likes: number;
  comment: string;
}

export type ICommentCard = {
  userData: IUserData;
  comment: string;
  likes: number;
};

export type ICommentData = {
  main: ICommentCard;
  replies: IReplyCard[];
}
