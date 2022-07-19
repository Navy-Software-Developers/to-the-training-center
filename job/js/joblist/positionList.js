export class PositionList{
    constructor(idx,data){
        this.index = idx;
        
    }

    render(){
        let html = `
        <li class="list_box">
        <span class="idx">
          345 해군
        </span>
        <p class="positionName">
          SW 개발병 (S162.103)
        </p>
  
        <span class="arrow_box">
          <img src="./media/arrow.svg" alt="" class="href_btn">
        </span>
      </li>
        `

        return html;
    }

}