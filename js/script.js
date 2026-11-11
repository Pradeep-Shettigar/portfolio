document.addEventListener('DOMContentLoaded', async () => {
    // Array of fragments to load into target container IDs
    const components = [
      { targetId: 'header-container', file: 'includes/header.html' },
      { targetId: 'hero-container', file: 'includes/hero.html' },
      { targetId: 'about-container', file: 'includes/about.html' },
      { targetId: 'skills-container', file: 'includes/skills.html' },
      { targetId: 'projects-container', file: 'includes/projects.html' },
      { targetId: 'contact-container', file: 'includes/contact.html' },
      { targetId: 'footer-container', file: 'includes/footer.html' }
    ];
  
    // Fetch and inject each HTML fragment asynchronously
    await Promise.all(
      components.map(async ({ targetId, file }) => {
        try {
          const response = await fetch(file);
          if (response.ok) {
            document.getElementById(targetId).innerHTML = await response.text();
          }
        } catch (error) {
          console.error(`Error loading component from ${file}:`, error);
        }
      })
    );
  
    // Initialize interactive elements after DOM fragments are injected
    initMobileMenu();
    initProjectFilters();
    initContactForm();
  });
  
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
  
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
  
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }
  }
  
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
  
        const filterValue = button.getAttribute('data-filter');
  
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || filterValue === category) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }
  
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        alert(`Thank you, ${name}! Your message has been sent successfully.`);
        contactForm.reset();
      });
    }
  }