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

const createUser = async (username, password, email) => {
  const payload = {
    username,
    password,
    email
  };
  
  return post ('/users', payload);

  
}

const getUser = async (userId) => {
  return get('/users/${userId}');
}

export { get, post, getSinglePost, createUser, getUser };
