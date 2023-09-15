import React, { useState, useEffect } from 'react';

const Users = () => {
    const [userInfo, setUserInfo] = useState([]);
    
    useEffect (() => {
        const usersUrl = 'https://dummyjson.com/users';
        fetch(usersUrl)
        .then ((response) => {
            return response.json()
        })
        .then ((data) => {
            setUserInfo(data);
        })
    }, [])

    return (
        <div>
            <h2>userInfo</h2>
            <ul>
                {userInfo.map((user) => (
                    <li key ={user.id}>
                    <p>Name: {user.name}</p>
                    </li>))}
            </ul>
        </div>
    )
}

export default Users;
