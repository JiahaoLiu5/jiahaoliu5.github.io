/* Anchor offsets follow the actual sticky header, including wrapped links. */
(function () {
  "use strict";
  var bar = document.querySelector(".topbar");
  if (!bar) return;
  function measure() {
    document.documentElement.style.setProperty("--topbar-h", Math.ceil(bar.getBoundingClientRect().height) + "px");
  }
  measure();
  if ("ResizeObserver" in window) new ResizeObserver(measure).observe(bar);
  else window.addEventListener("resize", measure);
})();
