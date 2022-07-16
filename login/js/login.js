const loginContent = document.querySelector(".content");

function register() {
  loginContent.innerHTML = `
        <h1 class="login_title">Register</h1>
             
        <div class="id_box">
            <img class="loginimg" src="./media/id.png" alt="">
            <input class="input" type="text" placeholder="Id" name="username">
        </div>

        <div class="pw_box">
            <img class="loginimg" src="./media/password.png" alt="">
        <input class="input pw1" type="password" placeholder="Password" name="password1">
        </div>

        <div class="pw_chekbox">
            <img class="loginimg" src="./media/id.png" alt="">
        <input class="input pw2" type="password" placeholder="Password" name="password2">
  
        </div>
        <button class="submit">
            가입하기
        </button>

        `;

  return;
}

function signin() {
  loginContent.innerHTML = `
    <h1 class="login_title">LOGIN</h1>
         
    <div class="id_box">
        <img class="loginimg" src="./media/id.png" alt="">
        <input class="input" type="text" placeholder="Id" name="" >
    </div>
    <div class="pw_box">
        <img class="loginimg" src="./media/password.png" alt="">
    <input class="input password" type="text" placeholder="Password" name="">
    </div>
    <button class="submit">
        login
    </button>

    <div class="register">
        가입하기
    </div> 
    `;
}

signin();
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
        register();
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
