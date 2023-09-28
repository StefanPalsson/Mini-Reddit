import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSinglePost } from '../api/api';
import CreateComment from '../components/CreateComment'
import '../styles/App.css';
import Users from './Users';
import '../styles/MainPage.css'

function SinglePostPage() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [comments, setComments] = useState([])
  //state to handle if "add comment is clicked"
  const [btnClicked, setbtnClicked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const postData = await getSinglePost(id);
        setPost(postData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  //fetch comments from api
  useEffect(() => {
      fetch("https://dummyjson.com/comments")
        .then((res) => res.json())
        //store data from fetch in comments-state
        .then((res) => setComments(res.comments));
  }, []);

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
        <strong>Reactions: {post.reactions}</strong>
        <button onClick={handleClick}>React on button</button>
      </div>
        <Users userId={post.userId} />
      <div>
        {/* //display comments from api  */}
        {comments.map((comment, idx) =>
          <div key={idx}>
            <div><strong>Comment: </strong>{comment.body}</div>
            <div><strong>Username:</strong> {comment.user.username}</div>
          </div>)} 
        {/* add comment button */}
        <button
          onClick={() => {
            setbtnClicked(true);
          }}
        >
        Add Comment
          </button>
        {/* //if comment button is clicked display create comment component */}
        {btnClicked ? (
            <CreateComment setComments={setComments} />
          ) : null }
        </div>
      </div>
  </div>  
  );
}

export default SinglePostPage;
