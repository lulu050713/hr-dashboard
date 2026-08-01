// Creative Micro-Interactions — vanilla JS, no dependencies
(function() {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  document.addEventListener('DOMContentLoaded', function() {
    initTilt();
    initMagneticButtons();
    initCountUp();
    initTextScramble();
    initHeroGlow();
    initElasticPress();
    initRipple();
  });

  // === 1. 3D Tilt on Cards ===
  function initTilt() {
    var cards = document.querySelectorAll('.tool-card, .phase-card, .tier-card');
    cards.forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(600px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg) translateY(-2px)';
      });
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        setTimeout(function() { card.style.transition = ''; }, 400);
      });
    });
  }

  // === 2. Magnetic Buttons ===
  function initMagneticButtons() {
    var btns = document.querySelectorAll('.ai-cta-btn, .tools-dl-btn, .chat-send-btn');
    btns.forEach(function(btn) {
      btn.addEventListener('mousemove', function(e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.25) + 'px)';
      });
      btn.addEventListener('mouseleave', function() {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)';
        setTimeout(function() { btn.style.transition = ''; }, 350);
      });
    });
  }

  // === 3. Number Count-Up ===
  function initCountUp() {
    var nums = document.querySelectorAll('.stat-num');
    if (!nums.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);
        animateNum(el);
      });
    }, { threshold: 0.5 });

    nums.forEach(function(el) { observer.observe(el); });
  }

  function animateNum(el) {
    var text = el.textContent.trim();
    var match = text.match(/^(\d+)(.*)$/);
    if (!match) return;
    var target = parseInt(match[1], 10);
    var suffix = match[2] || '';
    var duration = 1200;
    var start = performance.now();

    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * ease) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    el.textContent = '0' + suffix;
    requestAnimationFrame(step);
  }

  // === 4. Text Scramble on Section Markers ===
  function initTextScramble() {
    var markers = document.querySelectorAll('.marker-num');
    if (!markers.length) return;
    var chars = '0123456789ABCDEF#$%';

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);
        scramble(el);
      });
    }, { threshold: 0.8 });

    markers.forEach(function(el) { observer.observe(el); });

    function scramble(el) {
      var final = el.textContent;
      var iterations = 0;
      var maxIterations = 8;
      var interval = setInterval(function() {
        el.textContent = final.split('').map(function(ch, i) {
          if (iterations > maxIterations - (final.length - i) * 2) return ch;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        iterations++;
        if (iterations >= maxIterations) {
          el.textContent = final;
          clearInterval(interval);
        }
      }, 50);
    }
  }

  // === 5. Hero Cursor Glow ===
  function initHeroGlow() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    var glow = document.createElement('div');
    glow.className = 'hero-cursor-glow';
    hero.appendChild(glow);

    hero.addEventListener('mousemove', function(e) {
      var rect = hero.getBoundingClientRect();
      glow.style.left = (e.clientX - rect.left) + 'px';
      glow.style.top = (e.clientY - rect.top) + 'px';
      glow.style.opacity = '1';
    });
    hero.addEventListener('mouseleave', function() {
      glow.style.opacity = '0';
    });
  }

  // === 6. Elastic Press on Shortcut Cards ===
  function initElasticPress() {
    var cards = document.querySelectorAll('.shortcut-card');
    cards.forEach(function(card) {
      card.addEventListener('mousedown', function() {
        card.style.transform = 'scale(0.94)';
        card.style.transition = 'transform 0.1s ease-in';
      });
      card.addEventListener('mouseup', function() {
        card.style.transform = 'scale(1)';
        card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
    });
  }

  // === 7. Ripple on Clickable Metric Cards ===
  function initRipple() {
    var cards = document.querySelectorAll('.metric-card.clickable');
    cards.forEach(function(card) {
      card.addEventListener('click', function(e) {
        var rect = card.getBoundingClientRect();
        var ripple = document.createElement('span');
        ripple.className = 'click-ripple';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        card.appendChild(ripple);
        setTimeout(function() { ripple.remove(); }, 600);
      });
    });
  }
})();
