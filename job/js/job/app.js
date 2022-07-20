let chart = document.getElementById("myChart");
let chart2 = document.getElementById("myChart2");

window.onload = () => {
  let pk = location.hash.replace("#", "");
  let url_prefix = "http://api.xn--o39a35bw4ff5gp5m354a.xn--3e0b707e:8000";
  let BRANCH = [, "육군", "해군", "공군", "해병대"];
  let data;

  let url = url_prefix + "/api/mos/" + pk;
  console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      data = json;
      load();
      draw();
    });

  let like_data;
  let like_url = url_prefix + "/api/mos/likes";

  fetch(like_url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      like_data = json;
      like_load();
    });

  function load() {
    document.querySelector("#title").innerHTML = data.name;
    document.querySelector("#wiki_content").innerHTML = data.wiki
      ? data.wiki
      : "작성된 내용이 없습니다. 군사특기 위키를 작성해보세요.";
    //그래프 등
  }
  function like_load() {
    console.log(like_data);
    //관심목록 유무 토글 변경
  }

  function toggle_like() {}

  function draw() {
    console.log(data);
    // data.recuritCnt 모집 인원
    //data.applyedCnt 지원 인원
    //endlistStart 입대일

    let month_label = [];

    let total = [];
    let pass = [];
    let competition = [];

    for (let info of data.recurits) {
      let day = info.enlistStart.toString();
      let year = day.slice(0, 4);
      let month = day.slice(4, 6) + "월";

      total.push(info.recuritCnt);
      pass.push(info.applyedCnt);
      month_label.push(month);
      competition.push(info.applyedCnt / info.recuritCnt);
    }

    console.log(total, pass);
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
