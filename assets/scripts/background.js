// Глобальная переменная для хранения экземпляра
let bokehInstance = null;

async function initBokeh() {
  try {
    // Если уже есть экземпляр - очищаем
    if (bokehInstance) {
      bokehInstance.dispose?.();
      bokehInstance = null;
    }

    const { Bokeh1Background } = await import(
      "https://cdn.jsdelivr.net/npm/threejs-components@0.0.2/build/backgrounds/bokeh1.cdn.min.js"
    ).catch(async () => {
      console.warn("Primary CDN failed, trying backup");
      return await import(
        "https://unpkg.com/threejs-components@0.0.2/build/backgrounds/bokeh1.cdn.min.js"
      );
    });

    const canvas = document.getElementById("webgl-canvas");
    if (!canvas) throw new Error("Canvas not found");

    // Сбрасываем размеры canvas
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    bokehInstance = Bokeh1Background(canvas);

    const loader = new Image();
    loader.src =
      "https://cdn.jsdelivr.net/npm/threejs-components@0.0.2/build/assets/bokeh-particles2.png";
    await new Promise((resolve) => {
      loader.onload = resolve;
    });

    bokehInstance.loadMap(loader.src);
    bokehInstance.setColors([0x000000, 0x0000cd, 0x1e90ff, 0xff00ff]);

    // ОБРАБОТЧИК: проверяем, был ли клик по кнопке
    const handleClick = (e) => {
      // Если клик был по элементу с классом 'button' или его потомку - игнорируем
      if (e.target.closest(".button")) return;

      const colors = Array(3)
        .fill(0)
        .map(() => Math.random() * 0xffffff);
      requestAnimationFrame(() => bokehInstance.setColors(colors));
    };

    document.body.addEventListener("click", handleClick, { passive: true });
  } catch (error) {
    console.error("Bokeh initialization failed:", error);
    document.getElementById("webgl-canvas")?.remove();
  }
}

// Инициализация при загрузке и при возврате
function handlePageShow(event) {
  if (event.persisted) {
    setTimeout(initBokeh, 100);
  }
}

// Запуск при загрузке
window.addEventListener("load", () => {
  setTimeout(initBokeh, 50);
});

// Обработка возврата на страницу
window.addEventListener("pageshow", handlePageShow);

// Очистка при закрытии
window.addEventListener("beforeunload", () => {
  if (bokehInstance) {
    bokehInstance.dispose?.();
    bokehInstance = null;
  }
});