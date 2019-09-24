/* A Cross-Browser.com X demo.
   layout8 rev 2
*/

document.write("<link rel='stylesheet' type='text/css' href='layout8x.css'>");

xAddEventListener(window, 'load',
  function() {
    pgShow('Content1');
    xIterate('ContentLink', 1, null, function(e){e.onclick = navOnClick;});
  }, false
);

function navOnClick()
{
  var id = this.href.substr(this.href.indexOf('#') + 1);
  pgShow(id);
  return false;
}
function pgShow(id)
{
  var c, s, h, el = xGetElementById;
  xIterate('Content', 1, id,
    function(e, d) {
      xMoveTo(e, -500, 0);
      e.style.display = 'none';
    }
  );
  c = el(id);
  c.style.display = 'block';
  c.style.height = 'auto';
  s = el('SideBar');
  s.style.height = 'auto';
  h = Math.max(xHeight(s), xHeight(c));
//alert('h: ' + h + '\ns: ' + xHeight(s) + '\nc: ' + xHeight(c));
  xHeight('PgBody', h);
  xHeight(s, h);
  xHeight(c, h);
  xAniLine(c, 250, 0, 1000, 1);
}
/*
  Iterate over all elements with the same idPrefix and a sequential,
  numeric suffix beginning with start. fn is called for each element
  and passed the element and data.
*/
function xIterate(idPrefix, start, data, fn)
{
  var i = start, e = xGetElementById(idPrefix + i);
  while (e) {
    fn(e, data);
    e = xGetElementById(idPrefix + (++i));
  }
}
