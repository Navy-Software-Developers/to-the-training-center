let url_prefix = "http://api.xn--o39a35bw4ff5gp5m354a.xn--3e0b707e:8000";
import { Toggle } from '../job/toggle.js';

const favor_list = document.querySelector('.favor_list');
const del_btn = document.querySelector('.delete_btn');
const del_wrap = document.querySelector('.delete_favorite');


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

function delUpdate(positionName) {
  let html =

    `<div class="item_list delete"> 
        <div class="position_name">
             ${positionName}
        </div>
        <div class="del">
        해제
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
function removeAllchild(div) {
  while (div.hasChildNodes()) {
      div.removeChild(div.firstChild);
  }
}

window.onload = () => {
  getFavorData()
    .then((response) => {
      // 즐겨찾기 데이터
      console.log(response)
      if(response.length === 0){
        favor_list.className += ' favor_no';
        favor_list.innerHTML += ` <p>아직 즐겨찾기를 추가 하지 않았습니다!</p>`;
        console.log('no data')
        return 0;
      }

      del_wrap.style.display = 'grid';
    

      for (let favorite of response) {
        favor_list.innerHTML += update(favorite.get_mos_name);
      }


      const toggle_box = document.querySelectorAll('.toggle_box');
      const toggle_btn = document.querySelectorAll('.toggle_btn');
      const position_name= document.querySelectorAll('.position_name');
      const item_list = document.querySelectorAll('.item_list');

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
      
    

      position_name.forEach((e,key)=>{
        let url = `./job.html#${response[key].mos}`
        e.onclick = ()=>{
          location.href = url;
        }
      })
   

      //토글 이벤트 처리 구간
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


      del_btn.onclick = ()=>{
        if(del_btn.innerText === '완료'){
          location.reload();
          return;
        }

        del_btn.innerText = '완료'
        removeAllchild(favor_list);
       for (let favorite of response) {
          favor_list.innerHTML += delUpdate(favorite.get_mos_name);
        }
        const favor_del = document.querySelectorAll('.del');
        favor_del.forEach((e,key)=>{
          e.onclick = ()=>{
            e.innerText = '해제 됨'
            deletFavor(response[key].mos);
          }
        })
      }



    }).catch((err) => {
      alert('로그인을 해주세요!')
    })



  // deletFavor(1)
  // .then(function (response) {
  //   console.log("관심목록 삭제: ", response);
  // })
}