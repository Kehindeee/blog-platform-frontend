import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById, fetchComments, addComment } from '../api';
import Spinner from './Spinner';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as needed

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState(''); // Correct initialization of newCommentText
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); // To display error messages
  const { postId } = useParams();
  const { user } = useAuth(); // Use useContext to access the current user

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postData = await fetchPostById(postId);
        setPost(postData);
        const commentsData = await fetchComments(postId);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching post or comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!newCommentText.trim()) return; // Prevent empty comments
    
    try {
      const newComment = await addComment(postId, { comment: newCommentText });
      setComments([...comments, newComment]);
      setNewCommentText(''); // Reset input after submission
    } catch (error) {
      setErrorMessage('Failed to submit comment.');
      console.error('Error submitting comment:', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto mt-10 p-5">
      <article className="max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{post.title}</h2>
            <p className="mt-2 text-gray-500">{post.content}</p>
            {/* Display comments */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Comments</h3>
              {comments.length > 0 ? comments.map((comment) => (
                <div key={comment.id} className="mt-2">
                  <p className="text-gray-600">{comment.comment}</p> {/* Adjusted from comment.text to comment.comment */}
                  <p>Posted by: {comment.user_name}</p> {/* Adjust to match API response */}
                </div>
              )) : <p>No comments yet.</p>}
            </div>
            {/* Show comment input field only if user is logged in */}
            {user && (
              <>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <form onSubmit={handleCommentSubmit} className="mt-4">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Write a comment..."
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Submit Comment
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
