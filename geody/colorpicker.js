// Color Picker

function rgbToHsl(r, g, b) {
r /= 255, g /= 255, b /= 255;
var max = Math.max(r, g, b), min = Math.min(r, g, b);
var h, s, l = (max + min) / 2;

if(max == min){
h = s = 0; // achromatic
}else{
var d = max - min;
s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
switch(max){
case r: h = (g - b) / d + (g < b ? 6 : 0); break;
case g: h = (b - r) / d + 2; break;
case b: h = (r - g) / d + 4; break;
}
h /= 6;
}

return [h, s, l];
}

function hslToRgb(h, s, l) {
var r, g, b;

if(s == 0){
r = g = b = l; // achromatic
}else{
function hue2rgb(p, q, t){
if(t < 0) t += 1;
if(t > 1) t -= 1;
if(t < 1/6) return p + (q - p) * 6 * t;
if(t < 1/2) return q;
if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
return p;
}

var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
var p = 2 * l - q;
r = hue2rgb(p, q, h + 1/3);
g = hue2rgb(p, q, h);
b = hue2rgb(p, q, h - 1/3);
}

return [r * 255, g * 255, b * 255];
}

function rgbToHsv(r, g, b) {
r = r/255, g = g/255, b = b/255;
var max = Math.max(r, g, b), min = Math.min(r, g, b);
var h, s, v = max;

var d = max - min;
s = max == 0 ? 0 : d / max;

if(max == min){
h = 0; // achromatic
}else{
switch(max){
case r: h = (g - b) / d + (g < b ? 6 : 0); break;
case g: h = (b - r) / d + 2; break;
case b: h = (r - g) / d + 4; break;
}
h /= 6;
}

return [h, s, v];
}

function hsvToRgb(h, s, v) {
var r, g, b;

var i = Math.floor(h * 6);
var f = h * 6 - i;
var p = v * (1 - s);
var q = v * (1 - f * s);
var t = v * (1 - (1 - f) * s);

switch(i % 6){
case 0: r = v, g = t, b = p; break;
case 1: r = q, g = v, b = p; break;
case 2: r = p, g = v, b = t; break;
case 3: r = p, g = q, b = v; break;
case 4: r = t, g = p, b = v; break;
case 5: r = v, g = p, b = q; break;
}

return [r * 255, g * 255, b * 255];
}

function sbtStringS(s1,s2,m=true) {
var ous=""; s1+=""; s2+="";
for (var i=1;i<=s1.length;i++) {
var c1=s1.substring(i-1,i);
var c2=s2.indexOf(c1);
if (m) {
if (c2==-1) {ous+=c1;}
} else {
if (c2!=-1) {ous+=c1;}
}
}
return ous;
}


function rgbToCmyk(r, g, b) {
var res = []; 

if (r<1) {r=1;}
if (g<1) {g=1;}
if (b<1) {b=1;}
if (r>255) {r=255;}
if (g>255) {g=255;}
if (b>255) {b=255;}

res[3] = Math.min( 1 - r, 1 - g, 1 - b );
res[0] = ( 1 - r - res[3] ) / ( 1 - res[3] );
res[1] = ( 1 - g - res[3] ) / ( 1 - res[3] );
res[2] = ( 1 - b - res[3] ) / ( 1 - res[3] );

res[0] = Math.round( res[0] * 100 );
res[1] = Math.round( res[1] * 100 );
res[2] = Math.round( res[2] * 100 );
res[3] = Math.round( (res[3]+254) * 100 / 255 );

return res;
}

function cmykToRgb(c, m, y, k) {
var res = []; 

if (c<0) {c=0;}
if (m<0) {m=0;}
if (y<0) {y=0;}
if (k<0) {k=0;}
if (c>100) {c=100;}
if (m>100) {m=100;}
if (y>100) {y=100;}
if (k>100) {k=100;}

res[0] = 1 - Math.min( 1, c * ( 1 - k ) + k );
res[1] = 1 - Math.min( 1, m * ( 1 - k ) + k );
res[2] = 1 - Math.min( 1, y * ( 1 - k ) + k );

res[0] = Math.round( res[0] * 255 );
res[1] = Math.round( res[1] * 255 );
res[2] = Math.round( res[2] * 255 );

return res;
}


// BaseConv

mb=36;

function baseconv(aS,b,ba) {
var rS=aS;
for (var i=1;i==1;i++) {
// if (b==ba) {break;}
if (b==10) {rS=DecObas(aS,ba); break;}
if (ba==10) {rS=ObasDec(aS,b); break;}
var xS=ObasDec(aS,b);
rS=DecObas(xS,ba);
aS=xS;
}
if (leftS(rS,1)=="0" && rS!="0" && ba>1) {rS=midS(rS,2);}
return rS;
}

