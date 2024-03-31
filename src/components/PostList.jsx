import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts, loading }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="space-y-8">
      {posts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow-lg p-5 hover:shadow-2xl transition duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold">
            <Link to={`/posts/${post.id}`}>{post.title}</Link> {/* Enable navigation to PostDetail */}
          </h2>
          <p className="text-gray-700">{post.content}</p>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">{formatDate(post.created_at)}</p>
            {/* Link to the post detail with a comment count (assuming 'commentCount' is a property of the post object) */}
            <Link to={`/posts/${post.id}`} className="text-gray-600 hover:underline">
              {post.commentCount ? `${post.commentCount} Comments` : 'No comments yet'}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
