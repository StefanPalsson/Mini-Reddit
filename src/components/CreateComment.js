import React from 'react';
import { useState } from 'react';
import { addComment } from '../api/api';

function CreateComment({ setComments }) {

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //add comment to server
    addComment(inputs);

    //store input in object
    const newComment = {
      title: inputs.id,
      body: inputs.comment,
      userId: 1,
      user: { username: inputs.username }
    };

    // update comment state with new value
    setComments((initialval) => [...initialval, newComment]);
    // clear input
    setInputs({});
  }
  return (
    <div>
      <>
        <form className='commentForm' onSubmit={handleSubmit}>
          <h3>Write something useful or nice</h3>
          <label>Comment: <br></br>
            <input
              type="text"
              name="comment"
              value={inputs.comment || ""}
              onChange={handleChange}
            />
          </label><br></br>
          <label>
            User: <br></br>
            <input
              type="text"
              name="username"
              value={inputs.username || ""}
              onChange={handleChange}
            />
          </label>
          <button type='submit'>Send</button>
        </form>
      </>
    </div>
  )
}

export default CreateComment;


