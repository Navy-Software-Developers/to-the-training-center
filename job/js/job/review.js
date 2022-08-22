const review_stars = document.querySelectorAll('.review_star')
const evaluations = document.querySelectorAll('.evaluation');
const save_evaluation = document.querySelector('.save_evaluation');
const STAR_IMG = {
    "yes": "../mall/media/star/yesStar.svg",
    "no": "../mall/media/star/noStar.svg"
}

// 평가항목저장
let review_data = [
    {
        "star":new Array(5).fill(0)
    },
    {
      "review_comments":new Array(3)
    }
]
 

//리뷰 별 개수 설정해주는 함수  
function setReviewStar(review_star_parent, review_star_count) {
    for(let i = 0; i< 5; i++){
        review_star_parent.children[i].src = STAR_IMG.no;
    }
    for (let i = 0; i < review_star_count; i++) {
        review_star_parent.children[i].src = STAR_IMG.yes;
    }
    
}

//to do : 몇번 째 별인지 인식 하는 함수 만들기 
function getReveiewStarPosition(review_star_parent,callback) {
    for (let i = 0; i < review_star_parent.children.length; i++) {
        review_star_parent.children[i].addEventListener('mouseover', (e) => {
            callback(i+1);
        })
    }
    
}



review_stars.forEach((e,key)=>{
    getReveiewStarPosition(e,(result)=>{
        setReviewStar(e,result)
        review_data[0].star[key] = result;
        
    })
}) 



// test evaluation write
save_evaluation.onclick = ()=>{
    evaluations.forEach((e,i)=>{
        review_data[1].review_comments[i] = e.value;
    })


    // 별개수 , 리뷰 데이터 
    // console.log(review_data[0],review_data[1]);
    alert('등록이 완료되었습니다!');
}