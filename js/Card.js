export class Card {
  constructor(parent,subTitle, contents, imgSrc) {
    //어떤 부모밑에 만들어 낼지
    this.parent = parent;
    
    this.cardData = {
      subTitle: subTitle,
      contents: contents,
      imgSrc: imgSrc,
    };
  
  
  
  this.startPointX = 0;
  this.startPointY = 0;
  
  }
  
  create(ctx) {
  
  
    let card = `
        <div class="card margin box-shadow margin">



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
  
  getData(ctx){
    let el = document.querySelectorAll('.card');
    this.startPointX = el.offsetWidth + el.offsetLeft;
    this.startPointY = el.offsetHeight + el.offsetTop;
   
    // ctx.fillStyle = 'red';
    // ctx.beginPath();
    // ctx.arc(this.startPointX,this.startPointY,20,0,Math.PI*2,false);
    // ctx.fill();

    return el;

  }
  
  


}
