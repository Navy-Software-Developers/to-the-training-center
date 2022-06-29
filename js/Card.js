export class Card {
  constructor(parent, subTitle, contents, imgSrc,position) {
    //어떤 부모밑에 만들어 낼지
    this.parent = parent;

    this.cardData = {
      subTitle: subTitle,
      contents: contents,
      imgSrc: imgSrc,
      position:position
    };



    this.startPointX = 0;
    this.startPointY = 0;

    this.endPointX = 0;
    this.endPointY = 0;

   // this.moveX = 0;
  }

create(){
  let card =`
  <div class='card box-shadow margin'>
  <img class="image" src="${this.cardData.imgSrc}" alt="">
  <div class="text_box">
     
      <span class="subtitle">
      ${this.cardData.subTitle}
      </span>
      <p class="contents">
      ${this.cardData.contents}
      </p>
      <svg width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M20 0L16.5631 3.43688L30.1644 17.0625H0.5V21.9375H30.1644L16.5631 35.5631L20 39L39.5 19.5L20 0Z"
              fill="rgb(26, 115, 232)"></path>
      </svg>
  </div>


</div>
  `

  this.parent.innerHTML += card;
}
  drawPointLine(ctx,cardElement,load) {
     
     //start지점은 카드 중간
    this.startPointX = (cardElement.offsetWidth/2) + cardElement.offsetLeft;
    this.startPointY = (cardElement.offsetHeight/2) + cardElement.offsetTop;
    
    //막대기 사이
    this.endPointX = (load.offsetWidth/2) + load.offsetLeft ;
    this.endPointY = this.startPointY; 
  
 
     
  
   this.drawLine(ctx);
    
  }

  drawLine(ctx) {
    
    

    // if(this.moveX + this.startPointX> this.endPointX){
    //   this.moveX = this.endPointX;
    // }

    // ctx.strokeStyle = `rgba(255,0,0,0.5)`;
    ctx.strokeStyle = `#CDC9C3`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    //ctx.arc(this.startPointX, this.startPointY, 20, 0, Math.PI * 2, false);
    ctx.moveTo(this.startPointX,this.startPointY);
    ctx.lineTo(this.endPointX,this.endPointY);
    ctx.stroke();

    this.point(ctx,this.startPointX,this.startPointY);
    this.point(ctx,this.endPointX,this.endPointY);

  //  this.moveX++;
     
  }

  point(ctx,x,y){
 
    ctx.fillStyle = '#FBF7F0';
    ctx.beginPath();
    ctx.arc(x,y,5,0,Math.PI*2,false);
    ctx.fill();
  }




}
