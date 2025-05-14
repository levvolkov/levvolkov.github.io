// Полифил для requestAnimationFrame
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

// Получаем canvas по классу (первый элемент с этим классом)
var canvas = document.querySelector(".particles-canvas");
var context = canvas.getContext("2d");

let dpi = window.devicePixelRatio || 1;
context.scale(dpi, dpi);

function fix_dpi() {
  let style_height = +getComputedStyle(canvas)
    .getPropertyValue("height")
    .slice(0, -2);
  let style_width = +getComputedStyle(canvas)
    .getPropertyValue("width")
    .slice(0, -2);

  canvas.setAttribute("height", style_height * dpi);
  canvas.setAttribute("width", style_width * dpi);
}

// Инициализация размеров canvas
function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  fix_dpi();
}
window.addEventListener("resize", initCanvas);
initCanvas();

var particle_count = 90,
  particles = [],
  couleurs = ["#778899", "#778899", "#778899"];

function Particle() {
  this.radius = Math.round(Math.random() * 3 + 5);
  this.x = Math.floor(
    Math.random() * (canvas.width - this.radius * 2) + this.radius
  );
  this.y = Math.floor(
    Math.random() * (canvas.height - this.radius * 2) + this.radius
  );
  this.color = couleurs[Math.floor(Math.random() * couleurs.length)];
  this.speedx = Math.round(Math.random() * 201 + 0) / 100;
  this.speedy = Math.round(Math.random() * 201 + 0) / 100;

  switch (Math.round(Math.random() * couleurs.length)) {
    case 1:
      this.speedx *= 1;
      this.speedy *= 1;
      break;
    case 2:
      this.speedx *= -1;
      this.speedy *= 1;
      break;
    case 3:
      this.speedx *= 1;
      this.speedy *= -1;
      break;
    case 4:
      this.speedx *= -1;
      this.speedy *= -1;
      break;
  }

  this.move = function () {
    context.beginPath();
    context.globalCompositeOperation = "source-over";
    context.fillStyle = this.color;
    context.globalAlpha = 1;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();

    this.x = this.x + this.speedx;
    this.y = this.y + this.speedy;

    if (this.x <= 0 + this.radius) {
      this.speedx *= -1;
    }
    if (this.x >= canvas.width - this.radius) {
      this.speedx *= -1;
    }
    if (this.y <= 0 + this.radius) {
      this.speedy *= -1;
    }
    if (this.y >= canvas.height - this.radius) {
      this.speedy *= -1;
    }

    for (var j = 0; j < particle_count; j++) {
      var particleActuelle = particles[j],
        yd = particleActuelle.y - this.y,
        xd = particleActuelle.x - this.x,
        d = Math.sqrt(xd * xd + yd * yd);

      if (d < 200) {
        context.beginPath();
        context.globalAlpha = (200 - d) / (200 - 0);
        context.globalCompositeOperation = "destination-over";
        context.lineWidth = 1;
        context.moveTo(this.x, this.y);
        context.lineTo(particleActuelle.x, particleActuelle.y);
        context.strokeStyle = this.color;
        context.lineCap = "round";
        context.stroke();
        context.closePath();
      }
    }
  };
}

// Создаем частицы
for (var i = 0; i < particle_count; i++) {
  var particle = new Particle();
  particles.push(particle);
}

function animate() {
  fix_dpi();
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < particle_count; i++) {
    particles[i].move();
  }
  requestAnimFrame(animate);
}

// Запускаем анимацию
animate();