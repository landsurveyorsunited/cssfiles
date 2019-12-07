/* JavaScript for the clock only */

function updateTime() {
  var dateInfo = new Date();

  // get computer time
  var hr,
    _min = (dateInfo.getMinutes() < 10) ? "0" + dateInfo.getMinutes() : dateInfo.getMinutes(),
    ampm = (dateInfo.getHours() > 12) ? "PM" : "AM";

  if (dateInfo.getHours() == 0) {
    hr = 12;
  } else if (dateInfo.getHours() > 12) {
    hr = dateInfo.getHours() - 12;
  } else {
    hr = dateInfo.getHours();
  }

  var currentTime = hr + ":" + _min;

  // print time
  document.querySelector(".hm").innerHTML = currentTime;
  document.querySelector(".ampm").innerHTML = ampm;
};

// print time and date once, then update them every second
updateTime();
setInterval(function() {
  updateTime()
}, 1000);