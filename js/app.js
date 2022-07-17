import { Card } from "./Card.js";

let data = [
  {
    src: "./media/bodycheck.svg",
    contents: "신체검사를 받으러 가봅시다 !!",
    subTitle: "STEP 1",
    position: "left",
    link: "#",
  },
  {
    src: "./media/post.svg",
    contents: "하고싶은 직별을 신청해봅시다 !!",
    subTitle: "STEP 3",
    position: "left",
    link: "./job/job.html",
  },
  {
    src: "./media/go.svg",
    contents: "입대 가즈아 !!",
    subTitle: "STEP 5",
    position: "left",
    link: "./job/favor.html",
  },
  {
    src: "./media/job.svg",
    contents: "미리 하고싶은 업무 찾아보기 !!",
    subTitle: "STEP 2",
    position: "right",
    link: "#",
  },
  {
    src: "./media/checkList.svg",
    contents: "입대할 때 어떤걸 들고가야 할까 ??",
    subTitle: "STEP 4",
    position: "right",
    link: "./mall/index.html",
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
    // this.ctx.scale(this.pixelRatio, this.pixelRatio);

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
};
