document.addEventListener("DOMContentLoaded", function () {
  const card = document.querySelector(".card");
  const title = document.querySelector(".title");
  const speciality = document.querySelector(".speciality");
  const links = document.querySelector(".social-links");
  const body = document.body;

  let preloaderCompleted = false;
  let firstMoveDetected = false;

  function handleSmallScreen() {
    return window.innerWidth <= 1024;
  }

  // Функция инициализации эффектов
  function initEffects() {
    if (!handleSmallScreen()) {
      // Добавляем will-change для оптимизации
      card.style.willChange = "transform";
      title.style.willChange = "transform";
      speciality.style.willChange = "transform";
      links.style.willChange = "transform";

      // Принудительное создание слоя для Safari
      card.style.transform = "translateZ(0)";
      title.style.transform = "translateZ(0)";
      speciality.style.transform = "translateZ(0)";
      links.style.transform = "translateZ(0)";

      // Даём время на создание слоёв
      requestAnimationFrame(() => {
        card.classList.add("has-transform");
        title.classList.add("has-transform");
        speciality.classList.add("has-transform");
        links.classList.add("has-transform");
      });
    }
  }

  // Оптимизированная анимация движения
  function setupMouseMoveAnimation() {
    let lastTime = 0;
    const throttleDelay = 16; // ~60fps

    body.addEventListener("mousemove", function (e) {
      const now = Date.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      if (!handleSmallScreen()) {
        const xAxis = (window.innerWidth / 2 - e.clientX) / 50;
        const yAxis = (window.innerHeight / 2 - e.clientY) / 50;

        // Используем requestAnimationFrame для плавности
        requestAnimationFrame(() => {
          card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
      }
    });
  }

  // Возвращение карты в исходное состояние после анимации при загрузке страницы
  card.addEventListener("animationend", function () {
    this.classList.add("animation-complete");
  });

  // Первое движение мыши
  function onFirstMouseMove() {
    if (!firstMoveDetected && preloaderCompleted) {
      firstMoveDetected = true;
      initEffects();
      setupMouseMoveAnimation();
      body.removeEventListener("mousemove", onFirstMouseMove);
    }
  }

  // Завершение прелоадера
  setTimeout(function () {
    preloaderCompleted = true;
    body.addEventListener("mousemove", onFirstMouseMove);
  }, 1800);

  // Оптимизированные обработчики hover
  body.addEventListener("mouseenter", function () {
    if (!handleSmallScreen() && firstMoveDetected) {
      requestAnimationFrame(() => {
        card.classList.add("has-transform");
        title.classList.add("has-transform");
        speciality.classList.add("has-transform");
        links.classList.add("has-transform");
      });
    }
  });

  body.addEventListener("mouseleave", function () {
    if (!handleSmallScreen() && firstMoveDetected) {
      requestAnimationFrame(() => {
        card.classList.remove("has-transform");
        title.classList.remove("has-transform");
        speciality.classList.remove("has-transform");
        links.classList.remove("has-transform");
        card.style.transform = "rotateY(0deg) rotateX(0deg)";
      });
    }
  });
});