import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSinglePost } from '../api/api';
import AddComment from '../components/AddComment'
import '../styles/App.css';
import Users from './Users';
import '../styles/MainPage.css'

function SinglePostPage() {
  const [post, setPost] = useState(null);
  // const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const postData = await getSinglePost(id);
        setPost(postData);

        // // Fetch user information using the userId from the post
        // const userData = await getUser(postData.userId);
        // setUser(userData);

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }

    fetchData();
    // fetchComments();
  }, [id]);

  const handleClick = () => {
    if (post) {
      const updatedPost = {
        ...post,
        reactions: post.reactions + 1,
      };
      setPost(updatedPost);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='singel-post'>  
    <div className='post'>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div>
        <strong>Tags: </strong>
        {post.tags.join(", ")}
      </div>
      <div>
        <strong>Reactions: {post.reactions}</strong><br/>
        <button onClick={handleClick}>React on button</button>
      </div>
      <div>
        <Users userId={post.userId} />
      </div>
      {/*  
      <div>
        {/* <CreateComment /> Component for adding comments */}
      {/* </div>
      <div>
        <h3>Comments:</h3>
        {comments.map(comment => (
          <Comment key={comment.id} body={comment.body} userId={comment.userId} />
        ))}
      </div> */} 
    </div>
  </div>  
  );
}

export default SinglePostPage;
