// JXEyes
// by Valerio Capello - http://labs.geody.com - r2018-03-12 fr2018-02-15

var jxeyeso=null, jxeye1=null, jxeye2=null;
var xbody = (document.compatMode=="CSS1Compat") ? document.documentElement : document.body;


function getitem(id) {
itm=document.getElementById(id);
if (!itm) {var itm=document[id]; for (i=0; !itm && itm<document.forms.length; ++itm) {itm=document.forms[i][id];}}
return itm;
}

function jxeyesmov(mx,my) {
if (shwface) {
if (jxeyeso && jxeye1 && jxeye2 && jxeyeso.style) {
var ex=jxeyeso.offsetLeft; var ey=jxeyeso.offsetTop; var dx=mx-ex; var dy=my-ey;
r=(dx*dx/jxeyemw+dy*dy/jxeyemh<1) ? 1 : Math.sqrt(jxeyemw*jxeyemh/(dx*dx*jxeyemh+dy*dy*jxeyemw));
jxeye1.style.left=r*dx+jxeye1pl+'px'; jxeye1.style.top=r*dy+jxeye1pt+'px';
dx-=jxxeyes;
r=(dx*dx/jxeyemw+dy*dy/jxeyemh<1) ? 1 : Math.sqrt(jxeyemw*jxeyemh/(dx*dx*jxeyemh+dy*dy*jxeyemw));
jxeye2.style.left=r*dx+jxeye2pl+'px'; jxeye2.style.top=r*dy+jxeye2pt+'px';
} else {
var ex=0; var ey=0; var dx=0; var dy=0; 
}
}
if (shwmcoords) {
if (mx<0) {mx=0;}
if (my<0) {my=0;}
document.getElementById('mousepos').innerHTML=mx+' , '+my;
}
}

function jxeyes(xp,yp) {
if (xp!==false && yp!==false) {ipos=true;} else {ipos=false;}
if (shwface) {
var facepic="";
if (!ipos) {facepic+="<table border='0' cellpadding='0' cellspacing='0'><tr><td>";}
facepic+="<div id='jxface' style='position:"+(ipos ? "absolute; left:"+xp+"px; top:"+yp+"px" : "relative")+
"; z-index:5; width:"+jxfacew+"; height:"+jxfaceh+"; overflow:hidden;'>"+
"<div id='jxeye1' style='position:absolute; left:"+jxeye1pl+"; top:"+jxeye1pt+"; z-index:6; width:"+jxeyew+"; height:"+jxeyeh+";'>"+
"<img src='"+jxeyeimg1+"' width='"+jxeyew+"' height='"+jxeyeh+"' alt='' id='img_jxeye1' />"+
"</div>"+
"<div id='jxeye2' style='position:absolute; left:"+jxeye2pl+"; top:"+jxeye2pt+"; z-index:6; width:"+jxeyew+"; height:"+jxeyeh+";'>"+
"<img src='"+jxeyeimg2+"' width='"+jxeyew+"' height='"+jxeyeh+"' alt='' id='img_jxeye2' />"+
"</div>"+
"<img src='"+jxfaceimg+"' width='"+jxfacew+"' height='"+jxfaceh+"' alt='' title='"+jxsayh+"' id='img_jxface'"
if (jxsayc!=='') {facepic+=" onClick='javascript:alert(\""+jxsayc+"\");'"}
facepic+=" />"+
"</div>";
if (!ipos) {facepic+="</td></tr></table>";}
document.write(facepic);
jxeyeso=getitem('jxface'); jxeye1=getitem('jxeye1'); jxeye2=getitem('jxeye2');
}
if (shwmcoords) {
if (!shwface) {document.write('Mouse'+"<br />");}
document.write('<div id="mousepos" class="mcoords" style="position:'+(ipos ? "absolute; left:"+xp+"px; top:"+(yp+jxfaceh+2)+"px" : "relative")+';">'+'- , -'+'</div>');
}
jxeyesmov(0,0);
document.onmousemove=jxeyeslook;
}

function jxeyeslook(ev) {
jxeyesmov((ev) ? ev.pageX : event.clientX+xbody.scrollLeft,(ev) ? ev.pageY : event.clientY+xbody.scrollTop);
}
