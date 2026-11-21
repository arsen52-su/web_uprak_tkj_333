/* ==================================================
   OCEAN DREAM — INTERACTIVE ENGINE & ANIMATION CONTROLLER
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --------------------------------------------------
     1. LOADING SCREEN CONTROLLER
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
    }, 650);
  });

  // Fallback jika load event terlewat
  setTimeout(() => {
    if (loadingScreen && !loadingScreen.classList.contains("hidden")) {
      loadingScreen.classList.add("hidden");
    }
  }, 2500);

  /* --------------------------------------------------
     2. DAY & NIGHT ATMOSPHERE TOGGLE
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
     3. PROCEDURAL BUBBLES & LUMINOUS PARTICLES
     -------------------------------------------------- */
  const bubblesLayer = document.getElementById("bubbles-layer");
  const particlesLayer = document.getElementById("particles-layer");
  const footerBubbles = document.getElementById("footer-bubbles");

  function createBubbles(container, count, minSize, maxSize) {
    if (!container) return;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const bubble = document.createElement("span");
      bubble.className = "ocean-bubble";

      const size = Math.random() * (maxSize - minSize) + minSize;
      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 9; // 9s - 19s
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

      if (size > 16) {
        bubble.style.filter = "blur(1px)";
      }

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

  if (!prefersReducedMotion) {
    const bubbleCount = isMobile ? 14 : 30;
    const particleCount = isMobile ? 18 : 42;
    createBubbles(bubblesLayer, bubbleCount, 5, 22);
    createParticles(particlesLayer, particleCount);
    createBubbles(footerBubbles, isMobile ? 8 : 16, 4, 14);
  }

  /* --------------------------------------------------
     4. NAVBAR STICKY BLUR & MOBILE MENU
     -------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }
  }, { passive: true });

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }

  /* --------------------------------------------------
     5. MULTI-LAYER PARALLAX SCROLLING & MOUSE PARALLAX
     -------------------------------------------------- */
  const parallaxLayers = document.querySelectorAll(".parallax-layer");
  const editorialParallax = document.getElementById("editorial-parallax");

  let scrollY = window.scrollY;
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  }, { passive: true });

  if (!isMobile && !prefersReducedMotion) {
    window.addEventListener("mousemove", (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  function animateParallax() {
    if (!prefersReducedMotion) {
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      parallaxLayers.forEach((layer) => {
        const speed = parseFloat(layer.getAttribute("data-speed")) || 0.2;
        const yOffset = -(scrollY * speed);
        const xMouse = mouseX * (speed * 45);
        const yMouse = mouseY * (speed * 35);
        layer.style.transform = `translate3d(${xMouse}px, ${yOffset + yMouse}px, 0)`;
      });

      if (editorialParallax && !isMobile) {
        const rect = editorialParallax.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const progress = (rect.top - window.innerHeight / 2) * 0.04;
          editorialParallax.style.transform = `translateY(${progress}px)`;
        }
      }
    }
    requestAnimationFrame(animateParallax);
  }
  requestAnimationFrame(animateParallax);

  /* --------------------------------------------------
     6. INTERACTIVE CURSOR BUBBLE TRAIL (Desktop Only)
     -------------------------------------------------- */
  const trailContainer = document.getElementById("cursor-trail-container");
  let lastTrailTime = 0;

  if (!isMobile && !prefersReducedMotion && trailContainer) {
    window.addEventListener("mousemove", (e) => {
      const now = Date.now();
      if (now - lastTrailTime < 45) return; // Throttle untuk performa optimal
      lastTrailTime = now;

      const bubble = document.createElement("span");
      bubble.className = "cursor-bubble";
      const size = Math.random() * 8 + 4;

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${e.clientX}px`;
      bubble.style.top = `${e.clientY}px`;

      trailContainer.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 900);
    }, { passive: true });
  }

  /* --------------------------------------------------
     7. 3D TILT & LIGHT REFLECTION ON CARDS
     -------------------------------------------------- */
  const tiltCards = document.querySelectorAll(".tilt-card");

  if (!isMobile && !prefersReducedMotion) {
    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

        const rotateY = ((x / rect.width) - 0.5) * 8;
        const rotateX = ((y / rect.height) - 0.5) * -8;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });
  }

  /* --------------------------------------------------
     8. SCROLL REVEAL & ACTIVE NAVIGATION HIGHLIGHT
     -------------------------------------------------- */
  const revealElements = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll("section[id]");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach((section) => navObserver.observe(section));
});
