export class Card {
  constructor(parent, subTitle, contents, imgSrc, position) {
    //어떤 부모밑에 만들어 낼지
    this.parent = parent;

    this.cardData = {
      subTitle: subTitle,
      contents: contents,
      imgSrc: imgSrc,
      position: position,
    };

    this.startPointX = 0;
    this.startPointY = 0;

    this.endPointX = 0;
    this.endPointY = 0;
  }

  create() {
    let card = `
    <div class='card box-shadow margin '>



        <div class="img-wrap">
            <img src="${this.cardData.imgSrc}"
                alt="">
        </div>



        <div class="card-title">
            <h3 class="sub-title">
                ${this.cardData.subTitle}
            </h3>
            <p class="contents">
                ${this.cardData.contents}
            </p>
        </div>





    </div>`;

    this.parent.innerHTML += card;
  }

  pointLine(ctx, el, load) {
    console.log(el, load);
    //start지점은 카드 중간
    this.startPointX = el.offsetWidth / 2 + el.offsetLeft;
    this.startPointY = el.offsetHeight / 2 + el.offsetTop;

    //막대기 중간
    this.endPointX = load.offsetWidth / 2 + load.offsetLeft;
    this.endPointY = this.startPointY;

    this.drawLine(ctx);
  }

  drawLine(ctx) {
    // ctx.strokeStyle = `rgba(255,0,0,0.5)`;
    ctx.strokeStyle = `#CDC9C3`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    //ctx.arc(this.startPointX, this.startPointY, 20, 0, Math.PI * 2, false);
    ctx.moveTo(this.startPointX, this.startPointY);
    ctx.lineTo(this.endPointX, this.endPointY);
    ctx.stroke();
    this.point(ctx, this.startPointX, this.startPointY);
    this.point(ctx, this.endPointX, this.endPointY);
  }

  point(ctx, x, y) {
    ctx.fillStyle = "#FBF7F0";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2, false);
    ctx.fill();
  }

  drawPointLine(ctx, cardElement, load) {
    //start지점은 카드 중간
    this.startPointX = cardElement.offsetWidth / 2 + cardElement.offsetLeft;
    this.startPointY = cardElement.offsetHeight / 2 + cardElement.offsetTop;

    //막대기 사이
    this.endPointX = load.offsetWidth / 2 + load.offsetLeft;
    this.endPointY = this.startPointY;

    this.drawLine(ctx);
  }
}
