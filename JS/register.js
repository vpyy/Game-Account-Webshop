// Loading Animation
window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loadingScreen");
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 1500);
});

// Floating Labels
document.querySelectorAll(".form-input").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", function () {
    if (this.value.trim() === "") {
      this.parentElement.classList.remove("focused");
    }
  });
});

// Password Toggle
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("mk");

togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  const icon = this.querySelector("i");
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
});

// Social Button Hover Effects
document.querySelectorAll(".social-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.05)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Floating Shapes Animation
const shapes = document.querySelectorAll(".shape");
shapes.forEach((shape, index) => {
  shape.style.animationDelay = `${index * 0.5}s`;
});

// Intersection Observer for animations
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

document
  .querySelectorAll(
    ".register-container, .welcome-section, .progress-container"
  )
  .forEach((el) => {
    observer.observe(el);
  });


