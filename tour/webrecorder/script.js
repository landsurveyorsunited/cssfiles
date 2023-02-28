let start = document.getElementById('start'),
    stop  = document.getElementById('stop'),
    mediaRecorder;

start.addEventListener('click', async function(){
    let stream = await recordScreen();
    let mimeType = 'video/mp4';
    mediaRecorder = createRecorder(stream, mimeType);
  let node = document.createElement("p");
    node.textContent = "Started recording";
    document.body.appendChild(node);
})

stop.addEventListener('click', function(){
    mediaRecorder.stop();
    let node = document.createElement("p");
    node.textContent = "Stopped recording";
    document.body.appendChild(node);
})

async function recordScreen() {
    return await navigator.mediaDevices.getDisplayMedia({
        audio: true, 
        video: { mediaSource: "screen"}
    });
}

function createRecorder (stream, mimeType) {
  // the stream data is stored in this array
  let recordedChunks = []; 

  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }  
  };
  mediaRecorder.onstop = function () {
     saveFile(recordedChunks);
     recordedChunks = [];
  };
  mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
  return mediaRecorder;
}

function saveFile(recordedChunks){

   const blob = new Blob(recordedChunks, {
      type: 'video/mp4'
    });
    let filename = window.prompt('Enter your video file name'),
        downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${filename}.mp4`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(blob); // clear from memory
    document.body.removeChild(downloadLink);
}