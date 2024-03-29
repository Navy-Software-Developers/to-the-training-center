const nav_bar = document.querySelector("#navbar");
let wheel = 0;

window.document.onmousewheel = (e) => {
  wheel += e.deltaY * -0.01;
  wheel = Math.min(Math.max(wheel, -2.5), 0);
  if (wheel == 0) {
    nav_bar.style.transform = `translate(0px,0px)`;
  } else if (wheel == -2.5) {
    nav_bar.style.transform = `translate(0px,-${nav_bar.clientHeight}px)`;
  }
};
