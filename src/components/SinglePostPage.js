import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSinglePost } from '../api/api';

function SinglePostPage() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPost() {
      try {
        const postData = await getSinglePost(id);
        setPost(postData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
    fetchPost();
  }, [id]); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div>
        <strong>Tags: </strong>{post.tags.join(', ')}
      </div>
      <div>
        <strong>Author: </strong>{post.userId}
        {}
      </div>
      {}
    </div>
  );
}

export default SinglePostPage;
