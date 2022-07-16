class App {
  constructor(product_data) {
    this.product_data = product_data;
    this.main = document.querySelector(".main");
    this.showItem = document.querySelector(".show_item");

    //제품 목록
    this.itemArray = [];

    //구매 하려는 제품 목록
    this.purchaseData = [];
    this.priceStack = [];

    this.createItem();
    this.clickEvent();
  }

  render() {
    for (let i = 0; i < this.product_data.length; i++) {
      this.main.innerHTML += this.itemArray[i].update();
    }
    this.itemArray.forEach((e) => {
      e.updateSelector();
    });
  }

  createItem() {
    for (let i = 0; i < this.product_data.length; i++) {
      this.itemArray.push(new Product(this.product_data[i], i));
    }

    this.render();
  }

  clickEvent() {
    this.itemArray.forEach((element, index) => {
      element.buy.addEventListener("click", () => {
        this.purchaseData.push(new ProductList(element.click(), index));
        console.log(this.purchaseData);
    });
    });
  }

  createPurchaseList(i) {
    this.showItem.innerHTML += this.purchaseData[i].update();

  }
}

class Product {
  constructor(product, index) {
    this.image = product.image;
    this.name = product.name;
    this.star = product.star;
    this.price = product.price;
    this.index = index;
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
                <img src="./media/star/yesStar.svg" alt="">
                <img src="./media/star/yesStar.svg" alt="">
                <img src="./media/star/yesStar.svg" alt="">
                <img src="./media/star/yesStar.svg" alt="">
                <img src="./media/star/noStar.svg" alt="">
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

  //생성되고 난 후 실행
  updateSelector() {
    this.buy = document.querySelectorAll(".buy")[this.index];
    this.basket = document.querySelectorAll(".basket")[this.index];
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

class ProductList {
  constructor(product, index) {
    this.img = product.img;
    this.name = product.name;
    this.num = 1;
    this.count = null;
    this.up = null;
    this.down = null;
    this.index = index;
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
    this.num++;
    this.count.innerText = this.num;
  }

  downClick() {
    this.num--;

    if (this.num < 1) {
      this.num = 1;
      this.count.innerText = this.num;
    }
  }
}

window.onload = () => {
  let product_data = [
    {
      image: "./media/product.jfif",
      name: "MacBookPro",
      star: 4,
      price: 198888,
    },
    {
      image: "./media/product2.jfif",
      name: "ipad Pro",
      star: 5,
      price: 890000,
    },
    {
      image: "./media/product3.jfif",
      name: "Apple Watch",
      star: 2,
      price: 600000,
    },
  ];

  new App(product_data);
};
