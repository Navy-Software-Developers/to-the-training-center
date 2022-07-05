 class Toggle {
     constructor() {
         this.toggle_box = document.querySelectorAll('.toggle_box');
         this.toggle_btn = document.querySelectorAll('.toggle_btn');

         this.toggle_box.forEach((element , index)=> {
          element.addEventListener('click', ()=>{
            this.onClick(element,this.toggle_btn[index]);
          });
         });

         this.toggle_default = true;

     }

     onClick(toggle_box,toggle_btn) {
         if (this.toggle_default) {
             toggle_btn.style.transform = `translateX(99%)`;
             toggle_box.style.backgroundColor = ` rgba(107,213,92,1) `;
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

