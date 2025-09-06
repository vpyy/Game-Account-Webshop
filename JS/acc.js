// Loading Animation
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 500);
});

// Image Gallery
const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumbnail");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", function () {
    // Remove active class from all thumbnails
    thumbnails.forEach((t) => t.classList.remove("active"));

    // Add active class to clicked thumbnail
    this.classList.add("active");

    // Update main image
    const newImageSrc = this.dataset.image;
    mainImage.src = newImageSrc;

    // Add fade effect
    mainImage.style.opacity = "0";
    setTimeout(() => {
      mainImage.style.opacity = "1";
    }, 150);
  });
});

// Tab Switching
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const targetTab = this.dataset.tab;

    // Remove active class from all tabs and panes
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabPanes.forEach((p) => p.classList.remove("active"));

    // Add active class to clicked tab and corresponding pane
    this.classList.add("active");
    document.getElementById(targetTab).classList.add("active");
  });
});

// Action Buttons
const buyBtn = document.getElementById("buyBtn");
const contactBtn = document.getElementById("contactBtn");
const wishlistBtn = document.getElementById("wishlistBtn");

buyBtn.addEventListener("click", function () {
  this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
  this.disabled = true;

  setTimeout(() => {
    this.innerHTML = '<i class="fas fa-check"></i> Đã mua thành công!';
    this.style.background = "linear-gradient(45deg, #2ecc71, #27ae60)";
  }, 2000);
});

contactBtn.addEventListener("click", function () {
  window.open("https://www.messenger.com/", "_blank");
});

wishlistBtn.addEventListener("click", function () {
  const icon = this.querySelector("i");
  icon.classList.toggle("fas");
  icon.classList.toggle("far");

  if (icon.classList.contains("fas")) {
    this.style.color = "#e74c3c";
    showNotification("Đã thêm vào danh sách yêu thích", "success");
  } else {
    this.style.color = "";
    showNotification("Đã xóa khỏi danh sách yêu thích", "info");
  }
});

// Zoom Button
const zoomBtn = document.getElementById("zoomBtn");
zoomBtn.addEventListener("click", function () {
  const image = mainImage.src;
  // You can implement a lightbox or modal here
  console.log("Zooming image:", image);
});

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
          <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
          </div>
        `;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Hide notification
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

function getNotificationIcon(type) {
  const icons = {
    success: "check-circle",
    error: "exclamation-circle",
    warning: "exclamation-triangle",
    info: "info-circle",
  };
  return icons[type] || "info-circle";
}

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
    ".account-detail-section, .additional-info, .breadcrumb"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Add entrance animation to account title
const accountTitle = document.querySelector(".account-title");
if (accountTitle) {
  setTimeout(() => {
    typeWriter(accountTitle, accountTitle.textContent, 80);
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


