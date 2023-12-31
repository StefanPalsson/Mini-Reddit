import React, { useState, useEffect } from 'react';
import { getUser } from '../api/api';


const Users = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(userId)
      .then(user => {
        if (user) {
          setUser(user);
        } else {
          console.error(`User not found for userId: ${userId}`);
        }
        setLoading(false);
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
