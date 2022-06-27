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
  
  create() {
  
  
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
  
  getData(){
    let el = document.querySelector('.card');
    this.startPointX = el.offsetWidth + el.offsetLeft;
    this.startPointY = el.offsetHeight + el.offsetTop;
    console.log(this.startPointX,this.startPointY);
  }
  
  


}
