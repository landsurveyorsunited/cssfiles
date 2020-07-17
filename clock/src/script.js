console.clear();

Splitting();

var clock = document.querySelector('.clock');

/* We need zero-led values to help with the tens columns, and to allow for better looping around when reaching '9' */
function leadingZeroString(n){
  return ('0' + n).slice(-2); 
}

function updateTime(){
  var d = new Date();
  var h = leadingZeroString(d.getHours());
  var m = leadingZeroString(d.getMinutes());
  var s = leadingZeroString(d.getSeconds());
  
  clock.style.setProperty('--h1', h[0]);
  clock.style.setProperty('--h2', h);
  clock.style.setProperty('--m1', m[0]);
  clock.style.setProperty('--m2', m);
  clock.style.setProperty('--s1', s[0]);
  clock.style.setProperty('--s2', s); 
}

updateTime();
setInterval(updateTime, 1000);