fetch('https://dummyjson.com/users')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch with status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
