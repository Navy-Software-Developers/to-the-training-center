// const url = 'https://jsonplaceholder.typicode.com/posts';

  const url = 'http://my.parkjeongseop.com:8000/api/accounts/v1/registration/';
const method = 'POST';
let data = [];

//username, password1, password2 ,
let option = {
    method: 'POST',
    mode:'cors',
    headers: { 
        "Content-Type": "application/json" 
    },
    body:JSON.stringify({
         username:'hellopark',
         password1:'googlechrome',
         password2:'googlechrome'
    })

}

let request = {
    get(url){
        return fetch(url);
    }
    ,
    post(url,option){
        return fetch(
            url,
            option
        )
        .then(response=>{
            return response.json();
        })
        .catch(err=>{
            return err;
        })
    }
}

request.post(url,option).then(data => console.log(data));

// fetch(url,option)
//     .then(response => {
//        console.log('success!!',response)  
//       // return response.json();
//     })   
//     .catch(err => {
//         console.error('error!!!',err)
//     })
//     // .then(data =>{
//     //     console.log(data)
//     // })

    



 



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