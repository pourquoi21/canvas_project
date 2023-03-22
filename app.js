const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

// ctx.rect(50, 50, 100, 100);
// ctx.rect(150, 150, 100, 100);
// ctx.stroke();

// ctx.beginPath();
// // beginPath를 통해 새로운 '경로'를 시작할 수 있음.
// ctx.rect(250, 250, 100, 100);
// ctx.fillStyle = "red";
// // fillStyle은 모든 '경로'에 영향을 미쳐버린다.
// ctx.fill();
// ctx.beginPath();
// ctx.rect(350, 350, 100, 100);
// ctx.fillStyle = "black";
// ctx.fill();

// // 선긋기
// ctx.moveTo(450, 450);
// ctx.lineTo(550, 450);
// ctx.lineTo(550, 550);
// ctx.lineTo(450, 550);
// ctx.lineTo(450, 450);
// ctx.stroke();

// // shortcut
// ctx.fillStyle = "blue";
// ctx.fillRect(550, 550, 100, 100);

// make a house
ctx.fillStyle = "black";
ctx.fillRect(650, 650, 5, 100);
ctx.fillRect(750, 650, 5, 100);
ctx.lineWidth = 3;
ctx.fillRect(687, 700, 30, 50);
ctx.fillRect(650, 650, 100, 5);

ctx.moveTo(650, 650);
ctx.lineTo(702, 600);
ctx.lineTo(754, 650);
ctx.fill();

// draw a person
ctx.beginPath();
ctx.fillRect(240, 200, 15, 100);
ctx.fillRect(325, 200, 15, 100);
ctx.fillRect(260, 200, 60, 150);

ctx.arc(290, 170, 20, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.arc(280, 168, 3, 1 * Math.PI, 2 * Math.PI);
ctx.arc(300, 168, 3, 1 * Math.PI, 2 * Math.PI);
ctx.fillStyle = "white";
ctx.fill();

ctx.beginPath();
ctx.arc(290, 172, 9, 0, 1 * Math.PI);
ctx.strokeStyle = "white";
ctx.lineWidth = 2;
ctx.stroke();

const colors = [
  "#ff3838",
  "#ffb8b8",
  "#c56cf0",
  "#ff9f1a",
  "#fff200",
  "#32ff7e",
  "#7efff5",
];

function onMove(event) {
  const { offsetX, offsetY } = event;
  // console.log(offsetX, offsetY);
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.fillRect(offsetX, offsetY, 2, 2);
}

canvas.addEventListener("mousemove", onMove);

ctx.fillStyle = "red";
ctx.beginPath();
ctx.fillRect(500, 500, 10, 10);
