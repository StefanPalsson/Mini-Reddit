import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../api/api';
import { addPost } from '../api/api';
import '../styles/createpost.css';
import '../styles/MainPage.css';

/* ASSIGNMENT:
# Huvudsidan ska också innehålla följande funktionalitet:
# Skapa nytt inlägg
# Denna funktionalitet implementeras genom att välja vilken användare som ska skapa inlägget. 
# Detta är inte realistiskt och inte hur reddit fungerar eftersom man vanligtvis är inloggad på en användare, men det är så uppgiften är. Vid skapandet av inlägget ska man alltså få välja vilken användare (utav de som API:et innehåller) som skapar inlägget.
# Ni skall anroppa API:et för att skapa nya inlägg (se endpoint)
# Tänk på att API:et inte faktiskt ändrar inlägg-databasen så ni måste hantera det lokalt

TODO change props passed to this function
*/
function CreatePost() {
    const [user, setUser] = useState([]);
    const [inputs, setInputs] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        addPost(inputs)
        //clear inputfields 
        setInputs({})
    };
    const handleChange = (event) => {
        console.log(event.target.value);
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value } ));
    };
    useEffect(() => {
        getAllUsers().then(setUser);
    }, []);

    return (
        <div className='form-container'>
            <form className="form" onSubmit={handleSubmit}>
                <h2>Create Post</h2>
                <label>
            Title:
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
            <textarea
                type="text"
                name="content"
                rows="4" cols="50"
                required
                value={inputs.content || ""}
                onChange={handleChange}
            />
            </label>
            <label>
            User: <br/>            
            <select name="id" onChange={handleChange}>
                <option defaultValue hidden> {'-----------------'} </option>
                {user.map((user) =>
                    <option key={user.id} value={user.id || ""}> { user.firstName }</option>)}
            </select>
            </label>                    
            <div className='submitBtn'>
                <input type="submit" />
            </div>
        </form>
    </div>
    );
}

export default CreatePost;
