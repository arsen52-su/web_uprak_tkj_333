/* ==================================================
   OCEAN DREAM — SCRIPT INTERAKTIF & LOADING PERPINDAHAN HALAMAN
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --------------------------------------------------
     1. LOADING SCREEN SAAT PERTAMA KALI DIBUKA
     -------------------------------------------------- */
  const loadingScreen = document.getElementById("loading-screen");
  const loaderBubbles = document.getElementById("loader-bubbles");

  if (loaderBubbles && !prefersReducedMotion) {
    createBubbles(loaderBubbles, 14, 6, 18);
  }

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.classList.add("hidden");
      }
    }, 500);
  });

  setTimeout(() => {
    if (loadingScreen && !loadingScreen.classList.contains("hidden")) {
      loadingScreen.classList.add("hidden");
    }
  }, 2000);

  /* --------------------------------------------------
     2. LOADING SCREEN SAAT KLIK MENU / PINDAH MATERI
     -------------------------------------------------- */
  const internalLinks = document.querySelectorAll('a[href$=".html"], a[href^="index.html"]');
  
  internalLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      const targetUrl = this.getAttribute("href");
      
      // Jangan jalankan jika link nya kosong atau anchor di halaman yang sama
      if (!targetUrl || targetUrl.startsWith("#") || this.target === "_blank") return;

      e.preventDefault(); // Tahan navigasi sebentar untuk memunculkan loading

      if (loadingScreen) {
        loadingScreen.classList.remove("hidden");
        const subtitle = loadingScreen.querySelector(".loader-subtitle");
        if (subtitle) subtitle.textContent = "Diving to next stage...";
      }

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 450); // Jeda 0.45 detik agar efek loading-nya terasa mulus
    });
  });

  /* --------------------------------------------------
     3. EFEK KLIK / SENTUH (RIOS / RAK AIR)
     -------------------------------------------------- */
  document.addEventListener("click", (e) => {
    // Jangan buat efek jika klik pada elemen input atau tombol khusus toggle
    if (e.target.closest("button") && e.target.closest("#theme-toggle")) return;

    const ripple = document.createElement("div");
    ripple.className = "click-ripple";
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 700);
  });

  /* --------------------------------------------------
     4. DAY & NIGHT ATMOSPHERE TOGGLE
     -------------------------------------------------- */
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");

  const savedTheme = localStorage.getItem("ocean-dream-theme");
  if (savedTheme === "night" || savedTheme === "day") {
    htmlEl.setAttribute("data-theme", savedTheme);
    if (themeLabel) themeLabel.textContent = savedTheme === "night" ? "Night" : "Day";
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlEl.getAttribute("data-theme");
      const nextTheme = currentTheme === "day" ? "night" : "day";
      htmlEl.setAttribute("data-theme", nextTheme);
      localStorage.setItem("ocean-dream-theme", nextTheme);
      if (themeLabel) {
        themeLabel.textContent = nextTheme === "night" ? "Night" : "Day";
      }
    });
  }

  /* --------------------------------------------------
     5. PROCEDURAL BUBBLES & PARTICLES
     -------------------------------------------------- */
  const bubblesLayer = document.getElementById("bubbles-layer");
  const particlesLayer = document.getElementById("particles-layer");

  function createBubbles(container, count, minSize, maxSize) {
    if (!container) return;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const bubble = document.createElement("span");
      bubble.className = "ocean-bubble";
      const size = Math.random() * (maxSize - minSize) + minSize;
      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 9;
      const delay = Math.random() * 12;
      const drift = (Math.random() - 0.5) * 90;
      const opacity = (Math.random() * 0.4 + 0.2).toFixed(2);

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.setProperty("--duration", `${duration}s`);
      bubble.style.animationDelay = `${delay}s`;
      bubble.style.setProperty("--drift", `${drift}px`);
      bubble.style.setProperty("--max-opacity", opacity);
      fragment.appendChild(bubble);
    }
    container.appendChild(fragment);
  }

  function createParticles(container, count) {
    if (!container) return;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("span");
      dot.className = "luminous-particle";
      const size = Math.random() * 3.5 + 1.5;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = Math.random() * 4 + 3;
      const delay = Math.random() * 5;
      const driftX = (Math.random() - 0.5) * 40;
      const driftY = (Math.random() - 0.5) * 40;

      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.left = `${left}%`;
      dot.style.top = `${top}%`;
      dot.style.setProperty("--duration", `${duration}s`);
      dot.style.animationDelay = `${delay}s`;
      dot.style.setProperty("--drift-x", `${driftX}px`);
      dot.style.setProperty("--drift-y", `${driftY}px`);
      fragment.appendChild(dot);
    }
    container.appendChild(fragment);
  }

  if (!prefersReducedMotion && bubblesLayer) {
    createBubbles(bubblesLayer, isMobile ? 12 : 25, 5, 20);
    createParticles(particlesLayer, isMobile ? 15 : 35);
  }
});
