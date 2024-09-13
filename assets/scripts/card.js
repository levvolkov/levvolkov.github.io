const $card = document.querySelector(".card");

const cumulativeOffset = (element) => {
  let top = 0,
    left = 0;
  do {
    top += element.offsetTop || 0;
    left += element.offsetLeft || 0;
    element = element.offsetParent;
  } while (element);

  return {
    top: top,
    left: left,
  };
};

if (window.innerWidth > 940) {
  // Только для экранов шириной больше 940px
  document.onmousemove = (event) => {
    const e = event || window.event;
    const x = (e.pageX - cumulativeOffset($card).left - 350 / 2) * -0.01;
    const y = (e.pageY - cumulativeOffset($card).top - 350 / 2) * -0.01;

    const matrix = [
      [1, 0, 0, -x * 0.00005],
      [0, 1, 0, -y * 0.00005],
      [0, 0, 1, 1],
      [0, 0, 0, 1],
    ];

    $card.style.transform = `matrix3d(${matrix.toString()})`;
  };
} else {
  console.log("Ширина экрана 940px или меньше: обработчик отключён.");
}