import React, { useState } from 'react';
import { addItem } from '../../library/indexedDB';

export const CommentForm: React.FC<{ parentId?: number }> = ({ parentId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addItem({content});
    } catch (error) {
      console.error('Failed to add comment: ', error);
    } finally{
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={parentId ? 'Reply...' : 'Add a comment...'}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
