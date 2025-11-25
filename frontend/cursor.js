// Cursor trail functionality
const cursor = document.getElementById("cursor");
const trail = document.getElementById("trail");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let trailX = mouseX;
let trailY = mouseY;

const ease = 0.07;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
});

document.addEventListener("mousedown", () => {
    cursor.style.width = "8px";
    cursor.style.height = "8px";
    trail.style.width = "8px";
    trail.style.height = "8px";
});

document.addEventListener("mouseup", () => {
    cursor.style.width = "12px";
    cursor.style.height = "12px";
    trail.style.width = "12px";
    trail.style.height = "12px";
});

function animate() {
    trailX += (mouseX - trailX) * ease;
    trailY += (mouseY - trailY) * ease;

    trail.style.left = trailX + "px";
    trail.style.top = trailY + "px";

    requestAnimationFrame(animate);
}
animate();
