import { Card } from "./Card.js";

// let data = [

//     {
//         'src':`https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA1MTJfMTkg%2FMDAxNjUyMzMyNzEyMjUy.sajr9AW0UUDfYdLVMDYhCJIQSJ-dgDYWcagkJnNqy8kg.7wDD5pp7SJ1wPZlvqNHVHZZX6m0DJ6VZ1hvdf7dlXTMg.PNG.wlsry3085%2F%25C1%25A6%25B8%25F1%25C0%25BB-%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4_-001_%25283%2529.png&type=sc960_832`,
//         'contents':`Google Tistory`,
//         'subTitle':'google hello',
//         'position':`right`
//     },
//     {
//         'src':`https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA1MTJfMTkg%2FMDAxNjUyMzMyNzEyMjUy.sajr9AW0UUDfYdLVMDYhCJIQSJ-dgDYWcagkJnNqy8kg.7wDD5pp7SJ1wPZlvqNHVHZZX6m0DJ6VZ1hvdf7dlXTMg.PNG.wlsry3085%2F%25C1%25A6%25B8%25F1%25C0%25BB-%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4_-001_%25283%2529.png&type=sc960_832`,
//         'contents':`Google Tistory`,
//         'subTitle':'google hello',
//         'position':`right`
//     },
//     {
//         'src':'https://lh3.googleusercontent.com/p76gesBbjuqG9aEuAGVyLqRaruEDkYWSknlPgpXGzyO_jdaFloqZ2g53irnxJMD0eNOqbDFTTghaHtN11G_9zFtReyeYFHiVfv-8EofF=w420',
//         'contents':'출발',
//         'subTitle':'출발 해봅시다',
//         'position':'lefft'
//     },

//     {
//         'src':'https://lh3.googleusercontent.com/p76gesBbjuqG9aEuAGVyLqRaruEDkYWSknlPgpXGzyO_jdaFloqZ2g53irnxJMD0eNOqbDFTTghaHtN11G_9zFtReyeYFHiVfv-8EofF=w420',
//         'contents':'출발',
//         'subTitle':'출발 해봅시다',
//         'position':'right'
//     }

// ];

let data = [
  {
    src: "https://lh3.googleusercontent.com/p76gesBbjuqG9aEuAGVyLqRaruEDkYWSknlPgpXGzyO_jdaFloqZ2g53irnxJMD0eNOqbDFTTghaHtN11G_9zFtReyeYFHiVfv-8EofF=w420",
    contents: "출발",
    subTitle: "출발 해봅시다",
    position: "left",
  },
  {
    src: "https://lh3.googleusercontent.com/p76gesBbjuqG9aEuAGVyLqRaruEDkYWSknlPgpXGzyO_jdaFloqZ2g53irnxJMD0eNOqbDFTTghaHtN11G_9zFtReyeYFHiVfv-8EofF=w420",
    contents: "출발",
    subTitle: "출발 해봅시다",
    position: "left",
  },
  {
    src: "https://lh3.googleusercontent.com/p76gesBbjuqG9aEuAGVyLqRaruEDkYWSknlPgpXGzyO_jdaFloqZ2g53irnxJMD0eNOqbDFTTghaHtN11G_9zFtReyeYFHiVfv-8EofF=w420",
    contents: "출발",
    subTitle: "출발 해봅시다",
    position: "right",
  },
  {
    src: "https://assets.centralparknyc.org/media/images/_1200x630_crop_center-center_82_none/Sheep-Meadow-Aerial-Central-Park-credit-the-Central-Park-Conservancy.jpg?mtime=1597065139",
    contents: "출발",
    subTitle: "출발 해봅시다",
    position: "right",
  },
  {
    src: "https://lh3.googleusercontent.com/p76gesBbjuqG9aEuAGVyLqRaruEDkYWSknlPgpXGzyO_jdaFloqZ2g53irnxJMD0eNOqbDFTTghaHtN11G_9zFtReyeYFHiVfv-8EofF=w420",
    contents: "출발",
    subTitle: "출발 해봅시다",
    position: "right",
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
        this.card.push(
          new Card(
            this.itemBar[0],
            data[i].subTitle,
            data[i].contents,
            data[i].src,
            data[i].position
          )
        );
      } else if (data[i].position == "right") {
        this.card.push(
          new Card(
            this.itemBar[1],
            data[i].subTitle,
            data[i].contents,
            data[i].src,
            data[i].position
          )
        );
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
    //console.log(this.cardElement);
  }

  resize() {
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;

    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
   // this.ctx.scale(this.pixelRatio, this.pixelRatio);

    console.log(this.stageWidth,this.stageHeight);

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
