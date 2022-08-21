let url_prefix = "http://api.xn--o39a35bw4ff5gp5m354a.xn--3e0b707e:8000";

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



function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  
async function getFavorData() {
    let favor_url = url_prefix + "/api/mos/mylikes";
    const response = await fetch(favor_url, {
        method: "GET", // *GET, POST, PUT, DELETE 등
        // mode: 'cors', // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("my-app-auth"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      return response.json();
}


async function deletFavor(pk) { // 관심목록 삭제 함수 (인자 삭제할 pk값)
    let url = url_prefix + `/api/mos/${pk}/like`;
    const response = await fetch(url, {
        method: "DELETE", // *GET, POST, PUT, DELETE 등
        // mode: 'cors', // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("my-app-auth"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      return response.json();
}


window.onload = () => {
    getFavorData()
    .then(function (response) {
      console.log("즐겨찾기 데이터: ", response);
    })

    // deletFavor(1)
    // .then(function (response) {
    //   console.log("관심목록 삭제: ", response);
    // })
}