window.onload = function()
{
  var i, a, e = document.getElementById('xSymbols');
  if (e) {
    a = e.getElementsByTagName('a');
    for (i = 0; i < a.length; ++i) {
      a[i].onclick = symOnClick;
    }
  }
};

function symOnClick()
{
  var i = this.href.indexOf('view.php?');
  this.href = 'http://cross-browser.com/x/lib/' + this.href.substr(i);
  return true;
}

/* These are only for convenience because this is an offline package.
   Don't include html like this on a production site.
*/

/*
p (page): 0=other, 1=X, 2=XC, 3=Demos, 4=Docs, 5=Home
r (root): path to root (no trailing slash)
*/
function insert_header(p, r)
{
  var s = "<div id='header'><div id='menubar1'>";

  if (p == 1)
    s += "<b title='You are here'>Library</b>";
  else
    s += "<a href='" + r + "/x/docs/x_index.html' title='X Library Symbol Index'>Library</a>";

  s += "&nbsp;|&nbsp;";

  if (p == 2)
    s += "<b title='You are here'>Tools</b>";
  else
    s += "<a href='" + r + "/x/docs/x_tools.html' title='X Library Build Tools'>Tools</a>";

  s += "&nbsp;|&nbsp;";

/*
  if (p == 3)
    s += "<b title='You are here'>Demos</b>";
  else
    s += "<a href='" + r + "/toys/index.html' title='Demos'>Demos</a>";

  s += "&nbsp;|&nbsp;";

  if (p == 4)
    s += "<b title='You are here'>Docs</b>";
  else
    s += "<a href='" + r + "/talk/index.html' title='Documentation'>Docs</a>";

  s += "&nbsp;|&nbsp;";
*/

  s += "<a href='http://cross-browser.com/forums/' title='X Library Support Forums (online)'>Forums</a>";
  s += "&nbsp;|&nbsp;";

  if (p == 5)
    s += "<b title='You are here'>Home</b>";
  else
    s += "<a href='" + r + "/index.html' title='Offline Home Page'>Home</a>";

  s += "</div><h1>Cross-Browser.com (offline)</h1></div>";

  document.write(s);
}

function insert_footer(r)
{
  var s = "<div id='footer' class='leftContent'>"
  s += "Copyright &copy; 2001-2011 Michael Foster<br>Javascript distributed under the terms of the <a href='";
  s += r + "/license.html'>GNU LGPL</a></div>";
  document.write(s);
}

function insert_sidebar(r)
{
  var s = '';

  s += "<h3>Documentation</h3>";
  s += "<div>";
  s += get_doc_links(r);
  s += "</div>";
  s += "<h3>Demos</h3>";
  s += "<div>";
  s += get_demo_links(r);
  s += "</div>";
  s += "<h3>Developer Support</h3>";
  s += "<div>";
  s += "<p><a href='http://cross-browser.com/forums/'>X Library Support Forums</a> (online)</p>";
  s += "</div>";
  s += "<h3>License</h3>";
  s += "<div>";
  s += "<p>By your use of <b>X</b> or any Javascript from cross-browser.com you consent to the <a href='http://www.gnu.org/licenses/licenses.html#LGPL'>GNU LGPL</a> - please <a href='" + r + "/license.html'>read it</a>.</p>";
  s += "</div>";
  s += "<h3>About Cross-Browser.com</h3>";
  s += "<div>";
  s += "<p>Cross-Browser.com is the home of <b>X</b> - a cross-browser Javascript library, and many <span title='Toys'>demos, applications</span>, <span title='Talk'>articles and documentation</span>.</p>";
  s += "</div>";
  s += "<h3>User Projects</h3>";
  s += "<div>";
  s += "<p>If you are using <b>X</b> or anything from Cross-Browser.com, come show it off in the <a href='http://cross-browser.com/forums/viewforum.php?id=6'>X&nbsp;Showcase</a> forum.</p>";
  s += "</div>";
  s += "<h3>Browser Support</h3>";
  s += "<div>";
  s += "<p>The <b>X</b> core is designed to work with <span class='titleHover' title='Support for NN4 has been removed. Support for Opera 5/6 quirks has been removed'>all browsers</span>, Object-detection instead of browser-detection is used <span class='titleHover' title='Well... almost ;-)'>exclusively</span>. Currently, I'm testing with the following browsers. <b>X</b> has been tested by others on a wide variety of platforms.</p>";
  s += "<p>Win7 (Home): <i>IE 9</i>.</p>";
  s += "<p>WinXP (SP3): <i>Chrome 3.0.195.38, Firefox 3.5.5, IE 7 &amp; 8, Opera 10.60 and Safari 4.0.3</i>.</p>";
  s += "<p>Linux (Ubuntu 9.10): <i>Chrome 4.0.249.43 and FireFox 3.5.7</i>.</p>";
  s += "</div>";
  document.write(s);
}

