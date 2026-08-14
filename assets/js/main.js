/* ==========================================================================
   MealDesk - Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Theme Management (Dark/Light Mode) ---
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const body = document.documentElement; // Or document.body, depending on CSS strategy

  // Check Local Storage
  const savedTheme = localStorage.getItem('md-theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('md-theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });

  function updateThemeIcons(theme) {
    themeToggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.classList.remove('bi-moon');
          icon.classList.add('bi-sun');
        } else {
          icon.classList.remove('bi-sun');
          icon.classList.add('bi-moon');
        }
      }
    });
  }

  // --- 2. RTL Management ---
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const savedDir = localStorage.getItem('md-dir') || 'ltr';
  body.setAttribute('dir', savedDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = body.getAttribute('dir');
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      
      body.setAttribute('dir', newDir);
      localStorage.setItem('md-dir', newDir);
    });
  });

  // --- 3. Mobile Sidebar Management ---
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileSidebar = document.getElementById('mobileSidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarClose = document.getElementById('sidebarClose');

  function openSidebar() {
    if(mobileSidebar) mobileSidebar.classList.add('active');
    if(sidebarOverlay) sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  function closeSidebar() {
    if(mobileSidebar) mobileSidebar.classList.remove('active');
    if(sidebarOverlay) sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openSidebar);
  if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  // Close sidebar on link click
  const mobileNavLinks = document.querySelectorAll('.md-mobile-sidebar .md-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  // --- 4. Scroll Animations (Intersection Observer) ---
  const animationElements = document.querySelectorAll('.reveal-fade, .reveal-slide-left, .reveal-slide-right, .reveal-scale, .stagger-container');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% visible
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Stop observing once animated if you want one-time animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animationElements.forEach(el => {
    animationObserver.observe(el);
  });

  // --- 5. Sticky Header ---
  const header = document.querySelector('.md-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('shadow-sm');
        // You can add more complex sticky logic here
      } else {
        header.classList.remove('shadow-sm');
      }
    });
  }

  // --- 6. Form Validations (Demo purpose) ---
  const forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // --- 7. Back to Top Button ---
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
