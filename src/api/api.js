const baseURL = 'https://dummyjson.com';

const get = async (endpoint) => {
  const response = await fetch(`${baseURL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch with status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
const post = async (endpoint, payload) => {
  const response = await fetch(`${baseURL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Failed to post with status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

const getSinglePost = async (postId) => {
  return get(`/posts/${postId}`);
};

// const createUser = async (username, password, email) => {
//   const payload = {
//     username,
//     password,
//     email
//   };
//   return post ('/users', payload);
// }


//Create post 
const addPost = async (result) => {

  const res = await fetch(`${baseURL}/posts/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: `title`,
      userId: `${result.id}`,
      content: `${result.content}`
    })
  })
  .then(res => res.json())
  .then(console.log)
  //Pass to global state?
  // .then((post) => {
  //     setPosts([...posts, post]);
  // });
}
// temporary function to get all users
const getAllUsers = async () => {
  let res = await fetch('https://dummyjson.com/users')
  const data = await res.json();
  const userArray = data.users.map((user) => user);
  return userArray;
}

export { get, post, getSinglePost, addPost, getAllUsers };
