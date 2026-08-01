// GSAP Animations — Soft Creative style: varied entrances + playful details
document.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

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
        var dur = reduceMotion ? 0 : 0.75;
        var staggerAmt = reduceMotion ? 0 : 0.1;

        var scrollDefaults = { toggleActions: "play none none none", once: true };

        // === Hero entrance — staggered with personality ===
        gsap.from(".hero-badge", { autoAlpha: 0, x: -20, duration: dur, delay: 0.1, ease: "power2.out" });
        gsap.from(".hero h1", { autoAlpha: 0, y: 20, duration: dur * 1.2, delay: 0.2, ease: "power3.out" });
        gsap.from(".hero-subtitle", { autoAlpha: 0, duration: dur, delay: 0.4 });
        gsap.from(".hero-desc", { autoAlpha: 0, y: 15, duration: dur, delay: 0.55 });
        gsap.from(".stat-item", {
          autoAlpha: 0, y: 20,
          duration: dur, stagger: staggerAmt, delay: 0.65,
          ease: "power2.out"
        });
        gsap.from(".hero-contact", { autoAlpha: 0, duration: dur, delay: 0.9 });
        gsap.from(".hero-visual", { autoAlpha: 0, scale: 0.92, duration: dur * 1.3, delay: 0.3, ease: "power2.out" });

        // === Section markers — slide in from left ===
        gsap.utils.toArray(".section-marker").forEach(function(marker) {
          gsap.from(marker, {
            autoAlpha: 0, x: -30, duration: dur * 0.8,
            ease: "power2.out",
            scrollTrigger: Object.assign({ trigger: marker, start: "top 90%" }, scrollDefaults)
          });
        });

        // === Section headers — gentle fade ===
        gsap.utils.toArray(".section-header h2").forEach(function(h2) {
          gsap.from(h2, {
            autoAlpha: 0, y: 25, duration: dur,
            ease: "power2.out",
            scrollTrigger: Object.assign({ trigger: h2, start: "top 88%" }, scrollDefaults)
          });
        });

        // === Funnel metric cards — slide from right on desktop ===
        gsap.from(".metric-card", {
          autoAlpha: 0, x: isDesktop ? 30 : 0, y: isDesktop ? 0 : 20,
          duration: dur, stagger: staggerAmt * 1.2,
          ease: "power2.out",
          scrollTrigger: Object.assign({ trigger: ".funnel-detail", start: "top 85%" }, scrollDefaults)
        });

        // === Funnel chart — scale in ===
        gsap.from(".funnel-chart", {
          autoAlpha: 0, scale: 0.93, duration: dur * 1.1,
          ease: "power2.out",
          scrollTrigger: Object.assign({ trigger: ".funnel-chart", start: "top 85%" }, scrollDefaults)
        });

        // === Workflow steps — alternate from left/right ===
        gsap.utils.toArray(".workflow-step").forEach(function(step, i) {
          gsap.from(step, {
            autoAlpha: 0,
            x: i % 2 === 0 ? -25 : 25,
            y: 15,
            duration: dur,
            delay: i * staggerAmt * 1.5,
            ease: "power2.out",
            scrollTrigger: Object.assign({ trigger: ".workflow-container", start: "top 85%" }, scrollDefaults)
          });
        });

        // === Workflow arrows — pop in ===
        gsap.from(".workflow-arrow", {
          autoAlpha: 0, scale: 0,
          duration: dur * 0.5, stagger: staggerAmt,
          ease: "back.out(2)",
          scrollTrigger: Object.assign({ trigger: ".workflow-container", start: "top 75%" }, scrollDefaults)
        });

        // === Platform card — subtle rise ===
        gsap.from(".platform-card", {
          autoAlpha: 0, y: 20, duration: dur,
          scrollTrigger: Object.assign({ trigger: ".platform-card", start: "top 88%" }, scrollDefaults)
        });

        // === Tool cards — staggered with slight rotation ===
        gsap.utils.toArray(".tool-card").forEach(function(card, i) {
          gsap.from(card, {
            autoAlpha: 0,
            y: 30,
            rotation: i % 2 === 0 ? -1 : 1,
            duration: dur,
            delay: i * staggerAmt * 1.5,
            ease: "power2.out",
            scrollTrigger: Object.assign({ trigger: ".tools-cards", start: "top 85%" }, scrollDefaults)
          });
        });

        // === Mapping tier cards — cascade ===
        gsap.from(".tier-card", {
          autoAlpha: 0, x: -20, y: 10,
          duration: dur, stagger: staggerAmt * 1.5,
          ease: "power2.out",
          scrollTrigger: Object.assign({ trigger: ".mapping-tier", start: "top 85%" }, scrollDefaults)
        });

        // === Mapping charts ===
        gsap.from(".mapping-chart", {
          autoAlpha: 0, y: 20, scale: 0.96,
          duration: dur, stagger: staggerAmt * 2,
          scrollTrigger: Object.assign({ trigger: ".mapping-grid", start: "top 85%" }, scrollDefaults)
        });

        // === Phase flow — columns stagger in ===
        gsap.from(".phase-col", {
          autoAlpha: 0, y: 30,
          duration: dur, stagger: staggerAmt * 3,
          ease: "power2.out",
          scrollTrigger: Object.assign({ trigger: ".phase-flow", start: "top 85%" }, scrollDefaults)
        });

        // === Case timeline — draw in from dot ===
        gsap.from(".ct-item", {
          autoAlpha: 0, x: -15,
          duration: dur * 0.7, stagger: staggerAmt * 0.7,
          ease: "power2.out",
          scrollTrigger: Object.assign({ trigger: ".case-timeline", start: "top 85%" }, scrollDefaults)
        });

        // === Chat shortcut cards ===
        gsap.from(".shortcut-card", {
          autoAlpha: 0, y: 20, scale: 0.95,
          duration: dur, stagger: staggerAmt,
          ease: "power2.out",
          scrollTrigger: Object.assign({ trigger: ".chat-shortcuts", start: "top 90%" }, scrollDefaults)
        });

        // === Chat container ===
        gsap.from(".chat-container", {
          autoAlpha: 0, y: 20,
          duration: dur,
          scrollTrigger: Object.assign({ trigger: ".chat-container", start: "top 90%" }, scrollDefaults)
        });

        // === Trend chart ===
        gsap.from(".mapping-chart-full", {
          autoAlpha: 0, y: 20,
          duration: dur,
          scrollTrigger: Object.assign({ trigger: ".mapping-chart-full", start: "top 88%" }, scrollDefaults)
        });
      }
    );
  }
});
