console.clear();

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const filterBtn = [...document.querySelectorAll('.filter')];
let interval;

function getVedio(){
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(localMediaStream => {
    console.log(localMediaStream)
    video.srcObject = localMediaStream;
    // video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
  })
  .catch(err =>
    console.error('Oops')
  )
};

function paintToCanvas(){
  const width = video.videoWidth;
  const height = video.videoHeight;
  let filterType = this.dataset.filter || 0;
  console.log(this.dataset, 'hi', filterType);
  
  canvas.width = width;
  canvas.height = height;
  
  clearInterval(interval);

  return interval = setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out
    
    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels 內最底部的陣列每四個為一組，分別代表 RGBA 的數值，一組結束後會接著排下一組
    
    // mess with them
    if(filterType == 1){
      pixels = redEffect(pixels);  
    } else if(filterType == 2){
      pixels = rgbSplit(pixels);
    } else {
      
    }
   
    // ctx.globalAlpha = 0.8;

    // pixels = greenScreen(pixels);
    // put them back
    ctx.putImageData(pixels, 0, 0);
  },16);
}

function takePhoto(){
  // 播放快門聲
  snap.currentTime = 0;
  snap.play();
  
  // 獲得 canvas 內的 data
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.setAttribute('download', 'hello');
  link.innerHTML = `<image src="${data}" alt="Hi">`;
  strip.insertBefore(link, strip.firstChild);
  
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

getVedio();
video.addEventListener('canplay', paintToCanvas);
filterBtn.map(node => node.addEventListener('click', paintToCanvas));