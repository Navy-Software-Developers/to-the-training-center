//one ~ four , 이병 ~ 병장

const salary_list = [
  510100, 510100, 552100, 552100, 552100, 552100, 552100, 552100, 610200,
  610200, 610200, 610200, 610200, 610200, 676100, 676100, 676100, 676100,
];

let mili = [4, 6, 8]; //육(해병) 해 공 순서  병장기간
let saving = [18, 18, 22]; //육, 해 , 공 순서로 적금 넣을수 있는기간으로 표시
let work = [18, 20, 22]; // 복무기간

let mili_work = [
  "1개월",
  "2개월",
  "3개월",
  "4개월",
  "5개월",
  "6개월",
  "7개월",
  "8개월",
  "9개월",
  "10개월",
  "11개월",
  "12개월",
  "13개월",
  "14개월",
  "15개월",
  "16개월",
  "17개월",
  "18개월",
];

let config = {
  type: "line",
  // ②차트의 데이터(Object)
  data: {
    // ③x축에 들어갈 이름들(Array)
    labels: mili_work,
    // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
    datasets: [
      {
        // ⑤dataset의 이름(String)
        label: "월급",
        // ⑥dataset값(Array)
        data: total,
        // ⑦dataset의 배경색(rgba값을 String으로 표현)
        backgroundColor: "rgba(244,0,233,0.2)",
        // ⑧dataset의 선 색(rgba값을 String으로 표현)
        borderColor: "red",
        // ⑨dataset의 선 두께(Number)
        borderWidth: 1,
      },
      // {
      //   // ⑤dataset의 이름(String)
      //   label: "적금만",
      //   // ⑥dataset값(Array)
      //   data: save_money,
      //   // ⑦dataset의 배경색(rgba값을 String으로 표현)
      //   backgroundColor: "rgba(10,255,0,0.2)",
      //   // ⑧dataset의 선 색(rgba값을 String으로 표현)
      //   borderColor: "green",
      //   // ⑨dataset의 선 두께(Number)
      //   borderWidth: 1,
      // },
      // {
      //   // ⑤dataset의 이름(String)
      //   label: "월급 + 적금",
      //   // ⑥dataset값(Array)
      //   data: save_money2,
      //   // ⑦dataset의 배경색(rgba값을 String으로 표현)
      //   backgroundColor: "rgba(0,0,255,0.6)",
      //   // ⑧dataset의 선 색(rgba값을 String으로 표현)
      //   borderColor: "blue",
      //   // ⑨dataset의 선 두께(Number)
      //   borderWidth: 1,
      // },
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

window.onload = () => {
  new Chart(graph, config);
};
