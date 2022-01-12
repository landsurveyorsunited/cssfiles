const tapeBody = document.getElementById("tape-body");
const tapeMeasure = document.getElementById("tape-measure");
const main = document.getElementsByTagName('main')[0];
const touch = "ontouchstart" in window ||
window.DocumentTouch && document instanceof DocumentTouch;
let offsetY = 0;

const cache = {
  viewport: {},
  rects: [],
  node: {} };


// init
window.addEventListener("load", init);

function init() {
  // update the cache and check scroll position
  recache();

  // hide the scrollbar
  const barWidth = getScrollBarWidth();
  main.style.paddingRight = `${barWidth}px`;

  // allow dragging
  tapeBody.addEventListener(touch ? "touchstart" : "mousedown", down);

  // throttle the scroll callback for performance
  main.addEventListener("scroll", touch ? scrollCheck : throttle(scrollCheck, 10));

  // debounce the resize callback for performance
  window.addEventListener("resize", debounce(recache, 50));
};

const move = e => {
  const x = (touch ? e.touches[0].pageY : e.pageY) - offsetY;
  const offset = getScrollOffset();
  const height = cache.document.height - cache.viewport.height;
  const width = cache.viewport.height - cache.node.height;
  const progress = x / width * height;

  main.scrollTop = progress;
};

const up = e => {
  main.style.scrollBehavior = "";
  if (touch) {
    document.removeEventListener("touchmove", move);
    document.removeEventListener("touchend", up);
    document.removeEventListener("touchcancel", up);
  } else {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  }
};

const down = e => {
  recache();

  offsetY = (touch ? e.touches[0].pageY : e.pageY) - cache.node.top;

  // setting scrollTop/Left with "scroll-behavior: smooth" causes monster jank
  main.style.scrollBehavior = "auto";

  if (touch) {
    document.addEventListener("touchmove", move);
    document.addEventListener("touchend", up);
    document.addEventListener("touchcancel", up);
  } else {
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }

  e.preventDefault();
};

// update the cache and check scroll position
function recache() {
  // cache the viewport dimensions
  cache.viewport = {
    width: window.innerWidth,
    height: window.innerHeight };


  cache.document = {
    height: main.scrollHeight,
    width: main.scrollWidth };


  cache.node = tapeBody.getBoundingClientRect();

  scrollCheck();
}

// check whether a node is at or above the horizontal halfway mark
function scrollCheck() {
  const offset = getScrollOffset();
  const height = cache.document.height - cache.viewport.height;
  const width = cache.viewport.height - cache.node.height;
  const progress = offset.y / height * width;

  tapeBody.style.transform = `translate3d(0, ${progress}px,0)`;
  tapeMeasure.style.height = `${progress}px`;
};

// get the scroll offsets
function getScrollOffset() {
  return {
    x: main.scrollLeft,
    y: main.scrollTop };

};

// throttler
function throttle(fn, limit, context) {
  let wait;
  return function () {
    context = context || this;
    if (!wait) {
      fn.apply(context, arguments);
      wait = true;
      return setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
};

// debouncer
function debounce(fn, limit, u) {
  let e;
  return function () {
    const i = this;
    const o = arguments;
    const a = u && !e;
    clearTimeout(e),
    e = setTimeout(function () {
      e = null, u || fn.apply(i, o);
    }, limit),
    a && fn.apply(i, o);
  };
}


/**
 * Get native scrollbar width
 * @return {Number} Scrollbar width
 */
function getScrollBarWidth() {
  const db = document.body;
  const div = document.createElement("div");
  let t = 0;
  return div.style.cssText = "width: 100; height: 100; overflow: scroll; position: absolute; top: -9999;", document.body.appendChild(div), t = div.offsetWidth - div.clientWidth, document.body.removeChild(div), t;
};