const register = document.querySelector('.register');
const  login = document.querySelector('.login_right');

let registerScreen = ()=>{
    const html = `
 
      <form class="login_form"
      action="http://my.parkjeongseop.com:8000/api/accounts/v1/registration/"
      method="post">
      <p class="login_right_title">Login</p>
      <input name="username" class="id" type="text" placeholder="id" />
      <input name="password1" class="pw" type="password" placeholder="pw" />
      <input name="password2" class="pw" type="password" placeholder="pw" />
      <input class="login_submit" type="submit" value="Login" />
    </form>
    `

    login.innerHTML = html;
}

let loginScreen =()=>{
    const html = `
    <form class="login_form" action="http://my.parkjeongseop.com:8000/api/accounts/v1/registration/" method="post">
        <p class="login_right_title">Register</p>
        <input class="id" type="text" placeholder="id" />
        <input class="pw" type="password" placeholder="pw" />
        <input class="login_submit" type="submit" value="Register" />
      </form>
    `;

    login.innerHTML = html;
}


register.onclick = registerScreen;

let xhr = XMLHttpRequest();
const url = 'http://my.parkjeongseop.com:8000/api/accounts/v1/registration/';

 

