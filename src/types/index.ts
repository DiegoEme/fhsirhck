export type CommentType = {
  content: string;
  id: number;
  parentId: number | null
  replies?: CommentType[]
}