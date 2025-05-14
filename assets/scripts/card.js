document.addEventListener("DOMContentLoaded", function () {
  const card = document.querySelector(".card");
  const title = document.querySelector(".title");
  const speciality = document.querySelector(".speciality");
  const links = document.querySelector(".social-links");
  const body = document.body;

  // Функция для отключения обработки событий на небольших экранах
  function handleSmallScreen() {
    return window.innerWidth <= 1024;
  }

  // Анимация движения (работает только на больших экранах)
  body.addEventListener("mousemove", function (e) {
    if (!handleSmallScreen()) {
      const xAxis = (window.innerWidth / 2 - e.clientX) / 50;
      const yAxis = (window.innerHeight / 2 - e.clientY) / 50;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }
  });

  // Анимация при наведении (также отключается на малых экранах)
  body.addEventListener("mouseenter", function () {
    if (!handleSmallScreen()) {
      card.classList.toggle("has-transform");
      title.classList.toggle("has-transform");
      speciality.classList.toggle("has-transform");
      links.classList.toggle("has-transform");
    }
  });

  // Возвращает карточку в исходное положение, когда курсор полностью покидает тело страницы
  body.addEventListener("mouseleave", function () {
    if (!handleSmallScreen()) {
      card.classList.remove("has-transform");
      title.classList.remove("has-transform");
      speciality.classList.remove("has-transform");
      links.classList.remove("has-transform");
      card.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
  });
});