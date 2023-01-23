navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  webcam.setAttribute("src", URL.createObjectURL(stream));
  webcam.play();
});
let clicking = false;
let context = canvas.getContext("2d");
// https://www.soundjay.com/camera-sound-effect.html
let audio = new Audio("https://www.soundjay.com/mechanical/sounds/camera-shutter-click-01.mp3");
flash.addEventListener("click", handleClick);
async function handleClick() {
  if (clicking) return;
  clicking = true;
  list.innerHTML = "";
  const shots = new Array(4);
  for (let shot of shots) {
    flashLight();
    context.drawImage(webcam, 0, 0, 640, 480);
    shot = dataURItoFile(
      canvas.toDataURL("image/jpeg"),
      `webcam_${Date.now()}`
    );
    render(shot);
    await timeout(1000);
  }
  clicking = false;
}

function flashLight() {
  audio.play();
  flash.animate(
    [
      {
        opacity: 1,
        easing: "ease-out"
      },
      {
        opacity: 0,
        easing: "ease-in"
      }
    ],
    1000
  );
}
function render(shot) {
  const figure = document.createElement("figure");
  const image = new Image();
  const figcaption = document.createElement("figcaption");
  figure.dataset.filename = shot.name;
  image.src = URL.createObjectURL(shot);
  figcaption.innerHTML = "&nbsp;";
  figure.appendChild(image);
  figure.appendChild(figcaption);
  list.appendChild(figure);
}
function timeout(ms) {
  return new Promise(res => setTimeout(res, ms));
}
function dataURItoFile(dataURI, filename) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  let mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  let blob = new Blob([ia], { type: mimeString });

  // http://stackoverflow.com/a/27256755
  return new File([blob], `${filename}.jpg`);
}