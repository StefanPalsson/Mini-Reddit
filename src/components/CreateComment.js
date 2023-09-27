import React from 'react';
import { useState, useEffect } from 'react';
import { addComment, getAllUsers } from '../api/api';
import Users from './Users';

//På sidan skall också följande vara möjligt:

// Skriva ny kommentar på inlägget

// Ni skall anroppa API:et för att lägga till nya kommentarer (se endpoint)

// Tänk på att API:et inte faktiskt ändrar kommentar-databasen så ni måste hantera det lokalt

// Reagera (ökar bara reactions antalet)


function Comment() {

  const [inputs, setInputs] = useState({});
  const [user, setUser] = useState([]);
  const [btnClicked, setbtnClicked] = useState(false);

  const [comments, setComments] = useState([])

  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    getAllUsers()
      .then(
        (result) => {
          setIsMounted(true);
          setUser(result);
        }
      )
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }, [])

  //Beskrivning uppgift # Ni skall anroppa API:et för att lägga till nya kommentarer (se endpoint)

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //add comment to server
    addComment(inputs);

    const newComment = {
      title: inputs.id,
      body: inputs.comment,
      userId: inputs.id, 
      tags: [],
    };
    // update commentstate with new value
    setComments((initialval) => [...initialval, newComment]);
    // clear input
    setInputs({});
  }
  return (
    <div>
      <button
        onClick={() => {
          setbtnClicked(true);
        }}
      >
        Add Comment
      </button>
      {/* display form when user clicks "add comment button" */}
      {btnClicked && mounted ? (
        <>
          <form className='commentForm' onSubmit={handleSubmit}>
            <h3>Write something useful or nice</h3>
            <input
              type="text"
              name="comment"
              value={inputs.comment || ""}
              onChange={handleChange}
            />
            <label>
              User: <br />
              <select name="id" onChange={handleChange}>
                <option defaultValue hidden> {'-----------------'} </option>
                  {user.map((user) => <option key={user.id} value={user.id || ""}> {user.firstName}
                </option>)}
              </select>
            </label>
            <button type='submit'>Send</button>
          </form>
          {comments ? (
            comments.map((comment, idx) => 
              <div key={idx}>
                <div><strong>Comment: </strong>{comment.body}</div>
                <Users userId={comment.userId} />
              </div>
            )
          ): null}
        </>
      ) : null
      }
    </div>
  )
}

export default Comment;
