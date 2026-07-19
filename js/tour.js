/* =========================================================
   Scroll-driven reveal for the "KCTY Through Time" tour,
   plus the mobile nav toggle. IntersectionObserver only —
   no libraries, and everything stays visible if JS is off
   or reduced motion is requested.
   ========================================================= */

(function () {
  "use strict";

  /* --- mobile nav --- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --- hide figures whose (externally hosted) image fails to load --- */
  document.querySelectorAll(".era-figure img, .photo-figure img").forEach(function (img) {
    img.addEventListener("error", function () {
      var fig = img.closest("figure");
      if (fig) fig.hidden = true;
    });
    if (img.complete && img.naturalWidth === 0) {
      var fig = img.closest("figure");
      if (fig) fig.hidden = true;
    }
  });

  /* --- era reveal --- */
  var eras = document.querySelectorAll(".era");
  if (!eras.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduceMotion) {
    eras.forEach(function (el) { el.classList.add("in-view"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
  );

  eras.forEach(function (el) { observer.observe(el); });
})();
