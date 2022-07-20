// <<<<<<< HEAD
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
// // }

// // fetchTest(1).then((name) => console.log(name));
// async function fetchAuthorName(postId) {
//   const postResponse = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${postId}`
//   );
//   const post = await postResponse.json();
//   const userId = post.userId;
//   const userResponse = await fetch(
//     `https://jsonplaceholder.typicode.com/users/${userId}`
//   );
//   const user = await userResponse.json();
//   return user.name;
// }

// fetchAuthorName(1).then((name) => console.log("name:", name));
// =======
// import {Mili} from './Mili.js';

const Mili = [
  {
    name: "육군",
    img: "./media/army.jfif",
  },
  {
    name: "해군",
    img: "./media/navy.jfif",
  },
  {
    name: "공군",
    img: "./meida/airforce.jpg",
  },
  {
    name: "해병대",
    img: "./media/navy2.png",
  },
];

// class App {
//   constructor() {
//     window.addEventListener("click", () => {
//       let xhr = new XMLHttpRequest();
//       xhr.open();
//     });
//   }
// }

// window.onload = () => {
//   new App();
// };
// // >>>>>>> f7d446e0ffc7fd17cd01563a72326d9156c301fe
