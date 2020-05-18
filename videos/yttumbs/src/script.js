const userInput = document.getElementById("userInput"),
  txtareaCol = document.getElementsByTagName("textarea"),
  imageContainer = document.getElementById("imageContainer");

userInput.value = `https://youtu.be/PkZNo7MFNFg\nhttps://youtu.be/uMuYaES4W3o\nhttps://youtu.be/TlB_eWDSMt4\nhttps://youtu.be/u_vMChpZMCk\nhttps://youtu.be/484iWaZQJbo\nhttps://youtu.be/NgGLFozNM2o\nhttps://youtu.be/VjcEBbmJWEw\nhttps://youtu.be/ss10re-tjwo\nhttps://youtu.be/j8eBXGPl_5E\nhttps://youtu.be/OVHE6C3XQy0\nhttps://youtu.be/MflUMIeADZU\nhttps://youtu.be/Mus_vwhTCq0\n`;

let dataArray;
// const divtemp = `<div class='images'><a target='_blank' href="https://youtu.be/PkZNo7MFNFg"><img src="https://i.ytimg.com/vi/TlB_eWDSMt4/mqdefault.jpg" alt=""></a></div>`;

function submit() {
  let divList = "";
  let data = userInput.value;
  dataArray = data.split("\n");
  for (i = 0; i < dataArray.length; i++) {
    if (dataArray[i] !== "") {
      // GET LINKS AND THUMNAILS
      let linkurl = dataArray[i];
      let thumb = thumbnailURL(dataArray[i]);

      divList += `<div class='images'><a target='_blank' href="${linkurl}"><img src="${thumb}" alt=""></a></div>`;
    }
  }
  imageContainer.innerHTML = divList;
}

function clearAll() {
  userInput.value = "";
  imageContainer.innerHTML = "";
}

function thumbnailURL(link) {
  let linkurl = link;
  let strippedLink = link.replace("https://youtu.be/", "");
  let result = `https://i.ytimg.com/vi/${strippedLink}/mqdefault.jpg`;
  return result;
}

function copyLink() {
  if (inputBox.value !== "") {
    inputBox.select();
    document.execCommand("copy");
    alert("Copied Link: " + inputBox.value);
  }
}
