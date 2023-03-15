const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.rect(50, 50, 100, 100);
ctx.rect(150, 150, 100, 100);
ctx.stroke();

ctx.beginPath();
// beginPath를 통해 새로운 '경로'를 시작할 수 있음.
ctx.rect(250, 250, 100, 100);
ctx.fillStyle = "red";
// fillStyle은 모든 '경로'에 영향을 미쳐버린다.
ctx.fill();
ctx.beginPath();
ctx.rect(350, 350, 100, 100);
ctx.fillStyle = "black";
ctx.fill();
