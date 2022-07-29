//one ~ four , 이병 ~ 병장

let mili_work = [
  {
    mili: [
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
    ],
  },
  {
    mili: [
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
    ],
  },
  {
    mili: [
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
      "22개월",
    ],
  },
  {
    mili: [
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
    ],
  },
];

let saving_possible = [
  {
    save: [
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
    ],
  },
  {
    save: [
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
    ],
  },
  {
    save: [
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
      "22개월",
    ],
  },
  {
    save: [
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
    ],
  },
];

const graph = document.getElementById("graph");
const graph2 = document.getElementById("graph2");

const salary_list = [
  510100, 510100, 552100, 552100, 552100, 552100, 552100, 552100, 610200,
  610200, 610200, 610200, 610200, 610200, 676100, 676100, 676100, 676100,
  676100, 676100, 676100, 676100,
];

let classes_name = ["육군", "해군", "공군", "해병대"];
let sergeant_period = [4, 6, 8, 4]; //육(해병) 해 공 순서   (병장기간)
let saving_possible_period = [18, 18, 22, 18]; //육, 해 , 공 순서로 적금 넣을수 있는기간으로 표시
let army_service_period = [18, 20, 22, 18]; // army_service_period
const classes_salary_list = [510100, 552100, 610200, 676100];

let saving_money_select = document.querySelector(".saving_sel");
let classes_salary = document.querySelectorAll(".salary");

let salary_amount_price = document.querySelector(".my_salary");
let saving_amount_price = document.querySelector(".total_salary");
let country_add_price = document.querySelector(".support_money");
let saving_before_after = document.querySelector(".money_price");
let toal_money = document.querySelector(".mmmoney");

let select_millitary = document.querySelectorAll(".mili_btn");
let my_millitary = null;

let chart_title = document.querySelector(".chart_title");

let saving_salary = [];
let saving_save_amount = [];
let saving_save_array = [];

let salary_sum = 0;
let saving_sum = 0;
let saving_salary_sum = 0;

let count = 0;
let myChart = null;
let myChart2 = null;

function showClassessSalary() {
  for (let i = 0; i < 4; i++) {
    classes_salary[i].textContent = `${classes_salary_list[
      i
    ].toLocaleString()} 원`;
  }
}

function CalcSalary(select_army) {
  console.log("select_army: ", select_army);
  salary_sum = 0;
  for (let i = 0; i < select_army; i++) {
    salary_sum += salary_list[i];
    saving_salary[i] = salary_sum;
  }
}

function CalcSaving(saving_month, saving_value, mili) {
  saving_sum = 0;

  if (mili == "해군") {
    saving_month -= 2;
  }

  for (let i = 0; i < saving_month; i++) {
    saving_sum += saving_value;
    saving_save_amount[i] = saving_sum;
    if (i + 1 == saving_month) {
      let saving_percent = 0.05 * saving_save_amount[i];
      let money_interest = saving_save_amount[i] + saving_percent;
      let add_money_interest = 0.33 * money_interest;
      saving_save_amount[i] = money_interest + add_money_interest;
      return;
    }
  }
}

function CalcSavingSalary(select_army, saving_price, mili) {
  saving_salary_sum = 0; //
  if (mili === "해군") {
    select_army += 2;
  }

  for (let i = 0; i < select_army; i++) {
    saving_salary_sum += salary_list[i] - saving_price;

    saving_save_array[i] = saving_salary_sum + saving_save_amount[i];
  }
}

window.onload = () => {
  select_millitary.forEach((e, milli_number) => {
    e.addEventListener("click", () => {
      my_millitary = milli_number;
      chart_title.textContent = classes_name[my_millitary];
    });
  });
  console.log(my_millitary);
  // chart_title.textContent = classes_name[my_millitary];

  showClassessSalary();
  saving_money_select.onclick = () => {
    if (saving_money_select.value === "") {
      return;
    }

    let saving_price = Number.parseInt(saving_money_select.value) * 10000;
    // console.log(saving_price);

    CalcSalary(army_service_period[my_millitary]);
    CalcSaving(
      army_service_period[my_millitary],
      saving_price,
      classes_name[my_millitary]
    );
    CalcSavingSalary(
      army_service_period[my_millitary],
      saving_price,
      classes_name[my_millitary]
    );
    // console.log(saving_save_amount.length);
    console.log(my_millitary);
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
            data: saving_salary,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: "rgba(244,0,233,0.2)",
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: "red",
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
            data: saving_save_amount,
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
            data: saving_save_array,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: "rgba(10,20,255,0.2)",
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: "blue",
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

    if (count == 0) {
      myChart = new Chart(graph, config);
      myChart2 = new Chart(graph2, config2);
      count++;
      return;
    }

    myChart2.data.datasets[0].data = saving_save_amount;
    myChart2.data.datasets[1].data = saving_save_array;
    myChart.data.labels = mili_work[my_millitary].mili;
    myChart2.data.labels = saving_possible[my_millitary].save;

    myChart2.update();
    myChart.update();

    salary_amount_price.textContent =
      saving_salary[saving_salary.length - 1].toLocaleString();
    saving_amount_price.textContent = (
      saving_save_amount[saving_save_amount.length - 1] -
      saving_save_amount[saving_save_amount.length - 1] * 0.33
    ).toLocaleString();
    country_add_price.textContent =
      saving_save_amount[saving_save_amount.length - 1].toLocaleString();
    saving_before_after.textContent = (
      saving_save_array[saving_possible_period[my_millitary] - 1] -
      saving_salary[saving_salary.length - 1]
    ).toLocaleString();
    toal_money.textContent =
      saving_save_array[
        saving_possible_period[my_millitary] - 1
      ].toLocaleString();
  };
};

/*

,
          {
            // ⑤dataset의 이름(String)
            label: "적금만 + 33%",
            // ⑥dataset값(Array)
            data: saving_save_amount,
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
            data: saving_save_array,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: "rgba(10,20,255,0.2)",
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: "blue",
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1,
          },
*/
