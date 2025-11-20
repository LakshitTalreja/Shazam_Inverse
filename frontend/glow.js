const root = document.documentElement;
const cursor = document.getElementById("cursor");

// smooth glow movement
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
let gx = mx, gy = my;
const ease = 0.18;

window.addEventListener("mousemove", e => {
    mx = e.clientX;
    my = e.clientY;

    // move glowing dot
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
});

function loop(){
    gx += (mx - gx) * ease;
    gy += (my - gy) * ease;

    // update glow background
    root.style.setProperty("--gx", gx + "px");
    root.style.setProperty("--gy", gy + "px");

    requestAnimationFrame(loop);
}
loop();

// click shrink
document.addEventListener("mousedown", () => {
    cursor.style.width = "8px";
    cursor.style.height = "8px";
});
document.addEventListener("mouseup", () => {
    cursor.style.width = "14px";
    cursor.style.height = "14px";
});

// grow ball inside artists section
const wrap = document.querySelector(".artists-wrap");

wrap.addEventListener("mouseenter", () => {
    cursor.style.width = "28px";
    cursor.style.height = "28px";
});

wrap.addEventListener("mouseleave", () => {
    cursor.style.width = "14px";
    cursor.style.height = "14px";
});
