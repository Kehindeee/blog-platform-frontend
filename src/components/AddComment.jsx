import React, { useState } from 'react';
import { addComment } from '../api'; // Assume you have this function

const AddComment = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addComment(postId, comment);
    onCommentAdded(); // Callback to refresh comments list
    setComment(''); // Reset comment input
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        rows="4"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Post Comment
      </button>
    </form>
  );
};

export default AddComment;
