
//one ~ four , 이병 ~ 병장

const SALARY = {
    "one":510100,
    "two":552100,
    "three":610200,
    "four":676100
};

//진급 기간
let promotion_period = {
    "one":2,
    "two":6,
    "three":6
    
}
//육(해병) 해 공 순서
let mili = [4,6,8];


//육, 해 , 공 순서로 최대 넣을수 있는기간으로 표시
let saving = [18,18,22];




const salary_info = document.querySelectorAll('.salary');

salary_info[0].textContent = `${SALARY.one.toLocaleString()}원`;
salary_info[1].textContent = `${SALARY.two.toLocaleString()}원`;
salary_info[2].textContent = `${SALARY.three.toLocaleString()}원`;
salary_info[3].textContent = `${SALARY.four.toLocaleString()}원`;

const saving_sel = document.querySelector('.saving_sel');
let save_price = 0;

saving_sel.onclick = ()=>{
    if(saving_sel.value === ''){
        return ;
    }

    save_price = Number(saving_sel.value);
 
}


