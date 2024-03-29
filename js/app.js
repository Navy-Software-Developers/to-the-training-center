import { Card } from "./Card.js";
  
let data = [
  {
    src: "./media/bodycheck.svg",
    contents: "가산점 등록",
    subTitle: "STEP 1. 가산점",
    position: "left",
    link: "./job/license.html",
  },
  {
    src: "./media/post.svg",
    contents: "하고싶은 보직을 신청해봅시다 !!",
    subTitle: "STEP 3. 즐겨찾기",
    position: "left",
    link: "./job/favor.html",
  },
  {
    src: "./media/go.svg",
    contents: "자유 게시판에서 소통!",
    subTitle: "STEP 5. 자유 게시판",
    position: "left",
    link: "./board/index.html",
  },
  {
    src: "./media/job.svg",
    contents: "미리 하고싶은 보직 찾아보기 !!",
    subTitle: "STEP 2. 보직탐색",
    position: "right",
    link: "./job/joblist.html",
  },
  {
    src: "./media/checkList.svg",
    contents: "입대할 때 어떤걸 들고가야 할까 ??",
    subTitle: "STEP 4. 준비사항",
    position: "right",
    link: "./checkList/index.html",
  },
];

class App {
  constructor() {
    this.main = document.getElementById("main");
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.cardElement = undefined;
    this.load = document.querySelector(".load");
    this.itemBar = document.querySelectorAll(".item_bar");

    //데이터 개수 만큼 엘리먼트를 생성해서 card 변수에 담음

    this.card = new Array();

    for (let i = 0; i < data.length; i++) {
      if (data[i].position == "left") {
        this.card.push(new Card(this.itemBar[0], data[i], i));
      } else if (data[i].position == "right") {
        this.card.push(new Card(this.itemBar[1], data[i], i));
      }
    }

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
   

    //resize 이벤트
    window.addEventListener("resize", this.resize.bind(this));

    //애니메이션
    window.requestAnimationFrame(this.animate.bind(this));

    //엘리먼트 및 선을 그어줌
    this.update();

    this.resize();
    
  }

  update() {
    //card변수에 담은 객체를 생성해줌
    for (let i = 0; i < this.card.length; i++) {
      this.card[i].create();
    }

    //모두 생성된 후 모든 카드객체를 cardElement 변수에 담음
    this.cardElement = document.querySelectorAll(".card");

    this.card.forEach((e, cardIndex) => {
      e.updateSelector(cardIndex);
    });

    this.card.forEach((e) => {
      e.card.addEventListener("click", () => {
        e.goLink();
      });
    });

    // console.log(this.cardElement);
  }

  resize() {
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;

    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    // console.log(this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.card.length; i++) {
      this.card[i].drawPointLine(this.ctx, this.cardElement[i], this.load);
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    //포인트 선 만들기
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    for (let j = 0; j < this.card.length; j++) {
      this.card[j].drawPointLine(this.ctx, this.cardElement[j], this.load);
    }
  }
}

window.onload = () => {
  new App();

  function setCookie(name, value, options = {}) {
    options = {
      path: "/",
      // 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
      ...options,
    };
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }

  function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  let url_prefix = "http://api.xn--o39a35bw4ff5gp5m354a.xn--3e0b707e:8000";
  let verify_url = url_prefix + "/api/accounts/token/verify/";

  // POST 메서드 구현 예제
  async function postData(url = "", data = {}) {
    // 옵션 기본 값은 *로 강조
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE 등
      // mode: 'cors', // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("my-app-auth"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    });
    return response.json(); // JSON 응답을 네이티브 JavaScript 객체로 파싱
  }

  // 로그인 여부 확인
  let login_btn = document.querySelector("#login_btn");
  async function checklogin() {
    const response = await fetch(verify_url, {
      method: "POST",
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("my-app-auth"),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ token: getCookie("my-app-auth") }), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    });
    if (!response.ok) {
      login_btn.innerHTML = "로그인";
      login_btn.href = "./login";
    } else {
      login_btn.textContent = "로그아웃";
      login_btn.removeAttribute("href");
      login_btn.onclick = (e) => {
        logout(e);
        // alert("hello");
      };
    }
  }

  checklogin();

  function logout(e) {
    if (login_btn.innerText === "로그아웃") {
      e.preventDefault();
      console.log(getCookie("my-app-auth"));
      setCookie("my-app-auth", "");
      console.log(getCookie("my-app-auth"));
      login_btn.innerHTML = "로그인";
      login_btn.href = "./login";
    }
  }

  // login_btn.onclick = ()=>{
  //   alert('hel');
  // }

  window.addEventListener("resize", () => {
    resize();
  });

  let item_bar = document.querySelectorAll(".item_bar");
  let card = document.querySelectorAll(".card");

  let card_list = [card[0], card[3], card[1], card[4], card[2]];

  function resize() {
    if (window.innerWidth < 600) {
      for (let i = 0; i < card.length; i++) {
        item_bar[0].appendChild(card_list[i]);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        item_bar[0].appendChild(card[i]);
      }
      for (let i = 3; i < 5; i++) {
        item_bar[1].appendChild(card[i]);
      }
    }
  }
};
