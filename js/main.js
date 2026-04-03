/* ==========================================================================
   Something Different — Main JS
   ========================================================================== */

(function () {
  'use strict';

  // --- DOM References ---
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  // --- Navigation: scroll state ---
  let lastScroll = 0;
  const SCROLL_THRESHOLD = 60;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Mobile Menu Toggle ---
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    document.body.style.overflow = isOpen ? '' : 'hidden';

    if (!isOpen) {
      nav.classList.add('scrolled');
    } else if (window.scrollY <= SCROLL_THRESHOLD) {
      nav.classList.remove('scrolled');
    }
  }

  navToggle.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Scroll Reveal (IntersectionObserver) ---
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // --- Video: pause when not visible ---
  var heroVideo = document.querySelector('.hero-video');

  if (heroVideo && 'IntersectionObserver' in window) {
    var videoObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            heroVideo.play();
          } else {
            heroVideo.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    videoObserver.observe(heroVideo);
  }

})();
