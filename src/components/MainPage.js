import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { get } from "../api/api";
import "../styles/MainPage.css";
import CreatePost from "./CreatePost";
import Users from "../components/Users";

function MainPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      console.log();
      const responseData = await get("/posts");
      setPosts(responseData.posts);
    }

    fetchPosts();
  }, []);

  const handleClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, reactions: post.reactions + 1 } : post
      )
    );
  };

  return (
    <div className="main-container">
      <aside className="reddit-sidebar">
        <h3>Subreddits</h3>
        { }
        <Link to="/r/programming">Programming </Link>
        <Link to="/r/science"> Science</Link>
        { }
      </aside>
      <main className="reddit-main-content">
        {posts.map((post) => (
          <div key={post.id} className="post-preview">
            <h3>
              <div
                onClick={() =>
                  navigate(`/post/${post.id}`, { state: { post: post } })
                }
                className="post-title post-hover"
              >
                {post.title}
              </div>
            </h3>
            <p className="post-body">
              {post.body.substring(0, 60)}
              {post.body.length > 60 && "..."}
            </p>
            <div>
              <strong>Tags: </strong>
              {post.tags.join(", ")}
            </div>
            <div>
              <Users userId={post.userId} />
            </div>
            <div>
              <strong>Reactions: {post.reactions}</strong>
              <br />
              <button onClick={() => handleClick(post.id)}>
                React with post
              </button>
            </div>
          </div>
        ))}
        <CreatePost setPosts={setPosts} posts={posts} />
      </main>
    </div>
  );
}

export default MainPage;
