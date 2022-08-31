export class ProductList {
    constructor(product, index) {
      this.img = product.img;
      this.name = product.name;
      this.num = 1;
      this.count = null;
      this.up = null;
      this.down = null;
      this.index = index;
      this.price = product.price;
    }
  
    update() {
      let html = `
          <li class="cart_item">
          <div class="buy_img">
              <img src="${this.img}" alt="">
          </div>
          <p class="product_title">
          ${this.name}
          </p>
          <div class="adpurchase">
  
              <button class="up">
                  +
              </button>
              <p class='count'>${this.num}</p>
              <button class="down">
                  -
              </button>
  
          </div>
      </li>
          `;
  
      return html;
    }
  
    updateSelector() {
      this.up = document.querySelectorAll(".up")[this.index];
      this.down = document.querySelectorAll(".down")[this.index];
      this.count = document.querySelectorAll(".count")[this.index];
    }
  
    upClick() {
        ++this.num;
        this.count.textContent=this.num;
      
    }
  
    downClick() {
      --this.num;
  
      if (this.num < 0) {
        this.num = 0;
        this.count.textContent=this.num;
      }

      this.count.textContent=this.num;
    }
  }