// https://jsonplaceholder.typicode.com/posts/1

// function fetchTest(data) {
//   return fetch(`https://jsonplaceholder.typicode.com/posts/${data}`)
//     .then((response) => response.json())
//     .then((post) => post.userId)
//     .then((userId) => {
//       return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//         .then((response) => response.json())
//         .then((user) => user.name);
//     });
// }

// fetchTest(1).then((name) => console.log(name));
async function fetchAuthorName(postId) {
  const postResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await postResponse.json();
  const userId = post.userId;
  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const user = await userResponse.json();
  return user.name;
}

fetchAuthorName(1).then((name) => console.log("name:", name));
