import React from 'react';
import { useState, useEffect } from 'react';


function CreateComment() {
    const [input, setInput] = useState('');

    const [posted, setPosted] = useState(true);
    const [comments, setComments] = useState([]);
    const [userId, setUserId] = useState(1);
    const [postId, setPostId] = useState(1);

    //get all comments and store data in comments-state
    useEffect(() => {
        fetch("https://dummyjson.com/comments")
            .then((res) => res.json())
            .then((res) => setComments(res.comments));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        addComment(input)
        setInput("")
    };

    //function to add comment and post it to server, input parameter with data from inputfield
    const addComment = async (input) => {
         await fetch("https://dummyjson.com/comments/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                body: input,
                userId: userId,
                postId: postId
            }),
        })
            .then((res) => res.json())
            .then((comment) => {
                setComments([...comments, comment]);
                setUserId(userId + 1);
                setPostId(postId + 1);
            });
    };
    console.log(comments)

    return (
        <>
            <form className='commentForm' onSubmit={handleSubmit} >
                <h3>Write something useful or nice</h3>
                <input
                    placeholder='Write a comment...'
                    type="text"
                    name="comments"
                    value={input} onChange={(event) => setInput(event.target.value)}
                />
                <button type='submit'>Send</button>
            </form >


            {posted && (
                comments.map(comment => <CommentList key={comment.postId} {...comment} />)
            )}
        </>
    )
}

export default CreateComment

const CommentList = ({ body, postId, userId }) => (
    <div >
        <ul>
            <li>User - {userId}</li>
            <li>Comment - {postId}</li>
            <li className="postedComment">{body}</li>
        </ul>
    </div>
);