function get_doc_links(r)
{
  var s = '';
  s += "<p><a href='http://cross-browser.com/x/lib/'>X Library Viewer</a> (online) - View documentation, source code, revision history and more for all X symbols.</p>";
  s += "<p><a href='" + r + "/x/docs/x_index.html'>X Index</a> - Index of all X Library symbols.</p>";
  s += "<p><a href='" + r + "/x/docs/x_quickstart.html'>X Quick-Start</a> - Getting started with the X Library.</p>";
  s += "<p><a href='" + r + "/x/docs/x_tutorial.html'>X Tutorial</a> - Collapsible/expandable sections.</p>";
  s += "<p><a href='" + r + "/x/docs/x_structure.html'>X Structure</a> - Describes how an X symbol is defined by an xml and js file.</p>";
  s += "<p><a href='" + r + "/x/docs/x_tools.html'>X Tools</a> - Summary and revision history for the X build tool chain.</p>";
  s += "<p><a href='" + r + "/x/docs/xag_reference.html'>XAG Reference</a> - X Library Aggregator.</p>";
  s += "<p><a href='" + r + "/x/docs/xpp_reference.html'>XPP Reference</a> - General Purpose Text Preprocessor.</p>";
  return s;
}

function get_demo_links(r)
{
  var s = '';
  s += "<p>This offline package only includes a few demos. See all the <a href='http://cross-browser.com/toys/'>X Library Demos</a> at cross-browser.com!</p>";
  s += "<p><b>Misc</b></p>";
  s += "<p><a href='" + r + "/x/examples/xcalendar.html'>xCalendar</a> - A popup date-picker with support for date ranges.</p>";
  s += "<p><a href='" + r + "/x/examples/demo1.html'>demo1</a> - This is the demo for the tutorial.</p>";
  s += "<p><a href='" + r + "/x/examples/pick-a-card.html'>Pick a card 1</a> and <a href='" + r + "/x/examples/pick-a-card-2.html'>Pick a card 2</a> - xEnableDrag demos.</p>";
  s += "<p><a href='" + r + "/x/examples/xanimation.sizeline.html'>xAnimation.sizeLine</a> - Perform a sequence of animations of an element's position and size.</p>";
  s += "<p><a href='" + r + "/x/examples/tabpanelgroup.html'>xTabPanelGroup</a> - Downgradeable, accessible, tabbed panels.</p>";
  s += "<p><b>xFenster</b></p>";
  s += "<p><a href='" + r + "/x/examples/xfenster1.html'>xFenster demo 1</a> - Fixed fensters from DIVs.</p>";
  s += "<p><a href='" + r + "/x/examples/xfenster2.html'>xFenster demo 2</a> - Absolute fensters from IFRAMEs.</p>";
  s += "<p><a href='" + r + "/x/examples/xfenster3.html'>xFenster demo 3</a> - Absolute fensters from DIVs, in a fence.</p>";
  s += "<p><a href='" + r + "/x/examples/xfenster4.html'>xFenster demo 4</a> - Fensters with a \"control menu\".</p>";
  s += "<p><b>xTableHeaderFixed</b></p>";
  s += "<p><a href='" + r + "/x/examples/xthf1.html'>xTableHeaderFixed demo 1</a> - The container is the window object.</p>";
  s += "<p><a href='" + r + "/x/examples/xthf2.html'>xTableHeaderFixed demo 2</a> - Multiple tables in a scrollable DIV container.</p>";
  s += "<p><a href='" + r + "/x/examples/xthf3.html'>xTableHeaderFixed demo 3</a> - Each table has its own scrollable DIV as a container.</p>";
  s += "<p>There are more <a href='http://cross-browser.com/x/examples/xthf-demo.php'>xTableHeaderFixed demos</a> available online.</p>";
  return s;
}

