//one ~ four , 이병 ~ 병장

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

const graph = document.getElementById("graph");

const salary_list = [
  510100, 510100, 552100, 552100, 552100, 552100, 552100, 552100, 610200,
  610200, 610200, 610200, 610200, 610200, 676100, 676100, 676100, 676100,
];

let 병장기간 = [4, 6, 8]; //육(해병) 해 공 순서  병장기간
let 적금가능기간 = [18, 18, 22]; //육, 해 , 공 순서로 적금 넣을수 있는기간으로 표시
let 복무기간 = [18, 20, 22]; // 복무기간
const 계급별월급_목록 = [510100, 552100, 610200, 676100];

let 적금금액선택 = document.querySelector(".saving_sel");
let 계급별월급 = document.querySelectorAll(".salary");

let 월급모은금액 = document.querySelector(".my_salary");
let 적금모은금액 = document.querySelector(".total_salary");
let 국가지원금추가 = document.querySelector(".support_money");
let 적금전후비교 = document.querySelector(".money_price");

let 월급저장 = [];
let 적금저장 = [];

let 월급합산 = 0;
let 적금합산 = 0;

function 계급별월급보여주기() {
  for (let i = 0; i < 4; i++) {
    계급별월급[i].textContent = `${계급별월급_목록[i].toLocaleString()} 원`;
  }
}

function 월급계산(군선택) {
  for (let i = 0; i < 군선택; i++) {
    월급합산 += salary_list[i];
    월급저장.push(월급합산);
  }
}

function 적금계산(적금개월, 적금값) {
  for (let i = 0; i < 적금개월; i++) {
    적금합산 += 적금값;
    적금저장.push(적금합산);
    if (i + 1 == 적금개월) {
      let 적금퍼센트 = (5 / 100) * 적금저장[i];
      let 이자붙힌총적금액수 = 적금저장[i] + 적금퍼센트;
      적금저장[i] = 이자붙힌총적금액수;
      return;
    }
  }
}

window.onload = () => {
  적금금액선택.onclick = () => {
    if (적금금액선택.value === "") {
      return;
    }

    let 적금금액 = Number.parseInt(적금금액선택.value) * 10000;

    계급별월급보여주기();
    월급계산(18);
    적금계산(18, 적금금액);

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
            data: 월급저장,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: "rgba(244,0,233,0.2)",
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: "red",
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1,
          },
          {
            // ⑤dataset의 이름(String)
            label: "적금만",
            // ⑥dataset값(Array)
            data: 적금저장,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: "rgba(10,255,0,0.2)",
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: "green",
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1,
          },
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

    new Chart(graph, config);
  };
};
