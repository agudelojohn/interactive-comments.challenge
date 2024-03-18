export type IUserData = {
  userName: string;
  dateOfComment: Date;
  image?: string;
};

export interface IReplyCard {
  id:number,
  userData: IUserData;
  likes: number;
  comment: string;
}

export type ICommentCard = {
  id:number,
  userData: IUserData;
  comment: string;
  likes: number;
};

export type ICommentData = {
  main: ICommentCard;
  replies: IReplyCard[];
}