function DecObas(co,ba) {
var bS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var rS="";
co*=1;
if (ba>1) {
var n=new Array();
var j=1;
for (var i=0;i>=-1;i--) {
var qu=Math.floor(co/ba); var re=co-qu*ba;
n[j]=re; j++; co=qu;
if (co<ba) {i=-2;} i++;}
n[j]=co;
for (var h=j;h>=1;h--) {rS+=midS(bS,n[h]+1,1);}
} else {
for (var h=1;h<=co;h++) {rS+=leftS(bS,1);}
}
return rS;
}

function ObasDec(aS,b) {
aS=aS.toUpperCase();
var bS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var tl=0;
if (b>1) {
var c=0; var dS=""; var v=0;
for (var x=aS.length;x>=1;x--) {
c++; dS=midS(aS,c,1); t=asc(dS);
if (dS>midS(bS,b,1)) {alert("'"+dS+"' doesn't exists in base "+b); break;}
if (t<48||t>90) {break;}
if (t>57&&t<65) {break;}
if (t>64) {v=t-55;}
if (t<58) {v=dS*1;}
if (v>b) {break;}
tl+=v*Math.pow(b,(x-1));
}
} else {
tl=aS.length;
}
return tl;
}

function propor(n,mx,mxp=100) {
return n*mxp/mx;
}

// BASIC Commands
// String

function asc(aS) {
aS+="";
var r=0;
if (aS!="") {
var ascii=" !"+unescape("%22")+"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
var r=ascii.indexOf(aS.substring(0,1))+32; if (r==31) {r=-1;}
}
return r;
}

function leftS(aS,n) {
aS+="";
var rS="";
if (n>=1) {
rS=aS.substring(0,n);
}
return rS;
}

function midS(aS,n,n2) {
aS+="";
var rS="";
if (n2==null || n2=="") {n2=aS.length;}
n*=1; n2*=1;
if (n<0) {n++;}
rS=aS.substring(n-1,n-1+n2);
return rS;
}

function validhex(hnS,hlen=6,fhS='#',ftS='',cas=0,defS='#000000') {
if (fhS.length>0 && hnS.length>fhS.length) {
if (hnS.substring(0,fhS.length)==fhS) {hnS=hnS.substring(fhS.length,hnS.length);}
}

if (ftS.length>0 && hnS.length>ftS.length) {
if (hnS.substring(hnS.length-ftS.length,hnS.length)==ftS) {hnS=hnS.substring(0,hnS.length-ftS.length);}
}

hnvS=sbtStringS(hnS,'0123456789abcdefABCDEF',false);

if (/[0-9a-f]/i.test(hnvS) && (hnvS.length==-1 || hnvS.length==hlen)) {
switch (cas) {
case 0:
default:
break;
case 1:
hnvS=hnvS.toLowerCase();
break;
case 2:
hnvS=hnvS.toLowerCase();
break;
}
r=fhS+hnvS+ftS;
} else {
r=defS;
}

return r;
}

function cpcolpick2colval() {
var vt=validhex(document.console.colpick1.value,6,'#','',1,'#000000');
// alert(vt);
if (document.console.colpick1.value!=vt) {document.console.colpick1.value=vt;}
document.console.colrgbhex.value=document.console.colpick1.value;
}

function cpcolval2colpick() {
var vt=validhex(document.console.colrgbhex.value,6,'#','',1,'#000000');
// alert(vt);
if (document.console.colrgbhex.value!=vt) {document.console.colrgbhex.value=vt;}
document.console.colpick1.value=document.console.colrgbhex.value;
}

function colupdate() {
var vt=validhex(document.console.colpick1.value,6,'','',1,'000000');

var c1h=vt.substring(0,2); var c2h=vt.substring(2,4); var c3h=vt.substring(4,6);

var c1d=ObasDec(c1h,16); var c2d=ObasDec(c2h,16); var c3d=ObasDec(c3h,16);

document.console.colrgbdec.value=c1d+', '+c2d+', '+c3d;

var chsl=rgbToHsl(c1d, c2d, c3d);

document.console.colhsl.value=Math.round(propor(chsl[0],1,360))+', '+Math.round(propor(chsl[1],1,100))+'%, '+Math.round(propor(chsl[2],1,100))+'%';

var chsv=rgbToHsv(c1d, c2d, c3d);

document.console.colhsv.value=Math.round(propor(chsv[0],1,360))+', '+Math.round(propor(chsv[1],1,100))+'%, '+Math.round(propor(chsv[2],1,100))+'%';

var ccmyk=rgbToCmyk(c1d, c2d, c3d);

document.console.colcmyk.value=ccmyk[0]+'%, '+ccmyk[1]+'%, '+ccmyk[2]+'%, '+ccmyk[3]+'%';

}
