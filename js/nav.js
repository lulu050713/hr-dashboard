// Mobile nav toggle + Scroll spy
(function() {
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  toggle.addEventListener('click', function() {
    this.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Scroll spy
  const sections = document.querySelectorAll('section[id], header[id]');
  const links = navLinks.querySelectorAll('a[href^="#"]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    let currentId = '';

    sections.forEach(section => {
      if (section.offsetTop <= scrollY) {
        currentId = section.id;
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();
