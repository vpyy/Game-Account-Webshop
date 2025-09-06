// Loading Animation
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 500);
});

// Password Toggle
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("mk");

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password"
        ? "text"
        : "password";
    passwordInput.setAttribute("type", type);

    const icon = this.querySelector("i");
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });
}

// Form Animation
const formInputs = document.querySelectorAll(".form-input");
formInputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", function () {
    if (!this.value) {
      this.parentElement.classList.remove("focused");
    }
  });
});

// Form Submission
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Add loading state
    const submitBtn = this.querySelector(".login-submit-btn");
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // Success animation
      submitBtn.innerHTML =
        '<i class="fas fa-check"></i> Đăng nhập thành công!';
      submitBtn.style.background =
        "linear-gradient(45deg, #2ecc71, #27ae60)";

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/index.html";
      }, 1500);
    }, 2000);
  });
}

// Social Button Hover Effects
const socialBtns = document.querySelectorAll(".social-btn");
socialBtns.forEach((btn) => {
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

// Observe elements
document
  .querySelectorAll(
    ".form-wrapper, .welcome-section, .login-form-container"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Add entrance animation to welcome title
const welcomeTitle = document.querySelector(".welcome-title");
if (welcomeTitle) {
  setTimeout(() => {
    typeWriter(welcomeTitle, welcomeTitle.textContent, 80);
  }, 1000);
}

// Typing Effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});


