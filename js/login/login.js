const register = document.querySelector('.register');
const  login = document.querySelector('.login_right');

let registerScreen = ()=>{
    const html = `
    <form class="login_form" action="" method="get">
        <p class="login_right_title">Register</p>
        <input class="id" type="text" placeholder="id" />
        <input class="pw" type="password" placeholder="pw" />
        <input class="login_submit" type="submit" value="Register" />
      </form>
    `

    login.innerHTML = html;
}

let loginScreen =()=>{
    const html = `
    <form class="login_form" action="" method="get">
        <p class="login_right_title">Login</p>
        <input class="id" type="text" placeholder="id" />
        <input class="pw" type="password" placeholder="pw" />
        <input class="login_submit" type="submit" value="Login" />
      </form>
    `;

    login.innerHTML = html;
}

register.onclick = registerScreen;