class Favor {
    constructor(positionName) {
        this.favor_list = document.querySelector('.favor_list');
        this.positionName = new Array();
        
        for(let i = 0 ;i  < positionName.length; i++){
            this.positionName.push(positionName[i]);
            }
        

        for(let i=0;i<positionName.length;i++)
        {
            this.update(positionName[i])
        }
        
    }

    update(positionName) {
        let html =

            `
        <div class="item_list">
<div class="position_name">
    ${positionName}
</div>
<div class="toggle">

    <div class="toggle_box">
      <div class="toggle_btn"></div>
    </div>
  </div>
</div>
        `
        this.favor_list.innerHTML += html;
        
    }


}

let name = ['sw개발병','갑판','전산'];
new Favor(name)