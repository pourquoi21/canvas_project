const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

const lineWidth = document.getElementById("line-width");
ctx.lineWidth = lineWidth.value;

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

let isPainting = false;
ctx.fillStyle = "black";
ctx.strokeStyle = "black";

function onMove(event) {
  const { offsetX, offsetY } = event;
  // console.log(ctx.fillStyle);
  // onMove함수에 ctx.beginPath()를 쓰면 선이 안 그어진다. 왜일까?
  if (isPainting) {
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    return;
    // return을 해준 이유는 React에서 cleanup을 하는 이유와 비슷한 걸까?
    // 확실히, return을 안 해주면..
    // 이 함수가 뭔가 memory leak을 일으킬 것 같은(?)느낌이 들긴 한다.
    // 이것도 chatGPT한테 물어봄: 얘가 자꾸 말을 바꾼다 ㅡㅡ
    // 결론은 performance of the function을 위해서라는 거 같음.
  }

  // 나는 강의랑 조금 다른 방향으로 했었기 때문에
  // beginPath를 startPatinting에 넣어서 시작해줬었는데,
  // 강의에서는 lineWidth관련해서 모든 선의 width가 변하는 문제를
  // 여기 moveTo위에 beginPath를 함으로써 해결하더라.
  // 어디에 beginPath를 넣는게 더 올바른지는 잘 모르겠다.
  // 그리고 난 처음에 beginPath를 onMove의 상단에 넣으려고 했었음.
  // 그러나 그러면 작동하지 않는다.
  // 먼저 if문을 통해서 지금 그리고 있는가? 를 판단한 후에
  // path를 begin해야하기 때문이겠지?
  // 그렇지만 일단 isPainting === "true"이면 거기서 beginPath 해줘도 될것같은데..

  // 의외의 사실: chatGPT는 beginPath를 startPainting 안에 두기를 추천했다!
  // 왜냐하면 매번 beginPath를 하는것보다 그쪽이 효율적이기 때문이라고 함.
  // 근데 chatGPT도 실수를 하기 때문에.. 사실 완전히 수용하기는 어려움

  // 난 다만 왜 beginPath를 if안에 넣을 수 없는지가 의문
  // ctx.beginPath();

  // 왜 if문을 먼저 쓰고 moveTo를 썼을까...
  // moveTo를 위에 올려봤는데 선이 안 그어진다.
  // beginPath를 moveTo위에 써도 마찬가지.
  // 상단에서 strokeStyle을 지정해주었기 때문에
  // mouseDown에서 color를 제외해도
  // 선은 그어지는데, moveTo와 if순서를 바꾸면 안됨.
  // 왜???

  // chatGPT한테 물어봤음: moveTo를 위로 올리면, 마우스다운이든 아니든,
  // moveTo만 일단 열심히 수행하기 때문이라고함.
  ctx.moveTo(offsetX, offsetY);
}

function startPainting() {
  isPainting = true;
  // 여기서 beginPath를 해준 이유는,
  // 매 mouseDown마다 새로운 색의 선을 그어주고 싶어서.
  // 아예 함수보다 더 위에 beginPath와 color를 적어주면 색이 변하지 않음..
  // ctx.beginPath();
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.strokeStyle = color;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
// document.addEventListener("mouseup", cancelPainting); 도 작동한다.

lineWidth.addEventListener("change", onLineWidthChange);

ctx.fillStyle = "red";
ctx.beginPath();
ctx.fillRect(500, 500, 10, 10);
