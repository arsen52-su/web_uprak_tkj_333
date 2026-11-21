document.addEventListener("DOMContentLoaded", () => {
  /* 1. LOADING SCREEN */
  const loadingScreen = document.getElementById("loading-screen");
  
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loadingScreen) loadingScreen.classList.add("hidden");
    }, 400);
  });

  setTimeout(() => {
    if (loadingScreen && !loadingScreen.classList.contains("hidden")) {
      loadingScreen.classList.add("hidden");
    }
  }, 1500);

  /* 2. LOADING SAAT PINDAH HALAMAN */
  const internalLinks = document.querySelectorAll('a[href$=".html"], a[href^="index.html"]');
  internalLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      const targetUrl = this.getAttribute("href");
      if (!targetUrl || targetUrl.startsWith("#")) return;

      e.preventDefault();
      if (loadingScreen) {
        loadingScreen.classList.remove("hidden");
        const subtitle = loadingScreen.querySelector(".loader-subtitle");
        if (subtitle) subtitle.textContent = "Diving to next stage...";
      }

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 400);
    });
  });

  /* 3. EFEK KLIK / RIPPLE AIR */
  document.addEventListener("click", (e) => {
    if (e.target.closest("#theme-toggle")) return;
    const ripple = document.createElement("div");
    ripple.className = "click-ripple";
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });

  /* 4. THEME TOGGLE */
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlEl.getAttribute("data-theme");
      const nextTheme = currentTheme === "day" ? "night" : "day";
      htmlEl.setAttribute("data-theme", nextTheme);
      if (themeLabel) themeLabel.textContent = nextTheme === "night" ? "Night" : "Day";
    });
  }

  /* 5. PROCEDURAL BUBBLES */
  const bubblesLayer = document.getElementById("bubbles-layer");
  if (bubblesLayer) {
    for (let i = 0; i < 20; i++) {
      const bubble = document.createElement("span");
      bubble.className = "ocean-bubble";
      bubble.style.width = `${Math.random() * 15 + 5}px`;
      bubble.style.height = bubble.style.width;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDuration = `${Math.random() * 8 + 8}s`;
      bubble.style.animationDelay = `${Math.random() * 10}s`;
      bubblesLayer.appendChild(bubble);
    }
  }
});
