// Calendar by Valerio Capello -- http://labs.geody.com/ -- r2018-04-23 fr2018-04-23 fr(a)2018-02-06

function numDaysMonth(m,y) {
switch (m) {
default:
r=0;
break;
case 1: case 3: case 5: case 7: case 8: case 10: case 12:
r=31;
break;
case 4: case 6: case 9: case 11:
r=30;
break;
case 2:
if (leapYr(y)) {r=29;} else {r=28;}
break;
}
return r;
}


function prez(n) {
return n<10?'0'+n:''+n;
}

function calendarNow(tx,dwf,divid) {
var ndateObj=new Date();
if (tx==0) {
calendar(ndateObj.getDate(),ndateObj.getMonth()+1,ndateObj.getFullYear(),dwf,divid);
} else {
calendar(ndateObj.getUTCDate(),ndateObj.getUTCMonth()+1,ndateObj.getUTCFullYear(),dwf,divid);
}
}

function calendar(d,m,y,dwf,divid) {
var cal_dayhol=7; // Festive Weekday
var cal_dayholpre=(cal_dayhol-1); if (cal_dayholpre==0) {cal_dayholpre=7;} // Pre-Festive Weekday
var cal_shwdaymp=true; // Show days of the previous month
var cal_shwdaymn=cal_shwdaymp; // Show days of the next month
var cal_daytooltip=false; // Show tooltip with the date when hovering on a calendar day
var cal_selday=true; // Select a day and put it into an input field
var cal_datesep='-'; // Date Separator
var cal_datesep2=','; // Date Separator for the selected day in the input field
var tx=0; // 0: Local Time, 1: UTC

var ndateObj=new Date();
if (tx==0) {
var todd=ndateObj.getFullYear()+prez(ndateObj.getMonth()+1)+prez(ndateObj.getDate());
} else {
var todd=ndateObj.getUTCFullYear()+prez(ndateObj.getUTCMonth()+1)+prez(ndateObj.getUTCDate());
}

if (dwf<1) {dwf=1;}
if (dwf>7) {dwf=7;}
if (y==0) {y=1;}
ypp=y-1; if (ypp<0) {ypp=-1;}
ynn=y+1;
yp=y; mp=m-1; if (mp<1) {mp=12; --yp; if (yp==0) {yp=-1;} }
yn=y; mn=m+1; if (mn>12) {mn=1; ++yn;}
fdmwd=dayWeek(1,m,y);
fdpos=(fdmwd-cal_dwfirst+1); if (fdpos<1) {fdpos-=7;}
ldm=numDaysMonth(m,y);
ldmp=numDaysMonth(mp,yp);
// document.writeln("<br />"+fdmwd+' , '+cal_dwfirst+' , '+fdpos+"<br />");
var ous='';
// ous+=todd+'<br />';
ous+='<table border="0" cellpadding="2" cellspacing="2">';
ous+='<tr><th colspan="7" class="elh1">'+es_dmms[m-1]+' '+y+'</th></tr>';
ous+='<tr><td class="elcmd">'+'<a href="javascript:calendar('+d+','+m+','+ypp+','+dwf+',\''+divid+'\');" class="button_up">'+'«'+'</a>'+'</td><td class="elcmd">'+'<a href="javascript:calendar('+d+','+mp+','+yp+','+dwf+',\''+divid+'\');" class="button_up">'+'‹'+'</a>'+'</td><td colspan="3" class="elcmdb">'+'<a href="javascript:calendarNow('+'0'+','+dwf+',\''+divid+'\');" class="button_up">'+es_today+'</a>'+'</td><td class="elcmd">'+'<a href="javascript:calendar('+d+','+mn+','+yn+','+dwf+',\''+divid+'\');" class="button_up">'+'›'+'</a>'+'</td><td class="elcmd">'+'<a href="javascript:calendar('+d+','+m+','+ynn+','+dwf+',\''+divid+'\');" class="button_up">'+'»'+'</a>'+'</td></tr>';
ous+='<tr>';
for (j=1;j<=7;j++) {
jwd=(j+dwf-2)%7;
ous+='<td class="';
// if (j==cal_dayhol) {ous+='elwklabhol';} else if (j==cal_dayholpre) {ous+='elwklabholpre';} else {ous+='elwklab';}
if (jwd==cal_dayhol-1) {ous+='elwklabhol';} else if (jwd==cal_dayholpre-1) {ous+='elwklabholpre';} else {ous+='elwklab';}
ous+='">'+es_dwds2[jwd]+'</td>';
}
ous+='</tr>';
curd=1; curdn=1; j1=1; mwkok=true;
while (mwkok) {
ous+='<tr>';
for (j=1;j<=7;j++) {
jwd=(j+dwf-2)%7;
ous+='<td class="elcal';
// if (j==cal_dayhol) {ous+='elcal_dayhol';} else if (j==cal_dayholpre) {ous+='elcal_dayholpre';} else {ous+='elday';}

var curdd=yp+prez(m)+prez(curd);

if (j1==1 && j<fdpos) {ous+=' elcal_dmnpre';} else if (curd>ldm) {ous+=' elcal_dmnnxt';}

if (jwd==cal_dayhol-1) {ous+=' elcal_dayhol';} else if (jwd==cal_dayholpre-1) {ous+=' elcal_dayholpre';} else {ous+=' elday';}
if (curdd==todd) {ous+=' elcaltoday';}
ous+='"';
if (j1==1) {
if (j<fdpos) {
if (cal_shwdaymp) {
if (cal_daytooltip) {ous+=' title="'+yp+cal_datesep+mp+cal_datesep+(ldmp-fdpos+j+1)+'"';}
if (cal_selday) {ous+=' onClick="javascript:selday(\''+(ldmp-fdpos+j+1)+"'"+cal_datesep2+"'"+mp+"'"+cal_datesep2+"'"+yp+'\',\''+divid+'\');" style="cursor: pointer;"';}
ous+='">'; ous+=ldmp-fdpos+j+1;}
} else {
if (cal_daytooltip) {ous+=' title="'+y+cal_datesep+m+cal_datesep+curd+'"';}
if (cal_selday) {ous+=' onClick="javascript:selday(\''+curd+"'"+cal_datesep2+"'"+m+"'"+cal_datesep2+"'"+y+'\',\''+divid+'\');" style="cursor: pointer;"';}
ous+='>'; ous+=curd; ++curd;
}
} else {
if (curd<=ldm) {
if (cal_daytooltip) {ous+=' title="'+y+cal_datesep+m+cal_datesep+curd+'"';}
if (cal_selday) {ous+=' onClick="javascript:selday(\''+curd+"'"+cal_datesep2+"'"+m+"'"+cal_datesep2+"'"+y+'\',\''+divid+'\');" style="cursor: pointer;"';}
ous+='>'; ous+=curd; ++curd;} else {
if (cal_shwdaymn) {
if (cal_daytooltip) {ous+=' title="'+yn+cal_datesep+mn+cal_datesep+curdn+'"';}
if (cal_selday) {ous+=' onClick="javascript:selday(\''+curdn+"'"+cal_datesep2+"'"+mn+"'"+cal_datesep2+"'"+yn+'\',\''+divid+'\');" style="cursor: pointer;"';}
ous+='>'; ous+=curdn; ++curdn;}
}
}
// ous+='<br />'+curdd;
// ous+=' ['+(j1)+','+(j)+']';
ous+='</td>';
}
ous+='</tr>';
if (curd>ldm) {mwkok=false;}
++j1;
}
ous+='</table>';
writeBox(divid,ous);
}

function selday(d,m,y,divid) {
// alert(d+','+m+','+y);
// document.getElementById(divid+'_dat').value=d+','+m+','+y;
// document.getElementById(divid+'_dat').value=dat;
d*=1; m-=1; y*=1;
infoDate(d,m,y,'calinfodate');
}
