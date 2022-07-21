let material = [
  {
    name: "신분증",
    check: false,
    index: 0,
  },
  {
    name: "입영통지서",
    check: false,
    index: 1,
  },
  {
    name: "운동화",
    check: false,
    index: 2,
  },
];

let free_material = [
  {
    name: "충전기",
    check: false,
    index: 0,
  },
  {
    name: "로션",
    check: false,
    index: 1,
  },
  {
    name: "바디워시",
    check: false,
    index: 2,
  },
  {
    name: "칫솔, 치약",
    check: false,
    index: 3,
  },
  {
    name: "상비약(반창고, 연고)",
    check: false,
    index: 4,
  },
  {
    name: "보호대",
    check: false,
    index: 5,
  },
];

let etc = [
  // {
  //   name: "군휴학",
  //   check: false,
  //   index: 5,
  // },
  {
    name: "미래설계 (돈을 얼마 모으게 될까 ?) ",
    check: false,
    index: 5,
  },
  {
    name:"쇼핑몰 바로가기",
    check:false,
    index:5
  }
  // {
  //   name: "보급품 확인",
  //   check: false,
  //   index: 5,
  // },
];

// class App {
//   constructor() {
//      this.list = document.querySelectorAll('.list');

//      this.material = [];
//      this.free_material = [];
//      this.etc = [];

//      this.update(this.material,material.length,0);
//      this.update(this.free_material,free_material.length,1);
//      this.update(this.etc,etc.length,2);

//     }

//   update(element, loop,parent){
//     for(let i =0 ;i <loop;i++){
//         element.push(new Material(material[i],this.list[parent],true));
//     }
//     this.render(element,loop);

//   }

//   render(element,loop){
//     for(let i =0; i <loop ;i++){
//       element[i].update();
//     }
//   }

// }

// class Material{
//     constructor(data,parent,checkbox){
//         this.name = data.name;
//         this.check = data.check;
//         this.index = data.index;
//         this.parent = parent;
//         this.checkbox = checkbox;
//         this.box = new Box(this.name);
//     }

//     update(){
//        this.parent.innerHTML += this.box.create();

//     }
// }

// class Box{
//     constructor(name,checkbox){
//         this.name = name;
//         this.checkbox = checkbox;
//     }

//     create(){
//         let html =
//         `
//         <li class="list_box">
//         <span class="idx checkbox">
//             <input type="checkbox"  name=""  >

//         </span>

//         <div class="wrapper">
//             <p class="positionName">
//                 ${this.name}
//             </p>

//             <span class="arrow_box">
//                 <img src="./media/arrow.svg" alt="" class="href_btn">
//             </span>

//         </div>

//     </li>
//         `

//         return html;
//     }
// }

// window.onload = () => {
//   new App();
// };

let list = document.querySelectorAll(".list");

function create(name, className) {
  let html = `
        <li class="list_box">
        <span class="idx checkbox">
            <input class=${className} type="checkbox"  name=""  >
         
        </span>


        <div class="wrapper">
            <p class="positionName">
                ${name}
            </p>

            <span class="arrow_box">
                <img src="./media/arrow.svg" alt="" class="href_btn">
            </span>

        </div>


    </li>
        `;

  return html;
}

function update(element, loop, data, className) {
  for (let i = 0; i < loop; i++) {
    element.innerHTML += create(data[i].name, className);
  }
}

update(list[0], material.length, material, "material");
update(list[1], free_material.length, free_material, "free_material");
update(list[2], etc.length, etc, "etc");

let material_btn = document.querySelectorAll(".material");
let free_material_btn = document.querySelectorAll(".free_material");
let etc_btn = document.querySelectorAll(".etc");
const save = document.querySelector(".save");

material_btn.forEach((e, index) => {
  e.addEventListener("click", () => {
    if (e.checked === true) {
      material[index].check = true;
    } else {
      material[index].check = false;
    }
    console.log(material);
  });
});

free_material_btn.forEach((e, index) => {
  e.addEventListener("click", () => {
    if (e.checked === true) {
      free_material[index].check = true;
    } else {
      free_material[index].check = false;
    }
    console.log(free_material);
  });
});

etc_btn.forEach((e, index) => {
  e.addEventListener("click", () => {
    if (e.checked === true) {
      etc[index].check = true;
    } else {
      etc[index].check = false;
    }
    console.log(etc);
  });
});

// let url = '';

function savePost(url, data) {
  fetch(url, {
    Method: "POST",
    Headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    Body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status == 200) {
        console.log(success);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

  save.addEventListener('click',()=>{
    let check_data = [material, free_material];
    savePost(url,check_data);
  })
