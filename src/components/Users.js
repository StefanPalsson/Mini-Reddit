import React, { useState, useEffect } from 'react';
import { createUser, getUser } from '../api/api';
import SinglePostPage from './SinglePostPage';

// function Users() {
    
//     // const [username, setUsername] = useState('')
//     // const [password, setPassword]
//     // }
//     const [users, setUsers] = useState([]);

//     const getUsersRequest= async () => {
//         const url = 'https://dummyjson.com/users';
    
//         const response = await fetch(url);
//         const responseJson = await response.json();
    
//         console.log(response);
    
//     }

const Users = () => {

    const [userInfo, setUserInfo] = useState([]);
    
 
        
    useEffect (() => {
        const usersUrl = 'https://dummyjson.com/users';
        fetch(usersUrl)
        .then ((response) => {
            return response.json()
    
        .then ((data) => {
            setUserInfo(data);
        })
    })

    
    
}, [])

    return (
        <div>
            <h2>Usersinfo</h2>
            <ul>
                {userInfo.map((user) => (
                    <li key ={user.id}>
                    <p>Name: {user.name}</p>
                    </li>
    ))}
            </ul>
        </div>
    );
    
}

export default Users;