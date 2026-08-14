/* ==========================================================================
   MealDesk - Dashboard JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';
  
    // --- Dashboard Sidebar Toggle ---
    const dashboardSidebarToggle = document.getElementById('dashboardSidebarToggle');
    const dashboardSidebar = document.querySelector('.md-dashboard-sidebar');
    const dashboardMain = document.querySelector('.md-dashboard-main');
    const dashboardOverlay = document.getElementById('dashboardOverlay');
  
    function toggleDashboardSidebar() {
      if(dashboardSidebar) {
        dashboardSidebar.classList.toggle('active');
        if (window.innerWidth < 1024 && dashboardOverlay) {
            dashboardOverlay.classList.toggle('active');
        }
      }
    }
  
    if (dashboardSidebarToggle) {
        dashboardSidebarToggle.addEventListener('click', toggleDashboardSidebar);
    }
    if (dashboardOverlay) {
        dashboardOverlay.addEventListener('click', () => {
            dashboardSidebar.classList.remove('active');
            dashboardOverlay.classList.remove('active');
        });
    }

    // --- Active Link Management ---
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.md-sidebar-link');
    
    sidebarLinks.forEach(link => {
        // Simple matching logic
        if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });

    // --- Chart Demo (If needed later) ---
    // Placeholder for chart initialization if a chart library is added,
    // though the prompt says no external libraries except Bootstrap 5.
    // We will build CSS-based charts or simple progress bars.
  
  });
