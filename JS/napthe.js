// Loading Animation
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 500);
});

// Payment Method Selection
const methodCards = document.querySelectorAll('.method-card');
methodCards.forEach(card => {
  card.addEventListener('click', function() {
    // Remove active class from all cards
    methodCards.forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked card
    this.classList.add('active');
    
    // Show selected method
    const method = this.dataset.method;
    showSelectedMethod(method);
  });
});

function showSelectedMethod(method) {
  const methods = {
    card: 'Nạp thẻ cào',
    wallet: 'Nạp vào ví',
    bank: 'Chuyển khoản ngân hàng',
    purchased: 'Xem tài khoản đã mua',
    installment: 'Xem tài khoản trả góp'
  };
  
  // You can add logic here to show different forms or redirect
  console.log(`Selected method: ${methods[method]}`);
}

// Form Validation
const naptheForm = document.getElementById('naptheForm');
if (naptheForm) {
  naptheForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    const cardType = document.getElementById('cardType').value;
    const cardValue = document.getElementById('cardValue').value;
    const serialNumber = document.getElementById('serialNumber').value;
    const cardCode = document.getElementById('cardCode').value;
    
    if (!cardType || !cardValue || !serialNumber || !cardCode) {
      showNotification('Vui lòng điền đầy đủ thông tin', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      // Success animation
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Nạp thẻ thành công!';
      submitBtn.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
      
      showNotification('Nạp thẻ thành công! Số tiền đã được cộng vào tài khoản.', 'success');
      
      // Reset form after success
      setTimeout(() => {
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 2000);
    }, 2000);
  });
}

// Clear Form
const clearBtn = document.getElementById('clearBtn');
if (clearBtn) {
  clearBtn.addEventListener('click', function() {
    const form = document.getElementById('naptheForm');
    form.reset();
    showNotification('Đã xóa form', 'info');
  });
}

// Quick Actions
const actionBtns = document.querySelectorAll('.action-btn');
actionBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const action = this.dataset.action;
    handleQuickAction(action);
  });
});

function handleQuickAction(action) {
  const actions = {
    history: 'Xem lịch sử nạp thẻ',
    support: 'Liên hệ hỗ trợ',
    guide: 'Xem hướng dẫn nạp thẻ'
  };
  
  showNotification(`Đang mở: ${actions[action]}`, 'info');
}

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
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
    notification.classList.add('show');
  }, 100);
  
  // Hide notification
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

function getNotificationIcon(type) {
  const icons = {
    success: 'check-circle',
    error: 'exclamation-circle',
    warning: 'exclamation-triangle',
    info: 'info-circle'
  };
  return icons[type] || 'info-circle';
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.method-card, .napthe-section, .quick-actions').forEach(el => {
  observer.observe(el);
});

// Add entrance animation to hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  setTimeout(() => {
    typeWriter(heroTitle, heroTitle.textContent, 80);
  }, 1000);
}

// Typing Effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


