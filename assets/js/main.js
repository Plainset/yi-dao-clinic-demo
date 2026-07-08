/* Yi Dao Clinic — shared behaviour: nav toggle, scroll-reveal, progress
   line, gallery lightbox (native <dialog>), quick-contact dialog,
   restrained magnetic hero CTA. */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.querySelector(".nav__menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.setAttribute("data-open", String(!open));
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        menu.setAttribute("data-open", "false");
      });
    });
  }

  /* ---- Scroll-reveal ---- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  revealEls.forEach(function (el) {
    var delay = el.getAttribute("data-reveal-delay");
    if (delay) el.style.setProperty("--reveal-delay", delay + "ms");
  });
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---- Scroll progress line ---- */
  var progressFill = document.querySelector(".scroll-progress__fill");
  if (progressFill) {
    var ticking = false;
    var updateProgress = function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressFill.style.setProperty("--progress", pct + "%");
      ticking = false;
    };
    document.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; }
    }, { passive: true });
    updateProgress();
  }

  /* ---- Gallery lightbox: native <dialog>, shared across a page ---- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lightboxImg = lightbox.querySelector("img");
    var lightboxCaption = lightbox.querySelector(".lightbox__caption");
    document.querySelectorAll(".gallery__item").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var full = btn.getAttribute("data-full") || btn.querySelector("img").src;
        var caption = btn.getAttribute("data-caption") || "";
        lightboxImg.src = full;
        lightboxImg.alt = btn.querySelector("img").alt || "";
        lightboxCaption.textContent = caption;
        lightbox.showModal();
      });
    });
    var lbClose = lightbox.querySelector(".lightbox__close");
    if (lbClose) lbClose.addEventListener("click", function () { lightbox.close(); });
    lightbox.addEventListener("click", function (e) {
      var rect = lightbox.querySelector(".lightbox__frame").getBoundingClientRect();
      var inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) lightbox.close();
    });
  }

  /* ---- Quick-contact dialog ---- */
  var dialog = document.getElementById("quick-contact");
  if (dialog) {
    document.querySelectorAll("[data-quick-contact-trigger]").forEach(function (btn) {
      btn.addEventListener("click", function () { dialog.showModal(); });
    });
    var closeBtn = dialog.querySelector(".quick-contact__close");
    if (closeBtn) closeBtn.addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) {
      var rect = dialog.getBoundingClientRect();
      var inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
  }

  /* ---- Restrained magnetic pull on the single hero CTA ---- */
  if (!reduceMotion) {
    document.querySelectorAll(".btn--magnetic").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - (rect.left + rect.width / 2);
        var y = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = "translate(" + (x * 0.12).toFixed(1) + "px, " + (y * 0.22).toFixed(1) + "px)";
      });
      btn.addEventListener("pointerleave", function () { btn.style.transform = ""; });
    });
  }
})();
