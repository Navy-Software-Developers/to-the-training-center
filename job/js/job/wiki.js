const wiki = document.querySelector(".wiki");
const save_wiki = document.querySelector(".save_wiki");
const wiki_box = document.querySelector(".wiki_type_box");
const wiki_command = document.querySelector(".wiki_command");
const wiki_content = document.querySelector('#wiki_content');

let wiki_text = null;
let wiki_url = "url을 입력해주십시오";

//"위키 작성하기" 버튼을 클릭했을때
wiki.onclick = () => {
  wiki_box.style.display = "block";
  wiki_box.value = wiki_content.innerText;
  wiki_content.style.display = 'none';
  wiki.style.display = "none";
  
};

save_wiki.onclick = () => {
  wiki_box.style.display = "none";
  wiki.style.display = "flex";
  wiki_content.style.display = 'block';
  wiki_content.textContent = wiki_command.value;
  let wiki_text = wiki_command.value; //작성한 글 내용 가져오기

  alert(wiki_text);

  let post_data = {
    methos: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      text: wiki_text,
    },
  };

  fetch(url, post_data)
    .then((response) => {
      response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

const search_bar = document.querySelector(".search_bar");
const search_input = document.querySelector(".search_input");
const search_close = document.querySelector(".search_close"); //flex
const autocomplete = document.querySelector(".autocomplete");

search_bar.onclick = () => {
  search_bar.style.display = "none";
  search_input.style.display = "block";
  search_close.style.display = "flex";
};

search_close.onclick = () => {
  search_bar.style.display = "block";
  search_input.style.display = "none";
  search_close.style.display = "none";
  autocomplete.style.display = "none";
};

//키보드 입력이 들어올때 마다 일어나는 이벤트
search_input.onkeydown = () => {
  //키보드 입력시 발생할 이벤트 작성
  autocomplete.style.display = "block";
};
