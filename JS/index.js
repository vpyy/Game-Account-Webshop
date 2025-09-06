// Loading Animation
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 500);
});

// Particle System for Hero Section (migrated from main.js)
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.particleCount = 50;

    this.resize();
    this.init();
    this.animate();

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const particleCanvas = document.createElement("canvas");
  particleCanvas.style.position = "absolute";
  particleCanvas.style.top = "0";
  particleCanvas.style.left = "0";
  particleCanvas.style.width = "100%";
  particleCanvas.style.height = "100%";
  particleCanvas.style.pointerEvents = "none";
  particleCanvas.style.zIndex = "1";

  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    heroSection.appendChild(particleCanvas);
    new ParticleSystem(particleCanvas);
  }
});

// Smooth scrolling cho navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Intersection Observer cho animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe các elements cần animation
document
  .querySelectorAll(".game-card, .napthe-card, .hero-content")
  .forEach((el) => {
    observer.observe(el);
  });

// Counter animation cho stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

// Animate counters khi scroll vào view
const statNumbers = document.querySelectorAll(".stat-number");
statNumbers.forEach((stat) => {
  const target = parseInt(stat.textContent.replace(/,/g, ""));
  stat.textContent = "0";

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(stat, target);
        statObserver.unobserve(entry.target);
      }
    });
  });

  statObserver.observe(stat);
});

// Game card hover effects
document.querySelectorAll(".game-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Floating Action Buttons hover (migrated from main.js)
const floatingBtns = document.querySelectorAll(".floating-actions a");
floatingBtns.forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.15)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Form validation và animation
const naptheForm = document.querySelector(".napthe-form");
if (naptheForm) {
  naptheForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Add success animation
    const submitBtn = this.querySelector(".submit-btn");
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Thành công!';
    submitBtn.style.background =
      "linear-gradient(45deg, #4CAF50, #45a049)";

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-credit-card"></i> NẠP THẺ';
      submitBtn.style.background = "";
    }, 2000);
  });
}


