import React, { useState, useEffect } from 'react';
import { fetchComments, deleteComment, editComment, addComment } from '../api';
import { useAuth } from '../context/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetchComments(postId)
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
        setErrorMessage('Failed to fetch comments.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postId]);

  const handleNewCommentSubmit = async (event) => {
    event.preventDefault();
    if (newCommentText.trim()) {
      try {
        const newComment = await addComment(postId, { comment: newCommentText });
        setComments((prevComments) => [...prevComments, newComment]);
        setNewCommentText(''); // Clear the input after submission
      } catch (error) {
        console.error('Error adding new comment:', error);
        setErrorMessage('Failed to submit comment.');
      }
    }
  };

  const handleDelete = async (commentId) => {
    // Optimistically update the UI before the request completes
    const previousComments = [...comments];
    setComments(comments.filter((comment) => comment.id !== commentId));
    
    try {
      await deleteComment(commentId, {
        withCredentials: true
      });
    } catch (error) {
      // If there's an error, roll back the optimistic update
      setComments(previousComments);
      console.error('Error deleting comment:', error);
      setErrorMessage('Failed to delete comment.');
    }
  };
  const handleEditSubmit = async (commentId) => {
    if (editText.trim()) {
      // Optimistically update the UI before the request completes
      const previousComments = [...comments];
      setComments(comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, comment: editText };
        }
        return comment;
      }));
      setEditCommentId(null);
      setEditText('');
  
      try {
        await editComment(commentId, { comment: editText }, {
          withCredentials: true
        });
      } catch (error) {
        // If there's an error, roll back the optimistic update
        setComments(previousComments);
        console.error('Error editing comment:', error);
        setErrorMessage('Failed to edit comment.');
      }
    }
  };


  if (loading) {
    return <p>Loading comments...</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {user && (
        <form onSubmit={handleNewCommentSubmit} className="mt-4">
          <ReactQuill theme="snow" value={newCommentText} onChange={setNewCommentText} className="mb-4" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit Comment
          </button>
        </form>
      )}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="mb-4">
            {editCommentId === comment.id ? (
              <div>
                <ReactQuill theme="snow" value={editText} onChange={setEditText} />
                <button
                  onClick={() => handleEditSubmit(comment.id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditCommentId(null)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <div dangerouslySetInnerHTML={{ __html: comment.comment }} className="mb-2"></div>
                <p className="text-gray-600">Posted by: {comment.user_name || "Anonymous"}</p>
                {user && user.id === comment.user_id && (
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        setEditCommentId(comment.id);
                        setEditText(comment.comment);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {!loading && comments.length === 0 && <p>No comments yet.</p>}
    </div>
  );
};

export default CommentsSection;
