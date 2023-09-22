import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../api/api';


const Users = ({ userId }) => { // hämtar userdId som prop
  const [user, setUser] = useState(null); //initiliserar till nulll
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers() // Fetchar all users
      .then(userArray => {
        const matchingUser = userArray.find(user => user.id === userId); // sparar user id i variabeln matching user....  Find user by userId from the user array
        if (matchingUser) {
          setUser(matchingUser); // sätter matching user eller kastar error
        } else {
          throw new Error(`User not found for userId: ${userId}`);
        }
        setLoading(false); // laddar ej users
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [userId]); 

  if (loading) {
    return <span>Loading users...</span>;
  }

  if (user) {
    return (
      <div>
        <span> 
          <strong>Författare: {user.firstName} {user.lastName}
          </strong>
          </span> 
        
      </div>
    );
  }

  return <span>User not found</span>;
};

export default Users;
