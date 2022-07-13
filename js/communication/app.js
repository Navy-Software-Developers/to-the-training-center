// const url = 'https://jsonplaceholder.typicode.com/posts';
function run(){
  const url = 'http://my.parkjeongseop.com:8000/api/accounts/v1/registration/';
const method = 'POST';
let data = [];

//username, password1, password2 ,
let option = {
    method: 'POST',
    headers: { 
        "Content-Type": "application/json" 
    },
    body:JSON.stringify({
         username:'hellopark',
         password1:'googlechrome',
         password2:'googlechrome'
    })

}

 

fetch(url,option)
    .then(response => {
       console.log('success!!',response)  
      // return response.json();
    })   
    .catch(err => {
        console.error('error!!!',err)
    })
    // .then(data =>{
    //     console.log(data)
    // })
}
    


 



// function fetchAuthorName(postId) {
//     return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
//       .then((response) => response.json())
//       .then((post) => post.userId)
//       .then((userId) => {
//         return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//           .then((response) => response.json())
//           .then((user) => user.name);
//       });
//   }
  
//   fetchAuthorName(1).then((name) => console.log("name:", name));