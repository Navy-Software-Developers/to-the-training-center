let url_prefix = 'http://api.xn--o39a35bw4ff5gp5m354a.xn--3e0b707e:8000';
let login_url = url_prefix + '/api/accounts/login/';
let register_url = url_prefix + '/api/accounts/registration/';

const loginContent = document.querySelector(".content");


function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}


function login_activate() {
  document.querySelector("#login").style.display = '';
  document.querySelector("#register").style.display = 'none';
}

function register_activate() {
  document.querySelector("#login").style.display = 'none';
  document.querySelector("#register").style.display = '';
}


function login() {
  let id = document.querySelector("#id").value;
  let password = document.querySelector("#password").value;
  postData(login_url, { username: id, password: password }).then((data) => {
    console.log(data); // JSON 데이터가 `data.json()` 호출에 의해 파싱됨
    if (data.user) {
      setCookie('my-app-auth', data.access_token);
      setCookie('my-refresh-token', data.refresh_token);
      // History.back()
      location.href ='/';
    } else {
      alert("로그인에 실패하였습니다. 아이디, 패스워드를 다시 확인해주세요.");
    }
  });
}

function register() {
  let id = document.querySelector("#r_id").value;
  let password1 = document.querySelector("#r_password1").value;
  let password2 = document.querySelector("#r_password2").value;
  postData(register_url, { username: id, password1: password1, password2: password2}).then((data) => {
    console.log(data); // JSON 데이터가 `data.json()` 호출에 의해 파싱됨
    if(data.user){
      alert(id + " 회원가입성공");
      location.href = '/';
    }else{
      if(data.username){
        alert(data.username);
      }
      if(data.password1){
        alert(data.password1);
      }
      if(data.password2){
        alert(data.password2);
      }
      if(data.non_field_errors){
        alert(data.non_field_errors);
      }
    }
  });
}

// POST 메서드 구현 예제
async function postData(url = '', data = {}) {
  // 옵션 기본 값은 *로 강조
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE 등
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
  });
  return response.json(); // JSON 응답을 네이티브 JavaScript 객체로 파싱
}




login_activate();
window.onload = () => {
  // https://www.flaticon.com/kr/free-icons/login      icon license
  const submit_btn = document.querySelector(".submit");
  const imgSrc = {
    id: "./media/id.png",
    pw: "./media/password.png",
    checkpw: "./media/checkpw.png",
    error:"./media/error.png"
  };

  let login_image = document.querySelectorAll('.loginimg');



  let password = document.querySelector('.password');
  let joinpw1 = null;
  let joinpw2 = null;
 
  const join = document.querySelector('.register')
  
  let click = false;
  



  let regisetClick = ()=>{
    if (click == false) {
        register_activate();
        login_image = document.querySelectorAll('.loginimg');
        joinpw1 = document.querySelector('.pw1');
        joinpw2 = document.querySelector('.pw2');
        joinpw1.addEventListener('keyup',checkPw);
        joinpw2.addEventListener('keyup',checkPw);
        
        click = true;
      } else if (click == true) {
        signin();
        click = false;
      }
  }
 
  let checkPw = ()=>{
      const joinpw1_data = joinpw1.value;
      const joinpw2_data = joinpw2.value;
      
      if(joinpw1_data === joinpw2_data){
        joinpw2.style.border = `2px solid rgba(0,200,1,0.5)`;
        joinpw1.style.border = `2px solid rgba(0,200,1,0.5)`;
        login_image[2].src = './media/checkpw.png';
      }else if(
        joinpw1_data !== joinpw2_data){

            joinpw2.style.border = `2px solid rgba(200,1,1,0.5)`;
          
            login_image[2].src = './media/error.png';
        }
  }

  join.addEventListener("click", regisetClick);

};
