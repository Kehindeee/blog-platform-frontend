import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      fetchPostById(postId);
    } else {
      console.error("Post ID is undefined");
    }
  }, [postId]);

  const fetchPostById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error(`Error fetching post with ID ${id}:`, error);
    }
  };

  if (!post) {
    return <div className="text-center text-xl mt-5">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-5">
      <article className="max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{post.title}</div>
            <p className="block mt-1 text-lg leading-tight font-medium text-black hover:none">{post.content}</p>
            <p className="mt-2 text-gray-500">{post.created_at}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
