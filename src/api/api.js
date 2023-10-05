const baseURL = "https://dummyjson.com";

export const get = async (endpoint) => {
  const response = await fetch(`${baseURL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch with status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const post = async (endpoint, payload) => {
  const response = await fetch(`${baseURL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to post with status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const getSinglePost = async (postId) => {
  return get(`/posts/${postId}`);
};


export const getUser = async (userId) => {
  return get(`/users/${userId}`);
};

const addPost = async (result) => {

  await fetch(`${baseURL}/posts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: `title`,
      userId: `${result.id}`,
      content: `${result.content}`,
    }),
  })
    .then((res) => res.json())
    .then(console.log);
};

const getAllUsers = async () => {
  let res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  const userArray = data.users.map((user) => user);
  return userArray;
};

const addComment = async (inputs) => {
  await fetch("https://dummyjson.com/comments/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body: inputs.comment,
      userId: inputs.id,
      postId: 1,
    }),
  })
    .then((res) => res.json())
    .then(console.log);
};

export { addPost, getAllUsers, addComment };
