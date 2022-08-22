 
const STAR_IMG = {
    "yes": "../mall/media/star/yesStar.svg",
    "no": "../mall/media/star/noStar.svg"
}
 

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


 

// review_stars.forEach((e,key)=>{
//     getReveiewStarPosition(e,(result)=>{
//         setReviewStar(e,result)
//         review_data[0].star[key] = result;
        
//     })
// }) 



 

export {getReveiewStarPosition,setReviewStar};