export class Toggle {
  constructor(toggle_box,toggle_btn,toggle_status) {
    this.toggle_box = toggle_box;
    this.toggle_btn = toggle_btn;
    this.toggle_status = toggle_status; 
  
    // this.toggle_box.addEventListener('click',this.update.bind(this));
    this.init();
  }
  
  //toggle_status 에 따라 false > 꺼짐  ,true > 켜짐
  init(){
     if(this.toggle_status === false){
         this.toggleOff();
     }else if(this.toggle_status === true){
         this.toggleOn();
     }
  }

  // 토글 켜짐
  toggleOn(){
      this.toggle_btn.style.transform = `translateX(99%)`;
      this.toggle_box.style.backgroundColor = ` rgba(107,213,92,1) `;
      this.toggle_status = false;
      return true;
  }

  // 토글 꺼짐
  toggleOff(){
      this.toggle_btn.style.transform = `translateX(0%)`;
      this.toggle_box.style.backgroundColor = ` rgba(214,214,214,1)`;
      this.toggle_status = true;
      return false;
  }

  update(){
      this.init()
  }
 
}























// export class Toggle {
//   constructor() {
//     this.toggle_box = document.querySelectorAll('.toggle_box');
//     this.toggle_btn = document.querySelectorAll('.toggle_btn');

 
//     //토글 상태를 관리하는 배열 
//     this.toggle_status = new Array();

//     for (let i = 0; i < this.toggle_box.length; i++) {
      
//       //현재 토글의 상태
//       const data = {
//         'element': this.toggle_box[i],
//         'toggle_click': true,
//         'data': ''
//       };
//       this.toggle_status.push(data);
//     }


//     //토글을 클릭 여부 확인 
    

//     //this.toggle_default = false;
//     this.init();
//   }
//   init(){

//   }

//   onClick(toggle_box, toggle_btn, toggle_status) {

//     if (toggle_status.toggle_click) {
//       toggle_btn.style.transform = `translateX(99%)`;
//       toggle_box.style.backgroundColor = ` rgba(107,213,92,1) `;
//       toggle_status.toggle_click = false;
//       return true;
//     }


//     if (!toggle_status.toggle_click) {
//       toggle_btn.style.transform = `translateX(0%)`;
//       toggle_box.style.backgroundColor = ` rgba(214,214,214,1)`;
//       toggle_status.toggle_click = true;
//       return false;
//     }
//   }

//   toggleClick(callback){
//     this.toggle_box.forEach((element, index, d) => {
//       element.addEventListener('click', () => {
//         //  callback(
//         //   this.onClick(element,
//         //     this.toggle_btn[index],
//         //     this.toggle_status[index])
//         //  )

//        callback(
//             this.onClick(element,
//             this.toggle_btn[index],
//             this.toggle_status[index])
//        )
//       });
//     });
//   }

// }















//  window.onload = ()=>{
//     new Toggle();
//  }

// new Toggle();

/*
  <div class="toggle">
          <p>관심추가</p>
          <div class="toggle_box">
            <div class="toggle_btn"></div>
          </div>
        </div>
*/
/* 활성화 색  rgba(107,213,92,1) > 초록*/
/* 비활성화 색  rgba(214,214,214,1) > 회색*/
/* 버튼 색  rgba(247,247,247,1) > 흰색*/


/*

 class Toggle {
     constructor() {
         this.toggle_box = document.querySelector('.toggle_box');
         this.toggle_btn = document.querySelector('.toggle_btn');

         this.toggle_box.addEventListener('click', this.onClick.bind(this));

         this.toggle_default = true;

     }

     onClick(e) {
         if (this.toggle_default) {
             this.toggle_btn.style.transform = `translateX(99%)`;
             this.toggle_box.style.backgroundColor = ` rgba(107,213,92,1) `;
             this.toggle_default = false;
             return true;
         }

         
         if (!this.toggle_default) {
            this.toggle_btn.style.transform = `translateX(0%)`;
            this.toggle_box.style.backgroundColor = ` rgba(214,214,214,1)`;
            this.toggle_default = true;
            return false;
        }
     }

 }

 //  window.onload = ()=>{
 //     new Toggle();
 //  }

 new Toggle();

/*
  <div class="toggle">
          <p>관심추가</p>
          <div class="toggle_box">
            <div class="toggle_btn"></div>
          </div>
        </div>
*/
/* 활성화 색  rgba(107,213,92,1) > 초록*/
/* 비활성화 색  rgba(214,214,214,1) > 회색*/
/* 버튼 색  rgba(247,247,247,1) > 흰색*/

