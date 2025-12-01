function initDateVisibility() {
  var nodes = document.querySelectorAll("[data-start-date],[data-end-date]");
  if (!nodes.length) return;

  function parseDate(val) {
    if (!val) return null;
    var t = Date.parse(val);
    return isNaN(t) ? null : new Date(t);
  }

  var now = new Date();

  nodes.forEach(function (el) {
    var start = parseDate(el.getAttribute("data-start-date"));
    var end = parseDate(el.getAttribute("data-end-date"));
    var visible = true;

    if (start && now < start) visible = false;
    if (end && now > end) visible = false;

    el.style.display = visible ? "" : "none";
  });
}

window.initDateVisibility = initDateVisibility;
