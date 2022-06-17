class App{
    constructor(){

        window.addEventListener('resize',this.resize.bind(this));
        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        
    }

    animate(){

    }
}

window.onload = ()=>{
    new App();
}