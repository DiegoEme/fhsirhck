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
    <div className={"w-full p-4 rounded-lg p-2"}>
      <p className="text-lg mb-2">{comment.content}</p>

      <p
        onClick={() => setShowForm(!showForm)}
        className="text-sky-600 text-xs cursor-pointer hover:underline"
      >
        Reply
      </p>

      {showForm && (
        <div className="mt-4">
          <CommentForm parentId={comment.id} fetchComments={fetchComments} />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 pl-6 border-l-2 border-gray-100">
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
