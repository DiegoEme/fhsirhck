import React, { useState } from "react";
import { addItem } from "../../library/indexedDB";

type CommentFormProps = {
  parentId: number | null;
  fetchComments: () => void;
  setShowForm?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CommentForm: React.FC<CommentFormProps> = ({
  parentId,
  fetchComments,
  setShowForm,
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (content == "") return;

    try {
      await addItem({ content, parentId });
      await fetchComments();
      if (setShowForm) setShowForm(false);
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
        disabled={content == ""}
        type="submit"
        className="disabled:bg-gray-400 bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
      >
        Submit
      </button>
    </form>
  );
};
