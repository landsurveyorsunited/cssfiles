const arrow = document.querySelector(".arrow");
const speed = document.querySelector(".speed-value");
const coords = document.querySelector('.coords');

navigator.geolocation.watchPosition(
  data => {
    // console.log(data);
    speed.textContent = data.coords.speed || 0;
    arrow.style.transform = `rotate(${data.coords.heading || 0}deg)`;
    coords.innerHTML = `
      <span>Lat: ${data.coords.latitude}</span> | <span>Long: ${data.coords.longitude}</span>
    `;
  },
  err => {
    console.error(`Error while connecting to device navigation: ${err}`);
    alert(
      "You need to provide access to your device compass and location in order for this demo to work."
    );
  }
);