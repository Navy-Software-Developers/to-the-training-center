import { Product } from "./product.js";
import { ProductList } from "./productlist.js";

class App {
  constructor(product_data) {
    this.product_data = product_data;
    this.main = document.querySelector(".main");
    this.showItem = document.querySelector(".show_item");

    this.totalPrice = document.querySelector(".now_price");
    this.priceCalc = 0;
    this.purchase = document.querySelector(".purchase");
    
    this.count = 0;

    //제품 목록
    this.itemArray = [];
    this.itemRepeatCheck = [];
    //구매 하려는 제품 목록
    this.purchaseData = [];
    this.priceStack = [];

    this.createItem();
    this.clickEvent();
    
    this.purchase.addEventListener('click',this.purchaseAlert.bind(this));
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

  // 구매창 쪽 기능
  clickEvent() {
    // itemRepeatCheck
    this.itemArray.forEach((element, index) => {
      element.buy.addEventListener("click", () => {
        if (this.itemRepeatCheck.indexOf(index) === -1) {
          this.itemRepeatCheck.push(element.index);
          this.purchaseData.push(new ProductList(element.click(), this.count));
          this.createPurchaseList(element.index, this.count);
          this.count++;

          this.calcTotalMoney(index,false);
          return;
        }
        
        this.calcTotalMoney(index,true);
         
        });
    });
  }

  calcTotalMoney(index,increase){
    //increase 변수는 함수가 시작 됐을때 값을 증가시킬 지 여부

    const purchasIndex = this.itemRepeatCheck.indexOf(index);
    if(increase === true) this.purchaseData[purchasIndex].upClick();
    this.priceCalc += this.purchaseData[purchasIndex].price;
    this.totalPrice.textContent = `
    Total : ${this.priceCalc.toLocaleString()} 원
    `
    return ;
}

  calcMinusMoney(index,decrease){
    //decrease 변수는 함수가 시작 됐을때 값을 감소시킬 지 여부
    if(this.priceCalc < 0){
        return;
    }
    const purchasIndex = this.itemRepeatCheck.indexOf(index);
    
    if(decrease === true) this.purchaseData[purchasIndex].downClick();      

    this.priceCalc -= this.purchaseData[purchasIndex].price;
    this.totalPrice.textContent = `
    Total : ${this.priceCalc.toLocaleString()} 원
    `
    return ;
  }

  createPurchaseList(elementIndex, i) {
    this.showItem.innerHTML += this.purchaseData[i].update();

    this.purchaseData.forEach((element) => {
      element.updateSelector();
      element.down.onpointerdown = () => {
        element.downClick();
        this.calcMinusMoney(elementIndex,false);
      };
      element.up.onpointerdown = () => {
        element.upClick();
        this.calcTotalMoney(elementIndex,false);
      };
    });
  }

  purchaseAlert(){
   if(this.priceCalc === 0){
    alert('물건을 담아주십시오');
    return;
    }

    alert(`${this.priceCalc.toLocaleString()}원 을 결제하시겠습니까?`)
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
    },{
      image:'./media/product4.jfif',
      name: "AirPods Max",
      star:4,
      price:300000
    },{
        image:'./media/product5.jfif',
        name:'ironman',
        star:5,
        price:99
    },{
        image:'./media/product5.jfif',
        name:'ironman',
        star:5,
        price:99
    }
    ,{
        image:'./media/product5.jfif',
        name:'ironman',
        star:5,
        price:99
    }
    ,{
        image:'./media/product5.jfif',
        name:'ironman',
        star:5,
        price:99
    }
    ,{
        image:'./media/product5.jfif',
        name:'ironman',
        star:5,
        price:99
    }
    ,{
        image:'./media/product5.jfif',
        name:'ironman',
        star:5,
        price:99
    }
  ];

  new App(product_data);
};
