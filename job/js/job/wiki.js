const wiki =document.querySelector('.wiki');
const save_wiki = document.querySelector('.save_wiki');
const wiki_box = document.querySelector('.wiki_type_box');
const wiki_command = document.querySelector('.wiki_command')

let wiki_text = null;
let wiki_url = 'url을 입력해주십시오';
 


//"위키 작성하기" 버튼을 클릭했을때
wiki.onclick = ()=>{
    wiki_box.style.display = 'block';
    wiki.style.display = 'none';
}
 

save_wiki.onclick = ()=>{
    wiki_box.style.display = 'none';
    wiki.style.display = 'flex'
    let wiki_text = wiki_command.value; //작성한 글 내용 가져오기

    alert(wiki_text);
 
    let post_data = {
        methos:'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body:{
            text:wiki_text
        }
    
    };


    fetch(url, post_data)
    .then((response)=>{response.json()})
    .catch(err=>{console.log(err)});
    
}