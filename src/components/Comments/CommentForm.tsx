import React, { useState } from "react";
import { addItem } from "../../library/indexedDB";

type CommentFormProps = { parentId: number | null; fetchComments: () => void };

export const CommentForm: React.FC<CommentFormProps> = ({
  parentId,
  fetchComments,
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addItem({ content, parentId });
      await fetchComments();
    } catch (error) {
      console.error("Failed to add comment: ", error);
    } finally {
      setContent("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full rounded-lg p-2 shadow-sm space-x-2"
    >
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentId ? "Reply..." : "Add a comment..."}
        className="flex-grow px-3 py-4 border-none focus:outline-none frounded-lg"
      />
      <button
        type="submit"
        className="bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
      >
        Submit
      </button>
    </form>
  );
};
