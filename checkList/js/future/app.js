//one ~ four , 이병 ~ 병장

let mili_work = [
{
  mili:[
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
  ]
},
{
  mili:[
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
    "19개월",
    "20개월"
  ]
}  ,
{
  mili:[
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
    "19개월",
    "20개월",
    "21개월",
    "22개월"
  ]
},
{
  mili:[
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
    "18개월"
  ]
}

];

let saving_possible = [
  {
    save:[
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
      "18개월"
    ]
  },
  {
    save:[
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
      "19개월",
      "20개월"
    ]
  },
  {
    save:[   
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
    '19개월',
    '20개월',
    "21개월",
    "22개월"
  ]
},
{
  
    save:[
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
      "18개월"
    ]

}
]

const graph = document.getElementById("graph");
const graph2 = document.getElementById('graph2');

const salary_list = [
  510100, 510100, 552100, 552100, 552100, 552100, 552100, 552100, 610200,
  610200, 610200, 610200, 610200, 610200, 676100, 676100, 676100, 676100,
  676100,676100,676100,676100
];

let classes_name = ['육군','해군','공군','해병대'];
let 병장기간 = [4, 6, 8,4]; //육(해병) 해 공 순서  병장기간
let 적금가능기간 = [18, 18, 22,18]; //육, 해 , 공 순서로 적금 넣을수 있는기간으로 표시
let 복무기간 = [18, 20, 22,18]; // 복무기간
const 계급별월급_목록 = [510100, 552100, 610200, 676100];

let 적금금액선택 = document.querySelector(".saving_sel");
let 계급별월급 = document.querySelectorAll(".salary");

let 월급모은금액 = document.querySelector(".my_salary");
let 적금모은금액 = document.querySelector(".total_salary");
let 국가지원금추가 = document.querySelector(".support_money");
let 적금전후비교 = document.querySelector(".money_price");
let toal_money = document.querySelector('.mmmoney');

let select_millitary = document.querySelectorAll('.mili_btn');
let my_millitary = null;

let chart_title = document.querySelector('.chart_title');


let 월급저장 = [];
let 적금저장 = [];
let 적금월급저장 = [];

let 월급합산 = 0;
let 적금합산 = 0;
let 적금월급합산 = 0;

let count = 0;
let myChart = null;
let myChart2 = null;


function 계급별월급보여주기() {
  for (let i = 0; i < 4; i++) {
    계급별월급[i].textContent = `${계급별월급_목록[i].toLocaleString()} 원`;
  }
}

function 월급계산(군선택) {
  console.log('군선택: ',군선택)
  월급합산 = 0;
  for (let i = 0; i < 군선택; i++) {
    월급합산 += salary_list[i];
    월급저장[i] = 월급합산;
  }
}

function 적금계산(적금개월, 적금값,mili) {
  적금합산 = 0;

  if(mili == '해군'){
    적금개월 -= 2;
  }

  for (let i = 0; i < 적금개월; i++) {
    적금합산 += 적금값;
    적금저장[i] = 적금합산;
    if (i + 1 == 적금개월) {
      let 적금퍼센트 = 0.05 * 적금저장[i];
      let 이자붙힌총적금액수 = 적금저장[i] + 적금퍼센트;
      let 지원적금퍼센트 = 0.33 * 이자붙힌총적금액수;
      적금저장[i] = 이자붙힌총적금액수 + 지원적금퍼센트;
      return;
    }
  }
}

 

function 적금월급계산(군선택, 적금금액,mili) {
  적금월급합산 = 0; //
  if(mili === '해군'){
    군선택+=2;
 
  }

  for (let i = 0; i < 군선택; i++) {
    적금월급합산 += salary_list[i] - 적금금액;

    적금월급저장[i] = 적금월급합산 + 적금저장[i];
  }
}

window.onload = () => {

  select_millitary.forEach((e,milli_number)=>{
    e.addEventListener('click',()=>{
       my_millitary = milli_number; 
       chart_title.textContent = classes_name[my_millitary];
    })
  })
  console.log(my_millitary)
 // chart_title.textContent = classes_name[my_millitary];

  계급별월급보여주기();
  적금금액선택.onclick = () => {
    if (적금금액선택.value === "") {
      return;
    }

    let 적금금액 = Number.parseInt(적금금액선택.value) * 10000;
    // console.log(적금금액);

    월급계산(복무기간[my_millitary]);
    적금계산(복무기간[my_millitary], 적금금액,classes_name[my_millitary]);
    적금월급계산(복무기간[my_millitary], 적금금액,classes_name[my_millitary]);
   // console.log(적금저장.length);
   console.log(my_millitary)
    let config = {
      type: "line",
      // ②차트의 데이터(Object)
      data: {
        // ③x축에 들어갈 이름들(Array)
        labels: mili_work[my_millitary].mili,
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
          }
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

    let config2 = {
      type: "line",
      // ②차트의 데이터(Object)
      data: {
        // ③x축에 들어갈 이름들(Array)
        labels: saving_possible[my_millitary].save,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [
     
          {
            // ⑤dataset의 이름(String)
            label: "적금만 + 33%",
            // ⑥dataset값(Array)
            data: 적금저장,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: "rgba(10,255,0,0.2)",
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: "green",
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1,
          },
          {
            // ⑤dataset의 이름(String)
            label: "적금 + 월급",
            // ⑥dataset값(Array)
            data: 적금월급저장,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: "rgba(10,20,255,0.2)",
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: "blue",
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1,
          }
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

    if (count == 0) {
      myChart = new Chart(graph, config);
      myChart2 = new Chart(graph2,config2);
      count++;
      return;
    }

    

    myChart2.data.datasets[0].data = 적금저장;
    myChart2.data.datasets[1].data = 적금월급저장;
    myChart.data.labels = mili_work[my_millitary].mili;
    myChart2.data.labels = saving_possible[my_millitary].save;

    myChart2.update();
    myChart.update();

    월급모은금액.textContent = 월급저장[월급저장.length-1].toLocaleString();
    적금모은금액.textContent = (적금저장[적금저장.length-1] - (적금저장[적금저장.length-1]*0.33)).toLocaleString();
    국가지원금추가.textContent = 적금저장[적금저장.length-1].toLocaleString();
    적금전후비교.textContent = (적금월급저장[적금가능기간[my_millitary]-1] - 월급저장[월급저장.length-1]).toLocaleString();
    toal_money.textContent = 적금월급저장[적금가능기간[my_millitary]-1].toLocaleString();
  };
};


/*

,
          {
            // ⑤dataset의 이름(String)
            label: "적금만 + 33%",
            // ⑥dataset값(Array)
            data: 적금저장,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: "rgba(10,255,0,0.2)",
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: "green",
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1,
          },
          {
            // ⑤dataset의 이름(String)
            label: "적금 + 월급",
            // ⑥dataset값(Array)
            data: 적금월급저장,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: "rgba(10,20,255,0.2)",
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: "blue",
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1,
          },
*/ 