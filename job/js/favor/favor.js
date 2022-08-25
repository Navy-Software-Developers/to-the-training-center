let url_prefix = "http://api.xn--o39a35bw4ff5gp5m354a.xn--3e0b707e:8000";
import { Toggle } from '../job/toggle.js';

const favor_list = document.querySelector('.favor_list');


function update(positionName) {
  let html =

    `<div class="item_list"> 
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
  return html;

}



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
    .then((response) => {
      // 즐겨찾기 데이터
      console.log(response)
      for (let favorite of response) {
        favor_list.innerHTML += update(favorite.get_mos_name);
      }


      const toggle_box = document.querySelectorAll('.toggle_box');
      const toggle_btn = document.querySelectorAll('.toggle_btn');
    

      let toggle = new Array();

      for (let i = 0; i < toggle_box.length; i++) {
        toggle.push(
          new Toggle(
            toggle_box[i],
            toggle_btn[i],
            false
          )
        )
      }



   


      toggle_box.forEach((e, key) => {
        e.addEventListener('click', () => {
          let t = toggle[key];
          if(t.toggle_status === false){
            t.toggleOff();
            console.log('토글 꺼짐');
          }else if(t.toggle_status === true){
            t.toggleOn();
            console.log('토글 켜짐');
          }
 
        })
      })
    }).catch((err) => {
      alert('로그인을 해주세요!')
    })



  // deletFavor(1)
  // .then(function (response) {
  //   console.log("관심목록 삭제: ", response);
  // })
}