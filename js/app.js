import {Card} from './Card.js';

let data = [
  
    {
        'src':`https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA1MTJfMTkg%2FMDAxNjUyMzMyNzEyMjUy.sajr9AW0UUDfYdLVMDYhCJIQSJ-dgDYWcagkJnNqy8kg.7wDD5pp7SJ1wPZlvqNHVHZZX6m0DJ6VZ1hvdf7dlXTMg.PNG.wlsry3085%2F%25C1%25A6%25B8%25F1%25C0%25BB-%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4_-001_%25283%2529.png&type=sc960_832`,
        'contents':`Google Tistory`,
        'subTitle':'google hello',
        'position':`right`
    },
    {
        'src':`https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA1MTJfMTkg%2FMDAxNjUyMzMyNzEyMjUy.sajr9AW0UUDfYdLVMDYhCJIQSJ-dgDYWcagkJnNqy8kg.7wDD5pp7SJ1wPZlvqNHVHZZX6m0DJ6VZ1hvdf7dlXTMg.PNG.wlsry3085%2F%25C1%25A6%25B8%25F1%25C0%25BB-%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4_-001_%25283%2529.png&type=sc960_832`,
        'contents':`Google Tistory`,
        'subTitle':'google hello',
        'position':`right`
    },
    {
        'src':'https://lh3.googleusercontent.com/p76gesBbjuqG9aEuAGVyLqRaruEDkYWSknlPgpXGzyO_jdaFloqZ2g53irnxJMD0eNOqbDFTTghaHtN11G_9zFtReyeYFHiVfv-8EofF=w420',
        'contents':'출발',
        'subTitle':'출발 해봅시다',
        'position':'right'
    }
   
];





class App{
    constructor(){
        this.main = document.getElementById('main');
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.cardElement = 'undefined';
        this.load = document.querySelector('.load');



        this.itemBar = document.querySelectorAll('.item_bar');
        
    
        console.log(this.itemBar[0])

       this.card = new Array();
      

       for(let i =0 ; i < data.length ;i++){
          if(data[i].position == 'left'){
            this.card.push(new Card(this.itemBar[0],data[i].subTitle,data[i].contents,data[i].src,data[i].position));
          }else if(data[i].position == 'right'){
            this.card.push(new Card(this.itemBar[1],data[i].subTitle,data[i].contents,data[i].src,data[i].position));
          }
       }
        

        

        window.addEventListener('resize',this.resize.bind(this));
        this.resize();
        window.requestAnimationFrame(this.animate.bind(this));


        this.update();
    }


    update(){
        for(let i =0 ; i <this.card.length; i++ ){
            this.card[i].create();
        }

        this.cardElement = document.querySelectorAll('.card');

        for(let j =0 ; j < this.card.length;j++){
            this.card[j].pointLine(this.ctx, this.cardElement[j],this.load);
        }
    }

    resize(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        for(let i =0 ;i  < this.card.length; i++){
            this.card[i].pointLine(this.ctx, this.cardElement[i],this.load);
        }
    }

    animate(){
        window.requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = ()=>{
   new App();
}