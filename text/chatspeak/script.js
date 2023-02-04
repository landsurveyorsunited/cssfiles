// Vérifiez si l'API Web Speech est prise en charge
if ("speechSynthesis" in window) {
  // Référencez les éléments HTML
  var textInput = document.getElementById("text-input");
  var textOutput = document.getElementById("text-output");
  var speakButton = document.getElementById("speak-button");
  var listenButton = document.getElementById("listen-button");

  // Définissez les fonctions pour la lecture et l'écoute
  function speakText() {
    var utterance = new SpeechSynthesisUtterance(textInput.value);
    window.speechSynthesis.speak(utterance);
  }

  function listenForText() {
    var recognition = new webkitSpeechRecognition();
    recognition.onresult = function (event) {
      textOutput.value = event.results[0][0].transcript;
    };
    recognition.start();
  }

  // Attachez les fonctions aux boutons
  speakButton.addEventListener("click", speakText);
  listenButton.addEventListener("click", listenForText);
}