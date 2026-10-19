/* The native disclosure remains usable without JavaScript. Only its initial
   state changes with the layout: open on desktop, compact on narrow screens. */
(function () {
  "use strict";
  var profile = document.querySelector("[data-profile-details]");
  if (!profile) return;
  var narrow = window.matchMedia("(max-width: 1000px)");
  function applyLayout() { profile.open = !narrow.matches; }
  applyLayout();
  narrow.addEventListener("change", applyLayout);
})();
