import { useCallback, useEffect, useState } from "react";
import { CommentForm } from "./components/Comments/CommentForm";
import { CommentList } from "./components/Comments/CommentList";
import { commentChannel, getAllItems } from "./library/indexedDB";
import { CommentType } from "./types";

function App() {
  const [allComments, setAllComments] = useState<CommentType[]>([]);

  const preprocessComments = useCallback((data: CommentType[]) => {
    const commentMap: Record<number, CommentType> = {};
    const parentComments: CommentType[] = [];

    data.forEach((comment) => {
      commentMap[comment.id] = { ...comment, replies: [] };
    });

    data.forEach((comment) => {
      if (comment.parentId) {
        const parent = commentMap[comment.parentId];
        if (parent) {
          parent.replies?.push(commentMap[comment.id]);
        }
      } else {
        parentComments.push(commentMap[comment.id]);
      }
    });

    return parentComments;
  }, []);

  const fetchComments = useCallback(async () => {
    try {
      const result: CommentType[] = await getAllItems();
      setAllComments(preprocessComments(result));
    } catch (error) {
      console.error("Could not fetch comments from  DB", error);
    }
  }, [preprocessComments]);

  useEffect(() => {
    commentChannel.onmessage = async (event) => {
      if (event.data === 'comment_updated') {
        await fetchComments();
      }
    }
  }, [fetchComments]);

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  return (
    <div className="flex flex-col m-auto max-w-4xl mt-40 content-center p-10">
      <CommentForm parentId={null} fetchComments={fetchComments} />
      <CommentList allComments={allComments} fetchComments={fetchComments} />
    </div>
  );
}

export default App;
