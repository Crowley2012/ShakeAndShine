/* Nicky Bobby's Shake & Shine: interactions */
(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Animated stat counters ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1200;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll(".stat__num[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
    });
  }

  /* ---------- Booking form -> Web3Forms ---------- */
  var form = document.getElementById("bookForm");
  var note = document.getElementById("bookNote");

  // Web3Forms access key (web3forms.com -> your dashboard).
  var ACCESS_KEY = "fccc31fd-b60d-4a3b-babf-5e6c5d0ad20e";

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var els = form.elements;
      var name = (els["name"].value || "").trim();
      var contact = (els["phone"].value || "").trim();
      var address = (els["address"].value || "").trim();
      var date = (els["date"].value || "").trim();
      var pkg = els["pkg"].value;
      var notes = (els["notes"].value || "").trim();
      var botcheck = els["botcheck"] ? els["botcheck"].value : "";

      if (!name || !contact) {
        if (note) note.textContent = "Pop in your name and a way to reach you so I can confirm the slot.";
        return;
      }

      if (ACCESS_KEY === "PASTE_YOUR_WEB3FORMS_ACCESS_KEY") {
        if (note) note.textContent = "Booking email isn't hooked up yet — text (317) 800-9301 and I'll get you on the grid. 🏁";
        return;
      }

      if (note) note.textContent = "Sending…";

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          email: "nickwilliamsindy19@gmail.com",
          subject: "New booking — " + name,
          name: name,
          contact: contact,
          address: address,
          date: date,
          package: pkg,
          notes: notes,
          botcheck: botcheck
        })
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && (data.success === true || data.success === "true")) {
            if (note) note.textContent = "You're on the grid! I'll be in touch shortly. 🏁";
            form.reset();
          } else {
            if (note) note.textContent = "Hmm, that didn't go through. Text (317) 800-9301 and I'll sort you out. 🏁";
          }
        })
        .catch(function () {
          if (note) note.textContent = "Network hiccup — couldn't send. Text (317) 800-9301 and I'll get you booked. 🏁";
        });
    });
  }

  /* ---------- Scroll progress ---------- */
  var progress = document.getElementById("navProgress");
  if (progress) {
    var ticking = false;
    var updateProgress = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? Math.min(window.scrollY / max, 1) * 100 : 0;
      progress.style.width = pct + "%";
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); }
    }, { passive: true });
    updateProgress();
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
