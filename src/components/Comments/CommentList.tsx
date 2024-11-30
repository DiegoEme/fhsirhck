import React from "react";
import { Comment } from "./Comment";
import { CommentType } from "../../types";

type CommentListProps = {
  allComments: CommentType[];
  level: number;
  fetchComments: () => void;
};

export const CommentList: React.FC<CommentListProps> = ({
  allComments,
  level,
  fetchComments,
}) => {
  return (
    <div>
      {allComments.map((comment: CommentType) => (
        <Comment
          fetchComments={fetchComments}
          key={comment.id}
          comment={comment}
          level={level}
        />
      ))}
    </div>
  );
};
