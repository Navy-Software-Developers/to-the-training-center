export class Product {
    constructor(product, index) {
      this.image = product.image;
      this.name = product.name;
      this.star = product.star;
      this.price = product.price;
      this.index = index;
      this.evaluation = null;
      this.buy = null;
      this.basket = null;
  
    }
  
    update() {
      let html = `
          <li class="item">
          <div class="img_wrap">
              <img class="product_img" src="${this.image}">
          </div>
          <div class="product_info">
              <p class="product_name">
                  ${this.name}
              </p>
              <div class="evaluation">
           
            </div>
              <div class="product_buy">
                  <p class="price">
                      ${this.price.toLocaleString()} 원
                  </p>
                  <button class="buy">
                      Buy
                  </button>
                  <span class="basket">
                      <img src="./media/basket/basket.svg" alt="">
                  </span>
              </div>
          </div>
      </li>`;
  
      return html;
    }

    evaluationInsert(){
      console.log(this.star);
      for(let i =0; i < 5;i++){
        if(i > this.star){
          this.evaluation.innerHTML += 
        `
        <img src="./media/star/yesStar.svg" alt="">
        `
        }else{
          this.evaluation.innerHTML += `
          <img src="./media/star/noStar.svg" alt="">
          `
        }
      }
    }
  
    //생성되고 난 후 실행
    updateSelector() {
      this.buy = document.querySelectorAll(".buy")[this.index];
      this.basket = document.querySelectorAll(".basket > img")[this.index];
      this.evaluation = document.querySelectorAll('.evaluation')[this.index];
    }
  
    click(e) {
      let data = {
        img: this.image,
        name: this.name,
        price: this.price,
      };
  
      return data;
    }
  }
  
  