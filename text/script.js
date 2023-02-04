const textarea = document.querySelector("#textarea");
  const startButton = document.querySelector("#start-button");
  const recognition = new webkitSpeechRecognition();
  /* default browser langage */
  recognition.lang = "fr-FR"; // French
  //recognition.lang = "en-US"; // English
  recognition.interimResults = true;
  startButton.addEventListener("click", function(event) {
    event.preventDefault()
    recognition.start();
    //event.preventDefault();
    //return false; // GC
  });
  recognition.onresult = function(event) {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        //alert('isfinal');
        // textarea.value += transcript;
        textarea.value += transcript + " "; // GC add space at the end result
      } else {
        interimTranscript += transcript;
      }
    }
  };
  
  
  /* GC change language */

// ...

function changeLanguage(languageCode) {
  recognition.lang = languageCode;
}

//changeLanguage("fr-FR"); // French
//changeLanguage("en-US"); // English
  
/* GC CHATGPT - durée de l'écoute  */
/*
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.start();

recognition.onresult = function(event) {
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      // do something with the final transcript
    } else {
      // do something with the interim transcript
    }
  }
};
*/
  
 //  with time out  
  
//const recognition = new webkitSpeechRecognition();
//recognition.continuous = true;
//recognition.start();

//setTimeout(() => {
//  recognition.stop();
//}, 50000); // stop recognition after 5 seconds

//recognition.onresult = function(event) {
  // handle recognition results
//};

  
  /*  écrire le code en temps réel */
/*
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.start();

const transcribedText = document.getElementById("transcribedText");

recognition.onresult = function(event) {
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      transcribedText.textContent = transcript;
    } else {
      transcribedText.textContent = transcript;
    }
  }
};
*/