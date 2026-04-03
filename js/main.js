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
  const SCROLL_THRESHOLD = 60;
  let navTicking = false;
  let isNavScrolled = false;

  function syncNavScrollState() {
    const scrollY = window.scrollY;
    const shouldBeScrolled = scrollY > SCROLL_THRESHOLD;

    if (shouldBeScrolled !== isNavScrolled) {
      nav.classList.toggle('scrolled', shouldBeScrolled);
      isNavScrolled = shouldBeScrolled;
    }
  }

  function handleNavScroll() {
    if (navTicking) {
      return;
    }

    navTicking = true;
    window.requestAnimationFrame(function () {
      syncNavScrollState();
      navTicking = false;
    });
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  syncNavScrollState();

  // --- Mobile Menu Toggle ---
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    document.body.style.overflow = isOpen ? '' : 'hidden';

    if (!isOpen) {
      nav.classList.add('scrolled');
      isNavScrolled = true;
    } else {
      syncNavScrollState();
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

  // --- Hero Video: controlled start, fade, and loop ---
  var heroVideo = document.querySelector('.hero-video');

  if (heroVideo) {
    var INITIAL_START_TIME = 6;
    var LOOP_START_TIME = 1.5;
    var LOOP_RESTART_DELAY = 420;
    var INITIAL_REVEAL_DELAY = 300;
    var INITIAL_REVEAL_DURATION = 800;
    var isVideoInView = true;
    var hasAppliedInitialSeek = false;
    var hasShownInitialReveal = false;
    var isLoopRestarting = false;
    var initialRevealTimer = null;
    var settleVideoTimer = null;

    function playHeroVideo() {
      var playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {});
      }
    }

    function showHeroVideo() {
      heroVideo.classList.add('is-visible');
    }

    function hideHeroVideo() {
      heroVideo.classList.remove('is-visible');
    }

    function clearInitialRevealTimer() {
      if (initialRevealTimer) {
        window.clearTimeout(initialRevealTimer);
        initialRevealTimer = null;
      }
    }

    function clearSettleVideoTimer() {
      if (settleVideoTimer) {
        window.clearTimeout(settleVideoTimer);
        settleVideoTimer = null;
      }
    }

    function settleHeroVideo() {
      clearSettleVideoTimer();
      settleVideoTimer = window.setTimeout(function () {
        heroVideo.classList.add('is-settled');
        settleVideoTimer = null;
      }, INITIAL_REVEAL_DURATION);
    }

    function queueInitialReveal() {
      if (hasShownInitialReveal || initialRevealTimer || !isVideoInView || isLoopRestarting) {
        return;
      }

      initialRevealTimer = window.setTimeout(function () {
        initialRevealTimer = null;

        if (!isVideoInView || isLoopRestarting) {
          return;
        }

        showHeroVideo();
        hasShownInitialReveal = true;
        settleHeroVideo();
      }, INITIAL_REVEAL_DELAY);
    }

    heroVideo.addEventListener('loadedmetadata', function () {
      if (hasAppliedInitialSeek) {
        return;
      }

      hasAppliedInitialSeek = true;
      heroVideo.currentTime = Math.min(INITIAL_START_TIME, heroVideo.duration || INITIAL_START_TIME);
    });

    heroVideo.addEventListener('canplay', function () {
      if (!isVideoInView || isLoopRestarting) {
        return;
      }

      playHeroVideo();

      if (hasShownInitialReveal) {
        showHeroVideo();
      } else {
        queueInitialReveal();
      }
    });

    heroVideo.addEventListener('ended', function () {
      if (isLoopRestarting) {
        return;
      }

      isLoopRestarting = true;
      clearInitialRevealTimer();
      hideHeroVideo();

      window.setTimeout(function () {
        heroVideo.currentTime = Math.min(LOOP_START_TIME, heroVideo.duration || LOOP_START_TIME);

        if (isVideoInView) {
          playHeroVideo();
          showHeroVideo();
          hasShownInitialReveal = true;
        }

        isLoopRestarting = false;
      }, LOOP_RESTART_DELAY);
    });

    if ('IntersectionObserver' in window) {
      var videoObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            isVideoInView = entry.isIntersecting;

            if (isVideoInView) {
              if (!isLoopRestarting) {
                playHeroVideo();

                if (hasShownInitialReveal) {
                  showHeroVideo();
                }
              }
            } else {
              clearInitialRevealTimer();
              heroVideo.pause();
            }
          });
        },
        { threshold: 0.1 }
      );
      videoObserver.observe(heroVideo);
    } else {
      playHeroVideo();
      queueInitialReveal();
    }
  }

})();
