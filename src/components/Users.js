import { useState,useEffect } from "react";

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
        <span>
          {userInfo.name} ({userInfo.email})
        </span>
      );
    }
  
    return <span>User not found</span>; // Handle the case where user data is not available
  };

  //     <div>
  //       <h2>Users Info</h2>
  //       <ul>
  //         {userInfo.map((user) => (
  //           <li key={user.id}>
  //             <p>Name: {user.name}</p>
  //             <p>Email: {user.email}</p>
  //             {/* Add more user information as needed */}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // };
  
  export default Users;
  