export interface IPostCreate {
  title: string;
  description: string;
  memberId: string;
  isFiltered_title?: boolean;
  isFiltered_description?: boolean;
}
