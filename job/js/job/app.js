import {getReveiewStarPosition,setReviewStar} from './review.js';
import {Toggle} from './toggle.js';

const toggle_box = document.querySelector('.toggle_box');
const toggle_btn= document.querySelector('.toggle_btn');

 
const toggle = new Toggle(toggle_box, toggle_btn,false);
 


const review_stars = document.querySelectorAll('.review_star')
const evaluations = document.querySelectorAll('.evaluation');
const save_evaluation = document.querySelector('.save_evaluation');


const user_star = document.querySelectorAll('.user_star');
const suer_evaluation = document.querySelectorAll('.user_evaluation')

const average = document.querySelector('.average');
const like = document.querySelector('.like');
const review_people =document.querySelector('.review_people');

const like_avg = document.querySelector('.like_avg span');

let review_data =   {
 
  
  "rating1": 0,
  "rating2": 0,
  "rating3": 0,
  "rating4": 0,
  "rating5": 0,
  "review": null,
  "advantage": null,
  "disadvantage": null,
  
}


let rating_data = new Array(5).fill(0);








const progress_bar = document.querySelectorAll('.progress_bar');
const total_star = document.querySelector('.star_count > span');
const star_list = document.querySelector('.star_list');


let stars = [];
let review_count = document.querySelectorAll('.subtitle_review_count');



 

function calcStar(object){
  let star1 = 0;
  let star2 = 0;
  let star3 = 0;
  let star4 = 0;
  let star5 = 0;

  for(let i =0 ;i  < object.length ;i++){
   
      star1 += object[i].rating1;
      star2 += object[i].rating2;
      star3 += object[i].rating3;
      star4 += object[i].rating4;
      star5 += object[i].rating5;

  }

  
  return [star1/object.length
          ,star2/object.length
          ,star3/object.length
          ,star4/object.length
          ,star5/object.length
        ];
}





let chart = document.getElementById("myChart");
let chart2 = document.getElementById("myChart2");
const table = document.querySelector(".table");
chart.style.display = 'none';
chart2.style.display = 'none'

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


 
// POST 메서드 구현 예제
async function postData(url = "", data = {}) {
  // 옵션 기본 값은 *로 강조
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE 등
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
    body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
  });
  return response.json(); // JSON 응답을 네이티브 JavaScript 객체로 파싱
}

async function getData(url = "", data = {}) {
  // 옵션 기본 값은 *로 강조
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE 등
    // mode: 'cors', // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response;
}

