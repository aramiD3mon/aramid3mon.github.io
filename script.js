// Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
      });

      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Active navigation based on visible section
    const sections = document.querySelectorAll('main section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const activateLink = () => {
      let currentId = '';
      sections.forEach(section => {
        const top = window.scrollY;
        const offset = section.offsetTop - 140;
        const height = section.offsetHeight;
        if (top >= offset && top < offset + height) currentId = section.id;
      });

      navAnchors.forEach(anchor => {
        anchor.classList.toggle('active', anchor.getAttribute('href') === `#${currentId}`);
      });
    };

    window.addEventListener('scroll', activateLink);
    window.addEventListener('load', activateLink);

    // Reveal on scroll for a modern, soft animation feel
    const revealItems = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealItems.forEach(item => revealObserver.observe(item));

    // Contact form message counter
    const messageField = document.getElementById('message');
    const countField = document.getElementById('message-count');

    if (messageField && countField) {
      const updateCount = () => {
        countField.textContent = messageField.value.length;
      };
      messageField.addEventListener('input', updateCount);
      updateCount();
    }
