import React, { useEffect, useState } from 'react';
import { fetchTags } from './api'; // Assume this function exists

const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchTags().then(setTags);
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <span key={tag.id} className="bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700">
          {tag.name}
        </span>
      ))}
    </div>
  );
};

export default Tags;
