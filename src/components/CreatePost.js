import React, { useState, useEffect } from "react";
import { getAllUsers } from "../api/api";
import "../styles/createpost.css";
import "../styles/MainPage.css";



function CreatePost({ setPosts, posts }) {
  const [user, setUser] = useState([]);
  const [inputs, setInputs] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    // new post
    const newPost = {
      //own posts have id 1000+ so we know we have to fetch it from the state instead of the api
      id: posts[posts.length - 1].id + 1000,
      reactions: 0,
      title: inputs.title,
      body: inputs.content,
      userId: parseInt(inputs.id), 
      tags: [], 
    };

  
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setInputs({});
  };


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  useEffect(() => {
    getAllUsers().then(setUser);
  }, []);

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create Post</h2>
        <label>
          Title:
          <br />
          <input
            type="text"
            name="title"
            required
            value={inputs.title || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Content:
          <br />
          <textarea
            type="text"
            name="content"
            rows="4"
            cols="50"
            required
            value={inputs.content || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          User: <br />
          <select name="id" onChange={handleChange}>
            <option defaultValue hidden>
              {" "}
              {"-----------------"}{" "}
            </option>
            {user.map((user) => (
              <option key={user.id} value={user.id || ""}>
                {" "}
                {user.firstName}
              </option>
            ))}
          </select>
        </label>
        <div className="submitBtn">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
