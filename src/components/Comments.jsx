import React, { useEffect, useState } from 'react';
import { fetchComments } from '../api'; // Assume you have this function in your api.js

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(postId).then(setComments);
  }, [postId]);

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="bg-white shadow p-4 rounded-lg">
          <p className="text-sm">{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
