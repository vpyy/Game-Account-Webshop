// Loading Animation
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 500);
});

// Search and Filter Functionality
const searchInput = document.getElementById('searchInput');
const priceFilter = document.getElementById('priceFilter');
const levelFilter = document.getElementById('levelFilter');
const rankFilter = document.getElementById('rankFilter');
const searchBtn = document.getElementById('searchBtn');

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const priceValue = priceFilter.value;
  const levelValue = levelFilter.value;
  const rankValue = rankFilter.value;

  const accountCards = document.querySelectorAll('.account-card');
  
  accountCards.forEach(card => {
    let shouldShow = true;

    // Search by text
    if (searchTerm) {
      const cardText = card.textContent.toLowerCase();
      if (!cardText.includes(searchTerm)) {
        shouldShow = false;
      }
    }

    // Apply filters (placeholder)
    if (shouldShow && priceValue) {
      // TODO: Implement price filtering
    }

    if (shouldShow && levelValue) {
      // TODO: Implement level filtering
    }

    if (shouldShow && rankValue) {
      // TODO: Implement rank filtering
    }

    // Show/hide card with animation
    if (shouldShow) {
      card.style.display = 'block';
      card.classList.add('animate-in');
    } else {
      card.style.display = 'none';
    }
  });
}

// Event listeners
if (searchBtn) {
  searchBtn.addEventListener('click', performSearch);
}
if (searchInput) {
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}

// Filter change events
[priceFilter, levelFilter, rankFilter].forEach(filter => {
  if (filter) {
    filter.addEventListener('change', performSearch);
  }
});

// Account Card Interactions
const accountCards = document.querySelectorAll('.account-card');
accountCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });

  // Click to view details
  card.addEventListener('click', function() {
    const gameType = this.dataset.game;
    console.log(`Viewing ${gameType} account details`);
  });
});

// Pagination
const pageBtns = document.querySelectorAll('.page-btn');
pageBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const page = this.dataset.page;
    
    if (page === 'prev' || page === 'next') {
      // Handle prev/next navigation
      console.log(`Navigating to ${page} page`);
    } else {
      // Handle specific page number
      pageBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      console.log(`Navigating to page ${page}`);
    }
  });
});

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
document.querySelectorAll('.account-card, .filter-section, .pagination').forEach(el => {
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


