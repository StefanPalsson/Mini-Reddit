const baseURL = 'https://dummyjson.com';

export const get = async (endpoint) => {
  const response = await fetch(`${baseURL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch with status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const post = async (endpoint, payload) => {
  // ... Innehåll förblir detsamma
};

export const getSinglePost = async (postId) => {
  return get(`/posts/${postId}`);
};

export const createUser = async (username, password, email) => {
  // ... Innehåll förblir detsamma
}

export const getUser = async (userId) => {
  return get(`/users/${userId}`);
}
