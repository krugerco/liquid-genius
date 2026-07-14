/* Liquid Genius — scroll-reveal animations */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var selectors = [
    ".section-head", ".svc", ".card", ".feature > *", ".step",
    ".stats", ".pull blockquote", ".pull cite",
    ".band h2", ".band p", ".band .btn",
    ".contact-grid .info", ".contact-grid form.contact",
    ".page-hero .kicker", ".page-hero h1", ".page-hero .lede"
  ];

  var els = document.querySelectorAll(selectors.join(","));
  var groupCounts = {};

  els.forEach(function (el) {
    el.classList.add("reveal");
    // stagger siblings that share a parent
    var key = el.parentNode ? Array.prototype.indexOf.call(document.querySelectorAll("*"), el.parentNode) : 0;
    groupCounts[key] = (groupCounts[key] || 0);
    el.style.transitionDelay = Math.min(groupCounts[key] * 90, 450) + "ms";
    groupCounts[key]++;
  });

  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  els.forEach(function (el) { io.observe(el); });
})();