function insert_xthf_tables(n)
{
  var t1, t2, t3, s = '', cs = '';
  cs =  "cellSpacing='0'";

  t1 = (n == 0 ? "<h4>Table 1</h4>" : "")
+ "<table class='xthf-site'" + cs + ">"
+ "<thead>"
+ "<tr><th>T1Col0</th><th>T1Col1</th><th>T1Col2</th><th>T1Col3</th><th>T1Col4</th><th>T1Col5</th><th>T1Col6</th></tr>"
+ "</thead>"
+ "<tbody>"
+ "<tr><td>r0c0</td><td>r0c1</td><td>Fix those headers!</td><td>r0c3</td><td>r0c4</td><td>r0c5</td><td>r0c6</td></tr>"
+ "<tr><td>r1c0</td><td>r1c1</td><td>r1c2</td><td>r1c3</td><td>r1c4</td><td>r1c5</td><td>r1c6</td></tr>"
+ "<tr><td>r2c0</td><td>r2c1</td><td>r2c2</td><td>r2c3</td><td>r2c4</td><td>r2c5</td><td>r2c6</td></tr>"
+ "<tr><td>r3c0</td><td>r3c1</td><td>r3c2</td><td>r3c3</td><td>r3c4</td><td>r3c5</td><td>r3c6</td></tr>"
+ "<tr><td>r4c0</td><td>r4c1</td><td>r4c2</td><td>r4c3</td><td>r4c4</td><td>r4c5</td><td>r4c6</td></tr>"
+ "<tr><td>r5c0</td><td>r5c1</td><td>r5c2</td><td>r5c3</td><td>r5c4</td><td>r5c5</td><td>r5c6</td></tr>"
+ "<tr><td>r6c0</td><td>r6c1</td><td>r6c2</td><td>r6c3</td><td>r6c4</td><td>r6c5</td><td>r6c6</td></tr>"
+ "<tr><td>r7c0</td><td>r7c1</td><td>r7c2</td><td>r7c3</td><td>r7c4</td><td>r7c5</td><td>r7c6</td></tr>"
+ "<tr><td>I admit it - I'm a Javascript junkie.</td><td>r8c1</td><td>r8c2</td><td>r8c3</td><td>r8c4</td><td>r8c5</td><td>r8c6</td></tr>"
+ "<tr><td>r9c0</td><td>r9c1</td><td>r9c2</td><td>r9c3</td><td>r9c4</td><td>r9c5</td><td>r9c6</td></tr>"
+ "<tr><td>rAc0</td><td>rAc1</td><td>rAc2</td><td>rAc3</td><td>rAc4</td><td>rAc5</td><td>rAc6</td></tr>"
+ "<tr><td>rBc0</td><td>rBc1</td><td>rBc2</td><td>rBc3</td><td>rBc4</td><td>rBc5</td><td>rBc6</td></tr>"
+ "<tr><td>rCc0</td><td>rCc1</td><td>rCc2</td><td>rCc3</td><td>rCc4</td><td>rCc5</td><td>Long tables are now fun!</td></tr>"
+ "<tr><td>rDc0</td><td>rDc1</td><td>rDc2</td><td>rDc3</td><td>rDc4</td><td>rDc5</td><td>rDc6</td></tr>"
+ "<tr><td>rEc0</td><td>rEc1</td><td>rEc2</td><td>rEc3</td><td>rEc4</td><td>rEc5</td><td>rEc6</td></tr>"
+ "<tr><td>rFc0</td><td>rFc1</td><td>rFc2</td><td>rFc3</td><td>rFc4</td><td>rFc5</td><td>rFc6</td></tr>"
+ "</tbody>"
+ "</table>";

  t2 = (n == 0 ? "<h4>Table 2</h4>" : "")
+ "<table class='xthf-green'" + cs + ">"
+ "<thead>"
+ "<tr><th>T2Col0</th><th>T2Col1</th><th>Table 2 Column 2</th><th>Table 2 Column 3</th><th>T2Col4</th><th>T2Col5</th><th>T2Col6</th></tr>"
+ "</thead>"
+ "<tbody>"
+ "<tr><td>r0c0</td><td>r0c1</td><td>r0c2</td><td>r0c3</td><td>xTableHeaderFixed0</td><td>r0c5</td><td>r0c6</td></tr>"
+ "<tr><td>r1c0</td><td>r1c1</td><td>r1c2</td><td>r1c3</td><td>r1c4</td><td>r1c5</td><td>r1c6</td></tr>"
+ "<tr><td>r2c0</td><td>r2c1</td><td>r2c2</td><td>r2c3</td><td>r2c4</td><td>r2c5</td><td>r2c6</td></tr>"
+ "<tr><td>xTableHeaderFixed1</td><td>r3c1</td><td>r3c2</td><td>r3c3</td><td>r3c4</td><td>r3c5</td><td>r3c6</td></tr>"
+ "<tr><td>r4c0</td><td>r4c1</td><td>r4c2</td><td>r4c3</td><td>r4c4</td><td>r4c5</td><td>r4c6</td></tr>"
+ "<tr><td>r5c0</td><td>r5c1</td><td>r5c2</td><td>r5c3</td><td>r5c4</td><td>r5c5</td><td>r5c6</td></tr>"
+ "<tr><td>r6c0</td><td>r6c1</td><td>r6c2</td><td>r6c3</td><td>r6c4</td><td>r6c5</td><td>r6c6</td></tr>"
+ "<tr><td>r7c0</td><td>r7c1</td><td>r7c2</td><td>r7c3</td><td>r7c4</td><td>r7c5</td><td>r7c6</td></tr>"
+ "<tr><td>r8c0</td><td>r8c1</td><td>xTableHeaderFixed2</td><td>r8c3</td><td>r8c4</td><td>r8c5</td><td>r8c6</td></tr>"
+ "<tr><td>r9c0</td><td>r9c1</td><td>r9c2</td><td>r9c3</td><td>r9c4</td><td>r9c5</td><td>r9c6</td></tr>"
+ "<tr><td>rAc0</td><td>rAc1</td><td>rAc2</td><td>rAc3</td><td>rAc4</td><td>rAc5</td><td>rAc6</td></tr>"
+ "<tr><td>rBc0</td><td>rBc1</td><td>rBc2</td><td>rBc3</td><td>rBc4</td><td>rBc5</td><td>rBc6</td></tr>"
+ "<tr><td>rCc0</td><td>rCc1</td><td>rCc2</td><td>rCc3</td><td>rCc4</td><td>rCc5</td><td>rCc6</td></tr>"
+ "<tr><td>rDc0</td><td>rDc1</td><td>rDc2</td><td>rDc3</td><td>rDc4</td><td>rDc5</td><td>rDc6</td></tr>"
+ "<tr><td>rEc0</td><td>rEc1</td><td>rEc2</td><td>rEc3</td><td>rEc4</td><td>rEc5</td><td>rEc6</td></tr>"
+ "<tr><td>rFc0</td><td>rFc1</td><td>rFc2</td><td>rFc3</td><td>rFc4</td><td>rFc5</td><td>xTableHeaderFixed3</td></tr>"
+ "</tbody>"
+ "</table>";

  t3 = (n == 0 ? "<h4>Table 3</h4>" : "")
+ "<table class='xthf-blue'" + cs + ">"
+ "<thead>"
+ "<tr><td colspan='2'>Group 1</td><td colspan='3'>Group 2</td><td colspan='2'>Group 3</td></tr>"
+ "<tr><th>T3Col0</th><th>T3Col1</th><th>T3Col2</th><th>T3Col3</th><th>T3Col4</th><th>T3Col5</th><th>T3Col6</th></tr>"
+ "</thead>"
+ "<tbody>"
+ "<tr><td>r0c0</td><td>r0c1</td><td>r0c2</td><td>r0c3</td><td>r0c4</td><td>r0c5</td><td>r0c6</td></tr>"
+ "<tr><td>r1c0</td><td>r1c1</td><td>r1c2</td><td>r1c3</td><td>r1c4</td><td>r1c5</td><td>r1c6</td></tr>"
+ "<tr><td>r2c0</td><td>r2c1</td><td>CSS 2.1 <a href='http://www.w3.org/TR/CSS21/propidx.html'>Property Table</a></td><td>r2c3</td><td>r2c4</td><td>r2c5</td><td>r2c6</td></tr>"
+ "<tr><td>It makes a copy of the table's THEAD section.</td><td>r3c1</td><td>r3c2</td><td>r3c3</td><td>r3c4</td><td>r3c5</td><td>r3c6</td></tr>"
+ "<tr><td>r4c0</td><td>r4c1</td><td>r4c2</td><td>r4c3</td><td>r4c4</td><td>r4c5</td><td>r4c6</td></tr>"
+ "<tr><td>r5c0</td><td>The position and size of the THEAD copy will be adjusted when the window is resized.</td><td>r5c2</td><td>r5c3</td><td>r5c4</td><td>r5c5</td><td>r5c6</td></tr>"
+ "<tr><td>r6c0</td><td>r6c1</td><td>r6c2</td><td>r6c3</td><td>r6c4</td><td>r6c5</td><td>r6c6</td></tr>"
+ "<tr><td>r7c0</td><td>r7c1</td><td>r7c2</td><td>r7c3</td><td>This object is being <a href='http://cross-browser.com/forums/viewtopic.php?id=611'>discussed</a> at the X forums.</td><td><h2>I am an H2</h2></td><td>r7c6</td></tr>"
+ "<tr><td>r8c0</td><td>r8c1</td><td>r8c2</td><td>r8c3</td><td>r8c4</td><td>r8c5</td><td>r8c6</td></tr>"
+ "<tr><td>r9c0</td><td>r9c1</td><td>r9c2</td><td>r9c3</td><td>r9c4</td><td>r9c5</td><td>r9c6</td></tr>"
+ "<tr><td>rAc0</td><td>rAc1</td><td>rAc2</td><td>The THEAD copy uses the same CSS class you provide for the static table.</td><td>rAc4</td><td>rAc5</td><td>rAc6</td></tr>"
+ "<tr><td>rBc0</td><td>rBc1</td><td>rBc2</td><td>rBc3</td><td>rBc4</td><td>rBc5</td><td>rBc6</td></tr>"
+ "<tr><td>rCc0</td><td>rCc1</td><td><img src='../../images/scope_day.jpg'></td><td>rCc3</td><td>rCc4</td><td>rCc5</td><td>rCc6</td></tr>"
+ "<tr><td>rDc0</td><td><img src='../../images/x-25x25.gif'></td><td>rDc2</td><td>rDc3</td><td>rDc4</td><td>rDc5</td><td>rDc6</td></tr>"
+ "<tr><td>rEc0</td><td>rEc1</td><td>rEc2</td><td>rEc3</td><td>rEc4</td><td>The container can be a window object or scrollable Element object.</td><td>rEc6</td></tr>"
+ "<tr><td>rFc0</td><td>rFc1</td><td>rFc2</td><td>rFc3</td><td>rFc4</td><td>rFc5</td><td><a href='https://developer.mozilla.org/'>Mozilla Developer Center</a></td></tr>"
+ "</tbody>"
+ "</table>";

  switch (n) {
    case 0:
      s = t1 + t2 + t3;
      break;
    case 1:
      s = t1;
      break;
    case 2:
      s = t2;
      break;
    case 3:
      s = t3;
      break;
  }
  document.write(s);
}
