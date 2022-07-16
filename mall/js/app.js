import {Product} from './product.js';
import {ProductList} from './productlist.js';

class App {
  constructor(product_data) {
    this.product_data = product_data;
    this.main = document.querySelector(".main");
    this.showItem = document.querySelector(".show_item");

    this.count = 0;

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
        this.createPurchaseList(this.count);
        this.count++;
    });
    });
  }

  createPurchaseList(i) {
    this.showItem.innerHTML += this.purchaseData[i].update();
    
    this.purchaseData.forEach((e,index)=>{
        e.updateSelector();
    })
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
