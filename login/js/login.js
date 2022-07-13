// https://www.flaticon.com/kr/free-icons/login      icon license
const submit_btn = document.querySelector('.submit');
const imgSrc = {
    id: './media/id.png',
    pw: './media/password.png',
    checkpw: './media/checkpw.png'
};

const loginContent = document.querySelector('.content');


function register() {
    loginContent.innerHTML =
        `
        <h1 class="login_title">Register</h1>
             
        <div class="id_box">
            <img class="loginimg" src="./media/id.png" alt="">
            <input class="input" type="text" placeholder="Id" name="username">
        </div>

        <div class="pw_box">
            <img class="loginimg" src="./media/password.png" alt="">
        <input class="input" type="password" placeholder="Password" name="password1">
        </div>

        <div class="pw_chekbox">
            <img class="loginimg" src="./media/checkpw.png" alt="">
        <input class="input" type="password" placeholder="Password" name="password2">
        </div>
        <button class="submit">
            가입하기
        </button>

        `

        return ;
}

function signin() {
    loginContent.innerHTML =
    `
    <h1 class="login_title">LOGIN</h1>
         
    <div class="id_box">
        <img class="loginimg" src="./media/id.png" alt="">
        <input class="input" type="text" placeholder="Id" name="" >
    </div>
    <div class="pw_box">
        <img class="loginimg" src="./media/password.png" alt="">
    <input class="input" type="text" placeholder="Password" name="">
    </div>
    <button class="submit">
        login
    </button>

    <div class="register">
        가입하기
    </div> 
    `
}
 
let click = false;

window.addEventListener('click',()=>{
    if(click == false){
        register();
        click = true;
    }else if(click == true){
        signin()
        click = false;
    }
})