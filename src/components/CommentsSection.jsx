import React, { useState, useEffect } from 'react';
import { fetchComments, deleteComment, editComment, addComment } from '../api';
import { useAuth } from '../context/AuthContext';


const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        const fetchedComments = await fetchComments(postId);
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setErrorMessage('Failed to fetch comments.');
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId, user])

  const handleNewCommentSubmit = async (event) => {
    event.preventDefault();
    if (newCommentText.trim()) {
      try {
        // Include the user_id in the new comment object
        const newComment = await addComment(postId, { comment: newCommentText, user_id: user?.id });
        setComments((prevComments) => [...prevComments, {...newComment, user_name: user?.name}]);
        setNewCommentText('');
      } catch (error) {
        console.error('Error adding new comment:', error);
        setErrorMessage('Failed to submit comment.');
      }
    }
  };

  const handleEdit = (comment) => {
    setEditCommentId(comment.id);
    setEditText(comment.comment);
  };

  console.log("Logged in user details: ", user);

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      setErrorMessage('Failed to delete comment.');
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (!editText.trim()) return;

    try {
      const updatedComment = await editComment(editCommentId, { comment: editText });
      setComments(comments.map((comment) =>
        comment.id === editCommentId ? { ...comment, ...updatedComment } : comment
      ));
      setEditCommentId(null);
    } catch (error) {
      console.error('Error editing comment:', error);
      setErrorMessage('Failed to edit comment.');
    }
  };

  if (loading) {
    return <p>Loading comments...</p>;
  }

  return (
    <div className="container mx-auto my-8">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {user && (
        <form onSubmit={handleNewCommentSubmit} className="mb-4">
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full h-32 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-200">
            Submit Comment
          </button>
        </form>
      )}
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="p-4 bg-white rounded shadow">
            {editCommentId === comment.id ? (
              <form onSubmit={handleEditSubmit}>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full h-32 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button type="submit" className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded transition duration-200">
                  Save
                </button>
                <button onClick={() => setEditCommentId(null)} type="button" className="ml-2 mt-2 px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded transition duration-200">
                  Cancel
                </button>
              </form>
            ) : (
              <div>
                <p className="whitespace-pre-line text-gray-800">{comment.comment}</p>
                <p className="text-sm text-gray-600">Posted by: {comment.user_name || 'Anonymous'}</p>
                {user && user.id === comment.user_id && (
                  <div className="mt-2">
                    <button onClick={() => handleEdit(comment)} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold rounded transition duration-200">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(comment.id)} className="ml-2 px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded transition duration-200">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;