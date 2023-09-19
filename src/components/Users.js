import { useState, useEffect } from "react";

import React from "react";

const Users = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user with status: ${response.status}`);
        }
        const userData = await response.json();
        console.log('Fetched user data:', userData);
        setUserInfo(userData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);



  if (loading) {
    return <span>Loading user...</span>;
  }

  if (userInfo) {
    return (
      <span> &nbsp;
        {userInfo.firstName} &nbsp;
        {userInfo.lastName} &nbsp;
       
      </span>
    );
  }

  return <span>User not found</span>; // om user data inte finns
};

export default Users;
