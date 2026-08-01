// GSAP Animations — scroll-triggered entrances + hero animation
document.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Wait for layout to settle before setting up scroll animations
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      initAnimations();
      ScrollTrigger.refresh();
    });
  });

  function initAnimations() {
    var mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)",
        reduceMotion: "(prefers-reduced-motion: reduce)"
      },
      function(context) {
        var conditions = context.conditions;
        var isDesktop = conditions.isDesktop;
        var reduceMotion = conditions.reduceMotion;
        var dur = reduceMotion ? 0 : 0.7;
        var staggerAmt = reduceMotion ? 0 : 0.12;

        var scrollDefaults = { toggleActions: "play none none none", once: true };

        // === Hero entrance ===
        gsap.from(".hero-badge", { autoAlpha: 0, y: -20, duration: dur, delay: 0.1 });
        gsap.from(".hero h1", { autoAlpha: 0, y: 30, duration: dur, delay: 0.2 });
        gsap.from(".hero-subtitle", { autoAlpha: 0, y: 20, duration: dur, delay: 0.35 });
        gsap.from(".hero-desc", { autoAlpha: 0, y: 20, duration: dur, delay: 0.5 });
        gsap.from(".stat-item", {
          autoAlpha: 0, y: 25, scale: 0.9,
          duration: dur, stagger: staggerAmt, delay: 0.6,
          ease: "back.out(1.4)"
        });
        gsap.from(".hero-contact", { autoAlpha: 0, y: 15, duration: dur, delay: 0.9 });
        gsap.from(".hero-visual", { autoAlpha: 0, scale: 0.85, duration: dur * 1.2, delay: 0.4, ease: "power2.out" });

        // === Section headers ===
        gsap.utils.toArray(".section-header").forEach(function(header) {
          gsap.from(header, {
            autoAlpha: 0, y: 40, duration: dur,
            scrollTrigger: Object.assign({ trigger: header, start: "top 88%" }, scrollDefaults)
          });
        });

        // === Funnel metric cards ===
        gsap.from(".metric-card", {
          autoAlpha: 0, x: isDesktop ? 40 : 0, y: isDesktop ? 0 : 30,
          duration: dur, stagger: staggerAmt,
          ease: "power2.out",
          scrollTrigger: Object.assign({ trigger: ".funnel-detail", start: "top 85%" }, scrollDefaults)
        });

        // === Funnel chart ===
        gsap.from(".funnel-chart", {
          autoAlpha: 0, scale: 0.9, duration: dur * 1.2,
          ease: "power2.out",
          scrollTrigger: Object.assign({ trigger: ".funnel-chart", start: "top 85%" }, scrollDefaults)
        });

        // === Workflow steps ===
        gsap.from(".workflow-step", {
          autoAlpha: 0, y: 40, scale: 0.92,
          duration: dur, stagger: staggerAmt * 1.5,
          ease: "back.out(1.2)",
          scrollTrigger: Object.assign({ trigger: ".workflow-container", start: "top 85%" }, scrollDefaults)
        });
        gsap.from(".workflow-arrow", {
          autoAlpha: 0, scale: 0,
          duration: dur * 0.6, stagger: staggerAmt,
          ease: "back.out(2)",
          scrollTrigger: Object.assign({ trigger: ".workflow-container", start: "top 75%" }, scrollDefaults)
        });

        // === Platform card ===
        gsap.from(".platform-card", {
          autoAlpha: 0, y: 30, duration: dur,
          scrollTrigger: Object.assign({ trigger: ".platform-card", start: "top 88%" }, scrollDefaults)
        });

        // === Tool cards ===
        gsap.from(".tool-card", {
          autoAlpha: 0, y: 40, scale: 0.95,
          duration: dur, stagger: staggerAmt * 1.5,
          ease: "power2.out",
          scrollTrigger: Object.assign({ trigger: ".tools-cards", start: "top 85%" }, scrollDefaults)
        });

        // === Mapping tier cards ===
        gsap.from(".tier-card", {
          autoAlpha: 0, x: -30,
          duration: dur, stagger: staggerAmt,
          ease: "power2.out",
          scrollTrigger: Object.assign({ trigger: ".mapping-tier", start: "top 85%" }, scrollDefaults)
        });

        // === Mapping charts ===
        gsap.from(".mapping-chart", {
          autoAlpha: 0, y: 30, scale: 0.95,
          duration: dur, stagger: staggerAmt,
          scrollTrigger: Object.assign({ trigger: ".mapping-grid", start: "top 85%" }, scrollDefaults)
        });

        // === Phase flow cards ===
        gsap.from(".phase-col", {
          autoAlpha: 0, y: 40,
          duration: dur, stagger: staggerAmt * 2,
          ease: "power2.out",
          scrollTrigger: Object.assign({ trigger: ".phase-flow", start: "top 85%" }, scrollDefaults)
        });

        // === Case timeline items ===
        gsap.from(".ct-item", {
          autoAlpha: 0, x: -20,
          duration: dur * 0.8, stagger: staggerAmt * 0.8,
          ease: "power2.out",
          scrollTrigger: Object.assign({ trigger: ".case-timeline", start: "top 85%" }, scrollDefaults)
        });

        // === Chat shortcut cards ===
        gsap.from(".shortcut-card", {
          autoAlpha: 0, y: 25, scale: 0.9,
          duration: dur, stagger: staggerAmt,
          ease: "back.out(1.3)",
          scrollTrigger: Object.assign({ trigger: ".chat-shortcuts", start: "top 90%" }, scrollDefaults)
        });

        // === Chat container ===
        gsap.from(".chat-container", {
          autoAlpha: 0, y: 30,
          duration: dur,
          scrollTrigger: Object.assign({ trigger: ".chat-container", start: "top 90%" }, scrollDefaults)
        });

        // === Trend chart ===
        gsap.from(".mapping-chart-full", {
          autoAlpha: 0, y: 30,
          duration: dur,
          scrollTrigger: Object.assign({ trigger: ".mapping-chart-full", start: "top 88%" }, scrollDefaults)
        });
      }
    );
  }
});
