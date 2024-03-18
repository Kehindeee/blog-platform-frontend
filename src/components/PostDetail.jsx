// src/components/PostDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { fetchPostById, fetchComments, addComment } from '../api';
import Comments from './Comments';
import AddComment from './AddComment';

const PostDetail = () => {
  const { postId } = useParams(); // Retrieve postId from URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPost = await fetchPostById(postId);
      setPost(fetchedPost);
      const fetchedComments = await fetchComments(postId);
      setComments(fetchedComments);
    };

    fetchData();
  }, [postId]);

  const handleAddComment = async (commentData) => {
    await addComment(postId, { comment: commentData });
    // Reload comments
    const fetchedComments = await fetchComments(postId);
    setComments(fetchedComments);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">{post.title}</h1>
      <p>{post.content}</p>
      <div className="my-8">
        <h2 className="text-2xl font-bold">Comments</h2>
        <Comments comments={comments} />
        <AddComment onAddComment={handleAddComment} />
      </div>
    </div>
  );
};

export default PostDetail;
