import React, { useState } from "react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import { CommentType } from "../../types";

export const Comment: React.FC<{
  comment: CommentType;
  level: number;
  fetchComments: () => void;
}> = ({ comment, level, fetchComments }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <p>
        {comment.content}{" "}
        <span style={{ fontSize: "12px", color: "#818384" }}>
          Level {level}
        </span>
      </p>
      <p onClick={() => setShowForm(!showForm)}>Reply</p>
      {showForm && (
        <div>
          <CommentForm parentId={comment.id} fetchComments={fetchComments} />
        </div>
      )}

      {comment.replies && (
        <div style={{ marginTop: "20px" }}>
          <CommentList
            allComments={comment.replies}
            level={level + 1}
            fetchComments={fetchComments}
          />
        </div>
      )}
    </div>
  );
};
