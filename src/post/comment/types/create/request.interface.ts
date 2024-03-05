export interface ICommentCreate {
  answer: string;
  memberId: string;
  isFiltered?: boolean;
  postId: number;
}
