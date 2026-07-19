/* =========================================================
   KCTY site interactions — deliberately minimal.
   - header hairline after scroll
   - mobile nav toggle
   - subtle reveal on scroll (content stays visible without JS;
     the .js class gates all animation styles)
   - figures hide themselves if their externally hosted image
     fails to load
   Honors prefers-reduced-motion.
   ========================================================= */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- header state --- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* --- mobile nav --- */
  var toggle = document.querySelector(".nav-toggle");
  var navRight = document.querySelector(".nav-right");
  if (toggle && navRight) {
    toggle.addEventListener("click", function () {
      var open = navRight.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navRight.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navRight.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --- hide figures whose image fails to load --- */
  document.querySelectorAll("figure img").forEach(function (img) {
    var hide = function () {
      var fig = img.closest("figure");
      if (fig) fig.hidden = true;
    };
    img.addEventListener("error", hide);
    if (img.complete && img.naturalWidth === 0) hide();
  });

  /* --- reveal on scroll --- */
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("js");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });
})();
