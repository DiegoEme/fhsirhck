import React, { useState } from "react";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";
import { CommentType } from "../../types";
import { deleteItem } from "../../library/indexedDB";

type CommentProps = {
  comment: CommentType;
  fetchComments: () => void;
};

export const Comment: React.FC<CommentProps> = ({
  comment,
  fetchComments,
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);

  async function recDelete(comment: CommentType): Promise<void> {
    if (comment.replies && comment.replies.length > 0) {
      await Promise.all(comment.replies.map(recDelete));
    }
  
    await deleteItem(comment.id);
  }

  const handleDelete = async () => {
    try {
      await recDelete(comment);
      await fetchComments();
    } catch (error) {
      console.error("Failed to delete comment: ", error);
    }
  };

  return (
    <div className={"w-full p-4 rounded-lg"}>
      <p className="text-lg mb-2">{comment.content}</p>

      <div className="flex justify-between">
        <span
          onClick={() => setShowForm(!showForm)}
          className="text-sky-600 text-xs cursor-pointer hover:underline"
        >
          Reply
        </span>
        <span
          className="hover:underline text-red-500 text-xs cursor-pointer"
          onClick={handleDelete}
        >
          delete
        </span>
      </div>

      {showForm && (
        <div className="mt-4">
          <CommentForm
            setShowForm={setShowForm}
            parentId={comment.id}
            fetchComments={fetchComments}
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 pl-6 border-l-2 border-gray-100">
          <CommentList
            allComments={comment.replies}
            fetchComments={fetchComments}
          />
        </div>
      )}
    </div>
  );
};
