// 1. Асинхронная загрузка с обработкой ошибок
async function initBokeh() {
  try {
    // 2. Динамический импорт с fallback
    const { Bokeh1Background } = await import(
      "https://cdn.jsdelivr.net/npm/threejs-components@0.0.2/build/backgrounds/bokeh1.cdn.min.js"
    ).catch(async () => {
      console.warn("Primary CDN failed, trying backup");
      return await import(
        "https://unpkg.com/threejs-components@0.0.2/build/backgrounds/bokeh1.cdn.min.js"
      );
    });

    // 3. Безопасная инициализация
    const canvas = document.getElementById("webgl-canvas");
    if (!canvas) throw new Error("Canvas not found");

    const bokeh = Bokeh1Background(canvas);

    // 4. Предзагрузка ресурсов
    const loader = new Image();
    loader.src =
      "https://cdn.jsdelivr.net/npm/threejs-components@0.0.2/build/assets/bokeh-particles2.png";
    await new Promise((resolve) => {
      loader.onload = resolve;
    });

    // 5. Инициализация с защитой
    bokeh.loadMap(loader.src);
    bokeh.setColors([0x000000, 0x0000cd, 0x1e90ff, 0xff00ff]);

    // 6. Оптимизированный обработчик клика
    const handleClick = () => {
      const colors = Array(3)
        .fill(0)
        .map(() => Math.random() * 0xffffff);
      requestAnimationFrame(() => bokeh.setColors(colors));
    };

    document.body.addEventListener("click", handleClick, { passive: true });

    // 7. Очистка при unmount (если используется SPA)
    window.addEventListener("beforeunload", () => {
      document.body.removeEventListener("click", handleClick);
      bokeh.dispose?.();
    });
  } catch (error) {
    console.error("Bokeh initialization failed:", error);
    // 8. Graceful degradation
    document.getElementById("webgl-canvas")?.remove();
  }
}

// 9. Задержка для параллельной загрузки ресурсов
setTimeout(initBokeh, 50);