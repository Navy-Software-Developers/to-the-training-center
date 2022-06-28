import {Card} from './Card.js';

let data = [
    {
        'src':`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEX///+bWbbs8PGYUrTv9fOXT7OZVbXw9vSWTrPp6e+WTrKXUbOVS7Lu8/OcWrfr7fD48/rgzujg2+jSwt7c0+W3jMqqeMH7+Pywf8WiZbvz7Pbk4uukaryfYLnCpdK/n9Dq3e/WvuDJsteocL/XzOLFq9S/mNC2iMnj0+qvfcTHr9bu5PKsdsLOvNvWvuHRwN23kcrv3C3QAAAM7klEQVR4nO1da3uiOhBeCUlQCFQRKxXUesHW6pb//+uOl1YmJHjBRNzz5P20T9uFvJlkbskMf/4YGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYPBtevj6+1+NJFkV5lk1m393pS9NDUoXXt+5yFXue53SwixAhCCEXd5zdT+LVsvuP83ydLlep57ikJQdxHS+O/n41Pc6aeA1XsYOryBVAHTfJPpoe7e3oDolzmd2JpdPK/ymS0+wWej8kvXT51vTAr0T300M30jsC42ja9OCvwN/kZvEBQeJNt2kCF/Cedurz24N482fekN3Eu4veD8fhtGkiFfhaedfI7/LfECd7Skdg7FbrF0JcjLGD0zhJ5kna2v0TY1TN1fXfm6YjYJriKnYYpZt8GfZHAT2h3VtsJ8Ok5VTR9D6fzHSM5QqUYCeJtr02pTZjzAJgzLYpGy3GO89AKnvU+ts0KYCXTUdKzxuse8GOnFWFHU/WDvOWdH6cqGleJ3SJZIDInc/a9hl2J9i2Fa6IxD134yfxyccSE4HTrE+vYPcrS9peSzwFgp9C4UQCQeLEy/YN/I6StMKByNEbN03vz+tA0KHYnwX2bfSOHNliLsxW45vxLS0rQuQvWR1+ezAaxuUJczevTRL88kvriuCsTWvyO8jRWpbVFpo3SPErLY3Gmffv4bcH7Q2dEsWkMR+uTJDgpXWjfpGA2duSo4OShqT4VlqibtK7V4BH0NGc340NLdTXkgSdPLhfgEcwa1KiuGmC4YbXot62rgaVwd7ydgM3YDQibpaJf7eK4UH7fCDpPNz0L7k5RslI1Qr9BRslHEXvwQ5clyc4aKsmuKc45/YBfqgb/sJNL5qfjARTyJQFCaRI4kcy3ECG6POXFxv1Ru3AutXpBqT2cfFJY+0owve4D9Q2YxjwosHJSrCB5znpYBKO6pC0adALl5M8C04U+b3oPGwrTqFbReLTHmSLw+4kyPGjxY0cGQ2+V7HruAh5YSHFkQ+3Q+tRuRve1BdalH6efkHw4BaOjI4mrd9zKjIo/iPrQ5WGPh9DcAwtIemDCYejIV40utYHsEcZPOrwegVFuoVv8x6SnfpywSsx8GTsWcnVas2uSdPs9PCyxdkFNAFTY3MOnP+IMGMFRuPmwJOhq3ISAg9/9uheRR7ArCCwjv+2fzQw7SflqDfl/KM5eKyb6ScIbT1JoIxY0iqDkMU+mdjub5f5cJ6ifap7Dz8Z5svv/o6sHWTiWYADPSQ2ggLGU+0Mof5GPchwlAoMd4OdLKPY87CLuNidEORiz91kM0GAexohfC7dAt1NhroJvgMROmuoSlhPmvZGlfcU9uNFruzHLvdgyx6CR3i6D9+AfSIbXmHIGdYBp2r26xQ8mcz1EvwLvBnU508i+vXOtmUMMz4Uo0uwlD29p8RgF5aHoU+GO8TFL8lAJ8EuECEOLF0M3WWJoR2C7a9VnRZuWQuvy/Nc8iHvAP4uP5sCo4g0xhhTMJNxSYSWFcSSwdZj2C/7QmwBLAbW54BnhS7BM8HpBI73nXCE2dsFZsXD3aU2hkBZpm1hEPZSatxqIBazWnYIhJjqIghe4o7FQbBe1VH+jSC5LG8H1Lg2qw9cCzISh8ByRauURBKG9rpYISjXQxCkn8hKso5mikS424czCcU2mD9fD0OwSL2FEPixnjKXZrcJBGXKB2eOnmUK3pCK0TvbKDP4+7BMok3BDCMtYeJrYe5Er4r3Ou4HHksyIOD3iQ6GIMPmiYuIJQpFuIMrsUZAk7k6EuDAvxf9GbiElABNBGUDTWJHR0qq2IYSe8UFqUpAxJ040uubvhY5CiwcFXIxqhpI3EIG3EING/Gt0CSkJzjG6mzh6SVDYaHQSWGQPPVpRRAaJqISEBKJ98MX3CYYYDjqI/3CrZY4NIEszXYnnFBYKaPit1h9fFFISYjAd/6MUmN4BBJNIsjIEvWqprD3WJhce6t8G+6XimB06VCnqimkhAVFoy4yhBA9NxuqGtUEXwqGTvnFFs0Uet0FBLcGrhXlyvSrYOiLaly5vT9wEBiyBWA4Vczw46SoyUZkONDCUDS7IIug3Fx8n8yhxGeDuT6dDK028ExDxQzXp9mThE5UZWxYMBQjGFrIEM8UMxyftKVoDh+2Si0K4ifV18AKPY1nZ+2UQobiTTJa+E7Kw/zCHoiRhUUjPQzL77Fo4dQoZ1hwkDCEllgdsBjmA5WmPKN4nuFah0/jizEwlKFqxzQ/t0rZtw6/dC4QtCjIhqlmeHYfaoktJJ43x1CjphF1qRUoOzosILG7FvXBrxUzLHSJxB5aTIO5ECNgzuIrt4dFIkYSmVr2WL2qIZKL1UHhtSn3ac76pRbrq89EzUWCbFS8Rrlf2j0XW1j85TMlcCVLBU6k8jNEcISfSk/3VAvRFb1Si4WAoeq8PojxsexKZVuxDMlANo8gW6I+YXouT7MDHasVouSEcvcScDajPE9zNtd2gNKUKRnI7hfDOFR9bQLIl8rO9ix7oVKISLZOrHZxw5yslDMEOW/xROFAcazugE16QMrdK9Nwp6YwF5LjwyPFSJUU0VC6D+AhpYZzC6BMkeQewWGbRGqkiCRRxeH5MCGs4eYXUDUS3/soxYkKiu6mqk4MpINSDVWl0WkCyaqqkMIO/bujfWdVVYsKjmE1HMxw14N9Mb/wA9aO7mgTtR+6I579nqYP+N1rDQxBJQkIbBhljMIx0f4Q1ZYjwatRZS0qvIvhTDUw/ANyJPkvJ7bIh8N8BofFaH+S1hIkclaLc1U24E9jLcXd4ICJ/L603XIJQbiVwb3D7CDMiXeuDEFCz2tNeuf4/VTGHd+v55rwB7BGv7kaNj5WnLl+ny8gsFl/PUwJdmW9a0rYTRFJJosLzWxgUlaDNTwAjOnzd1nS/k+1rnBzebc/WW+xzD+T6tvRCDuOnwwnYY9erOWD0QvR1IGgyCiC6I0Fg6NsfUnWgTGb0iCrEuNmvD40yLKvKB+Glzu1lQZ9ALemKLZgwdHOV7lawaAyh5NuzzWRKj1nrn+RQreGu+1Cj2GFJ7v3agXzM7bDy64twuQu6xNdBOHlPQxzinR2eL0jSzzkZ91xT5IUlTME+Uo9t0sPeAOj5f2awxICRc/F1F+IN5zr2mmwPhCh8hQNQAQKLuBt/Z/wl8zLLuXlm8MyBSUC1nIQnfXOUyARBwrxZxGhhK9uhla6Au4165R7Tkdr8RqIXxDMDP+uRuKHwLCxa45OJRdJRYZAkRItN6BPgFXA3IX601E+XvX29s3eW8JeeIXj5nxfXKYUXu7saO6sACcT1pAWrQGIN1iH4XY2GSDnmrSGvEKGkyBXFaep1uKED1gHzFkMcEva3fcnPdOelEdyiaEdwXYE35oZwtIgLvNev8ASXWDIFXVp3oV7wLYfZA6bH6xrJmnQeVXDuAMDzVXAB2TAzcSwZsA+775UM6zMiRwZwlWD1CeCRbzAbY9DIEVWL5t4nqHNHYigh7RSgk0HWj70Rdnkqm7QtzC0Q0iw86COX59AtZEUOmp0UaMj+zmGNle1+bBWUW/c+AbcprG/h77jHj/UgeU9kG9gyEZct58HtP34wTvcb27E+SS2PVosJ3meZ5PZon+NQKsZsoA7PH/UGt0j4rrwlJ0S9tuAxg6uEWIlQ2YNuHZmD22eGHM9uCr9rvY9DJnFt2YkD21j+sWZPievcJ7vYcjanAQfYushOJPRwpG8NesdDO0RL0FPX5uBCvAnvu5AemBUn6Hd43umPbLh3i/4E1+U9iSxem2G9oI/E0BaW7ZUoaQHWqGob2oyZKx0d4XoOYm5hNdSJhRnQnq3HkPWHpYI+g19CuI1KVGcl1dqHYaMhnyDuuYI7sKMEkXiltpd12Bot/NShEL8Bj+RUF6oLWfD9RO+mSFj23If+wYleKC4KUW9xM1B2/kbGTLaFz5EgOKmP8ciRL3IGbd/Vc5NDJndE782hJv9cMAB4gc8cGv804T2BoaM9nLxXNxr+uMPB7yLnwDErby3v6FxNUPbXqwkVzge76rJ8RWLZ6DIHWwtel30FND2OpZ8KZGQ5/kImywFRRyUf1/1Ea/ZSpoc72ye6ctd7y2ZtNB16UXptRSioafAXXj7VFsY1ImnTVMS8NdXV1WCUPPfCJLgZXLFd1WvAfFWT/IpKwHTYZ2McBle8szfeJxu7uRIOk/4YUAe3U9c/xIt6STP9MW8KkwjXE/nIO/zeUz8ebwt45s/mLtzELJn1S9STHP/htW6ozdUXW33AHxkidu5zJJgJ47+2W+sf71HiedVmknidrw0Wk+bDwHvwkt3vafpOR3soiNc3Nn9wItXy/DtH2dX4GXa/Z6NsyyPomwynoUfX//qujQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMPg/4z/jMPNfD0JIIAAAAABJRU5ErkJggg==`,
        'contents':`Almost before we knew it, we had left the ground`,
        'subTitle':`github hello!`,
        'position':`left`
    },
    {
        'src':`https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA1MTJfMTkg%2FMDAxNjUyMzMyNzEyMjUy.sajr9AW0UUDfYdLVMDYhCJIQSJ-dgDYWcagkJnNqy8kg.7wDD5pp7SJ1wPZlvqNHVHZZX6m0DJ6VZ1hvdf7dlXTMg.PNG.wlsry3085%2F%25C1%25A6%25B8%25F1%25C0%25BB-%25C0%25D4%25B7%25C2%25C7%25D8%25C1%25D6%25BC%25BC%25BF%25E4_-001_%25283%2529.png&type=sc960_832`,
        'contents':`Google Tistory`,
        'subTitle':'google hello',
        'position':`left`
    },
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