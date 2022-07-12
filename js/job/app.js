let chart = document.getElementById('myChart');

const month_label = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

let member = [{
    total:[46,10,12,0,12,0,5,10,10,11,30,22],
    color:'rgba(255,99,132,1)'
},{
    pass:[6,7,2,0,6,0,1,2,3,1,10,22],
    color:'rgba(0,255,10,1)'
}]
const color = 'rgba(255, 99, 132, 1)'


let config = {
    type: 'line',
    // ②차트의 데이터(Object)
    data: {
        // ③x축에 들어갈 이름들(Array)
        labels: month_label,
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [{
            // ⑤dataset의 이름(String)
            label: '지원률 현황',
            // ⑥dataset값(Array)
            data: member[0].total,
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: member[0].color,
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1
        },
    {
        // ⑤dataset의 이름(String)
        label: '합격 현황',
        // ⑥dataset값(Array)
        data: member[1].pass,
        // ⑦dataset의 배경색(rgba값을 String으로 표현)
        backgroundColor: 'rgba(0,255,10,0.2)',
        // ⑧dataset의 선 색(rgba값을 String으로 표현)
        borderColor: member[1].color,
        // ⑨dataset의 선 두께(Number)
        borderWidth: 1
    }
]
    },
    // ⑩차트의 설정(Object)
    options: {
        // ⑪축에 관한 설정(Object)
        scales: {
            // ⑫y축에 대한 설정(Object)
            y: {
                // ⑬시작을 0부터 하게끔 설정(최소값이 0보다 크더라도)(boolean)
                beginAtZero: true
            }
        }
    }
}
 
window.onload = ()=>{
   
    new Chart(chart,config)
}


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