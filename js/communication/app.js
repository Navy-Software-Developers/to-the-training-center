// const url = 'https://jsonplaceholder.typicode.com/posts';
// const method = 'get';
// let data = [];
// let option = {
//     method: 'POST',
//     headers: { 
//         "Content-Type": "application/json" 
//     },
//     body:JSON.stringify({
//         //보내고 싶은 데이터 넣으면 됨
//     })

// }


// fetch(url)
//     .then(response => {
//         return response.json();
//     }) 
//     .then(post=>{
//         console.log(post.userId)
//     })   
//     .catch(err => {
//         console.error(err)
//     })
//     // .then(data =>{
//     //     console.log(data)
//     // })
    



function fetchAuthorName(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((post) => post.userId)
      .then((userId) => {
        return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
          .then((response) => response.json())
          .then((user) => user.name);
      });
  }
  
  fetchAuthorName(1).then((name) => console.log("name:", name));