async function getDataWithToken(url = "", data = {}) {
  // 옵션 기본 값은 *로 강조
  const response = await fetch(url, {
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
  return response;
}

window.onload = () => {

  //별에 마우스 올릴 시 별점 평가
  review_stars.forEach((e,key)=>{
    getReveiewStarPosition(e,(result)=>{
        setReviewStar(e,result)
        rating_data[key] = result;
        // console.log(rating_data)
    })
  }) 
  
 // 리뷰 평가 작성 및 별점 저장 
  save_evaluation.onclick = ()=>{
    // evaluations.forEach((e,i)=>{
    //     review_data[1].review_comments[i] = e.value;
    // })
    

    let count = 0;
     
    
    review_data.rating1 = rating_data[0];
    review_data.rating2 = rating_data[1];
    review_data.rating3 = rating_data[2];
    review_data.rating4 = rating_data[3];
    review_data.rating5 = rating_data[4];

    review_data.review = evaluations[0].value;
    review_data.advantage = evaluations[1].value;
    review_data.disadvantage = evaluations[2].value;
    
   
    // console.log(review_data);
    writeReview(review_data).then(
      (res)=>{
        console.log(res);
        alert('등록 완료!')
        location.reload();
      }
    )
    
  }

  

  async function getReviewData() { // 해당 보직 리뷰들 조회
    let url = url_prefix + `/api/mos/${pk}/review`;
    const response = await fetch(url, {
      method: "GET",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return response.json();
  }


  async function writeReview(data) { // 리뷰작성
    console.log(JSON.stringify(data))
    let url = url_prefix + `/api/mos/${pk}/review`;
    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("my-app-auth"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  }


  function drawReview(reviews) {
    let review_list = document.querySelector("#chart7 > div.write_box_list");
    console.log('평점 여부 : ' , reviews.length);
    if(reviews.length === 0){
      review_list.className += ' rev';
      review_list.innerHTML += `<p>아직 평가가 없습니다!</p>`;
      return 0;
    }
    review_list.innerHTML = "";
    for (let review of reviews) {
      let this_review = `<div class="write_box size">
    <div class="choose_star">
      <a>${review.get_username}님의 리뷰</a>
      <li class="star_item">
        <p>당직 횟수 만족도</p>
        <span class="stars_count user_star">`
      for (let i = 0; i < review.rating1; i++) {
        this_review += `<img src="../mall/media/star/yesStar.svg" alt="">`
      }
      for (let i = 0; i < 5 - review.rating1; i++) {
        this_review += `<img src="../mall/media/star/noStar.svg" alt="">`
      }
      this_review += `</span>
      </li>
      <li class="star_item">
        <p>업무 만족도</p>
        <span class="stars_count user_star">`
      for (let i = 0; i < review.rating2; i++) {
        this_review += `<img src="../mall/media/star/yesStar.svg" alt="">`
      }
      for (let i = 0; i < 5 - review.rating2; i++) {
        this_review += `<img src="../mall/media/star/noStar.svg" alt="">`
      }
      this_review += `</span>
      </li>
      <li class="star_item">
        <p>휴가횟수 만족도</p>
        <span class="stars_count user_star">`
      for (let i = 0; i < review.rating3; i++) {
        this_review += `<img src="../mall/media/star/yesStar.svg" alt="">`
      }
      for (let i = 0; i < 5 - review.rating3; i++) {
        this_review += `<img src="../mall/media/star/noStar.svg" alt="">`
      }
      this_review += `</span>
      </li>
      <li class="star_item">
        <p>복지 만족도</p>
        <span class="stars_count user_star">`
      for (let i = 0; i < review.rating4; i++) {
        this_review += `<img src="../mall/media/star/yesStar.svg" alt="">`
      }
      for (let i = 0; i < 5 - review.rating4; i++) {
        this_review += `<img src="../mall/media/star/noStar.svg" alt="">`
      }
      this_review += `</span>
      </li>
      <li class="star_item">
        <p>병영문화 만족도</p>
        <span class="stars_count user_star">`
      for (let i = 0; i < review.rating5; i++) {
        this_review += `<img src="../mall/media/star/yesStar.svg" alt="">`
      }
      for (let i = 0; i < 5 - review.rating5; i++) {
        this_review += `<img src="../mall/media/star/noStar.svg" alt="">`
      }
      this_review += `</span>
      </li>
    </div>
    <div class="write_review">
      <li class="write_item">
        <p>한줄 평가</p>
        <span class="user_evaluation">${review.review}</span>
      </li>
      <li class="write_item">
        <p>장점</p>
       
        <span class="user_evaluation">${review.advantage}</span>
      </li>
      <li class="write_item">
        <p>단점</p>
    
        <span class="user_evaluation">${review.disadvantage}</span>
      </li>

   
    </div>
  </div>`
  review_list.innerHTML += this_review;
    }
  }

  async function deletReview() { // 접속자가 작성한 리뷰 삭제
    let url = url_prefix + `/api/mos/${pk}/review`;
    const response = await fetch(url, {
      method: "DELETE",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("my-app-auth"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return response.json();
  }

  let pk = location.hash.replace("#", "");
  if (pk == "") {
    location.href = "/";
  }
  let url_prefix = "http://api.xn--o39a35bw4ff5gp5m354a.xn--3e0b707e:8000";
  let BRANCH = [, "육군", "해군", "공군", "해병대"];

  let data;

  let url = url_prefix + "/api/mos/" + pk;
  getData(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      data = json;
      load();
      draw();
    });

  getReviewData()
    .then(function (json) {
      drawReview(json.result);
      console.log("리뷰 데이터: ", json);
      if(json.result.length === 0){
        return 0;
      }
      review_people.innerText = json.result.length;
      
      [stars[0],stars[1],stars[2],stars[3],stars[4]] = calcStar(json.result);
      console.log('평균평점',stars);
      console.log(progress_bar.length)
      let result = (stars.reduce((a,b)=>{return a+b}))/5;
      total_star.innerText = result;
      like_avg.innerText = result;
      // setReviewStar(star_list,result.toFixed(0));
      setReviewStar(star_list,result.toFixed(0));
      progress_bar.forEach((e,key)=>{
        e.style.width = `${stars[key]*20}%`;
        review_count[key].innerText = stars[key];
      })

   
    });

  let like_data;
  let like_url = url_prefix + "/api/mos/" + pk + "/like";

  getDataWithToken(like_url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      if(json['status'] == "success"){
        like_data = json.result;
        like_load();
      }
    });

  function load() {
    document.title = data.name;
    document.querySelector("#title").innerHTML = data.name;
    document.querySelectorAll('.skeleton').forEach((e)=>{
      e.style.display = 'none';
    })
    chart.style.display = 'block';
    chart2.style.display = 'block'
   
    document.querySelector("#wiki_content").innerHTML = data.wiki
      ? data.wiki
      : "작성된 내용이 없습니다. 군사특기 위키를 작성해보세요.";
    //그래프 등
  }
  function like_load() {
    console.log(like_data);
    //관심목록 유무 토글 변경
    if(like_data != "notLike"){
      console.log("즐겨찾기입니다");
      toggle.toggle_status = true;
      toggle.update();
 
      
    }else{
      console.log("즐겨찾기 아님");
      toggle.toggle_status = false;
      toggle.update();
    
    }
  }

  //토글 껐다 켰다 처리
  toggle_box.addEventListener('click',()=>{
    let request_method = null;
    if(toggle.toggle_status === false){
      console.log(toggle.toggle_status);
      toggle.toggleOff();
       request_method = 'DELETE';
    
     }else if(toggle.toggle_status === true){
      console.log(toggle.toggle_status);
      toggle.toggleOn();
       request_method = 'POST'; 
    }
 
    fetch(like_url, {
      method: request_method,
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("my-app-auth"),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    }).then(function (response) {
      return response.json();
    })
    .then(function (json) {
      if(json.status == "success") {
        console.log("정상 토글댐");
        // 토글처리
      }else{
        console.log("실패");
      }
    });


  })

  

  // function toggle_like() {
  //   if(like_data != "notLike"){
  //     request_method = 'DELETE';
  //     console.log('delete');
  //   }else{
  //     request_method = 'POST';
  //     console.log('post')
  //   }
  //   console.log(like_data)
  //   fetch(like_url, {
  //     method: request_method,
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: "include", // include, *same-origin, omit
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + getCookie("my-app-auth"),
  //     },
  //     redirect: "follow", // manual, *follow, error
  //     referrerPolicy: "no-referrer",
  //   }).then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (json) {
  //     if(json.status == "success") {
  //       console.log("정상 토글댐");
  //       // 토글처리
  //     }else{
  //       console.log("실패");
  //     }
  //   });
  // }
  
  function draw() {
    console.log("보직을 즐겨찾기에추가한 사람수: ", data.user_total);
    like.innerText = `즐겨찾기:${data.user_total}`
    console.log(data);
    let point_table = document.querySelector("body > div > div > div.info.position");
    for (let i of data.points) {
      if (i.category != "전공"){
        point_table.innerHTML += `<div class="license_item_list">
          <ul class="license_info_list">
            <li>` + i.name + `</li>
            <li>` + data.mma_total + `명중 ` + i.point_mma + `</li>
            <li>` + data.user_total + `명중 ` + i.point_user + `</li>
          </ul>
        </div>`
      }
      
    }


    // data.recuritCnt 모집 인원
    //data.applyedCnt 지원 인원
    //endlistStart 입대일

    let month_label = [];

    let total = [];
    let pass = [];
    let competition = [];

    let table_data = [];

    for (let info of data.recurits) {
      let day = info.enlistStart.toString();
      let year = day.slice(0, 4);
      let month = day.slice(4, 6) + "월";
      
      total.push(info.recuritCnt);
      pass.push(info.applyedCnt);
      month_label.push(month);
      competition.push(info.applyedCnt / info.recuritCnt);

      let startDay = info.recuritStart.toString();
      let endDay = info.recuritEnd.toString();

      table_data.push({
        round: info.recuritRound,
        recurit: info.recuritCnt,
        applyed: info.applyedCnt,
        start: `${startDay.slice(0, 4)}/${startDay.slice(
          4,
          6
        )}/${startDay.slice(6, 8)}`,
        end: `${endDay.slice(0, 4)}/${endDay.slice(4, 6)}/${endDay.slice(
          6,
          8
        )}`,
        enlistMilitaryUnit: info.enlistMilitaryUnit,
        recuritStart: `${year}/${day.slice(4, 6)}`,
        compete: info.applyedCnt / info.recuritCnt,
      });
    }

    function tableRender(table_data) {
      let html = `
      <ul class="row_box">
      <li class="row">${table_data.round}차</li>
      <li class="row">${table_data.recurit}명</li>
      <li class="row">${table_data.applyed}명</li>
      <li class="row">${table_data.compete.toFixed(1)} : 1</li>
      <li class="row"> ${table_data.start} ~ ${table_data.end}</li>
      <li class="row">${table_data.enlistMilitaryUnit}</li>
      <li class="row">${table_data.recuritStart}</li>
    </ul>
      `;
      return html;
    }
    table_data.sort((a,b)=>{
      return a.round - b.round;
    })
    
    let sum = 0;
    for (let t of table_data) {
      table.innerHTML += tableRender(t);
      sum += t.compete;
    }
    let average_compete = sum/table_data.length;
    console.log("평균 경쟁률: ", average_compete);
   average.innerText = `평균경쟁: ${average_compete.toFixed(2)}:1`
    //   console.log(total, pass);
    let member = [
      {
        total: total,
        color: "rgba(255,99,132,1)",
      },
      {
        pass: pass,
        color: "rgba(0,255,10,1)",
      },
      {
        competition: competition,
        color: "rgba(244,0,233,1)",
      },
    ];

    const color = "rgba(255, 99, 132, 1)";
    month_label.sort();
    let config = {
      type: "line",
      // ②차트의 데이터(Object)
      data: {
        // ③x축에 들어갈 이름들(Array)
        labels: month_label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [
          // {
          //   // ⑤dataset의 이름(String)
          //   label: "모집률",
          //   // ⑥dataset값(Array)
          //   data: member[0].total,
          //   // ⑦dataset의 배경색(rgba값을 String으로 표현)
          //   backgroundColor: "rgba(255, 99, 132, 0.2)",
          //   // ⑧dataset의 선 색(rgba값을 String으로 표현)
          //   borderColor: member[0].color,
          //   // ⑨dataset의 선 두께(Number)
          //   borderWidth: 1,
          // },
          // {
          //   // ⑤dataset의 이름(String)
          //   label: "지원률",
          //   // ⑥dataset값(Array)
          //   data: member[1].pass,
          //   // ⑦dataset의 배경색(rgba값을 String으로 표현)
          //   backgroundColor: "rgba(0,255,10,0.2)",
          //   // ⑧dataset의 선 색(rgba값을 String으로 표현)
          //   borderColor: member[1].color,
          //   // ⑨dataset의 선 두께(Number)
          //   borderWidth: 1,
          // },
          {
            // ⑤dataset의 이름(String)
            label: "경쟁률",
            // ⑥dataset값(Array)
            data: member[2].competition,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: "rgba(244,0,233,0.2)",
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: member[2].color,
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1,
          },
        ],
      },
      // ⑩차트의 설정(Object)
      options: {
        // ⑪축에 관한 설정(Object)
        scales: {
          // ⑫y축에 대한 설정(Object)
          y: {
            // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
            beginAtZero: true,
          },
        },
      },
    };

    let bar_chart = {
      // The type of chart we want to create
      type: "bar",

      // The data for our dataset
      data: {
        labels: month_label,
        datasets: [
          {
            label: "모집 인원수",
            backgroundColor: "rgba(100, 255, 132,0.4)",
            borderColor: "rgba(100, 255, 132,1)",
            data: member[0].total,
          },
        ],
      },

      // Configuration options go here
      options: {},
    };

    new Chart(chart2, bar_chart);
    new Chart(chart, config);
  }

  const wiki = document.querySelector(".wiki");
  const save_wiki = document.querySelector(".save_wiki");
  const wiki_box = document.querySelector(".wiki_type_box");
  const wiki_command = document.querySelector(".wiki_command");
  const wiki_content = document.querySelector("#wiki_content");

  let wiki_text = null;
  let wiki_url = `${url_prefix}/api/mos/${pk}/wiki`;

  //"위키 작성하기" 버튼을 클릭했을때
  wiki.onclick = () => {
    wiki_box.style.display = "block";
    wiki.style.display = "none";
    wiki_content.style.display = "none";
    wiki_command.value = data.wiki;
  };

  save_wiki.onclick = () => {
    let wiki_result;
    wiki_box.style.display = "none";
    wiki.style.display = "grid";
    let wiki_text = wiki_command.value; //작성한 글 내용 가져오기

    postData(wiki_url, { content: wiki_text }).then((wiki_result) => {
      console.log(wiki_result); // JSON 데이터가 `data.json()` 호출에 의해 파싱됨
      if (wiki_result.status == "success") {
        data.wiki = wiki_text;
        wiki.style.display = "grid";
        wiki_content.style.display = "grid";
        load();
      } else {
        wiki_content.style.display = "grid";
        wiki.style.display = "grid";
        alert("로그인 후 작성 가능합니다!");
      }
    });
  };

  // const search_bar = document.querySelector(".search_bar");
  // const search_input = document.querySelector(".search_input");
  // const search_close = document.querySelector(".search_close"); //flex
  // const autocomplete = document.querySelector(".autocomplete");

  // search_bar.onclick = () => {
  //   search_bar.style.display = "none";
  //   search_input.style.display = "block";
  //   search_close.style.display = "flex";
  // };

  // search_close.onclick = () => {
  //   search_bar.style.display = "block";
  //   search_input.style.display = "none";
  //   search_close.style.display = "none";
  //   autocomplete.style.display = "none";
  // };

  //키보드 입력이 들어올때 마다 일어나는 이벤트
  // search_input.onkeydown = () => {
  //   //키보드 입력시 발생할 이벤트 작성
  //   autocomplete.style.display = "block";
  // };
};

// new Chart(document.getElementById("myChart"), {
//     type: 'line',
//     data: {
//       labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
//       datasets: [{
//           data: [86,114,106,106,107,111,133,221,783,2478],
//           label: "Africa",
//           borderColor: "#3e95cd",
//           fill: false
//         }, {
//           data: [282,350,411,502,635,809,947,1402,3700,5267],
//           label: "Asia",
//           borderColor: "#8e5ea2",
//           fill: false
//         }, {
//           data: [168,170,178,190,203,276,408,547,675,734],
//           label: "Europe",
//           borderColor: "#3cba9f",
//           fill: false
//         }, {
//           data: [40,20,10,16,24,38,74,167,508,784],
//           label: "Latin America",
//           borderColor: "#e8c3b9",
//           fill: false
//         }, {
//           data: [6,3,2,2,7,26,82,172,312,433],
//           label: "North America",
//           borderColor: "#c45850",
//           fill: false
//         }
//       ]
//     },
//     options: {
//       title: {
//         display: true,
//         text: 'World population per region (in millions)'
//       }
//     }
//   });
