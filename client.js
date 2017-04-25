var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[65];
msg.voiceURI = 'native';
msg.volume = 1;
msg.rate = 1;
msg.pitch = 1;
msg.lang = 'en-US';

function processFile(file) {
  Tesseract.recognize(file).progress(function(message) {
    if (message.status == "recognizing text") {
      document.getElementById('result').innerHTML = `Progress: ${Math.round(message.progress * 100)}%`;
    } else {
      document.getElementById('result').innerHTML = `Status: ${message.status}`;
    }
  }).then(function(result) {
    var sanitizedText = result.text.split(/[^a-zA-Z0-9\s.,!$;:()-]/).join("");
    document.getElementById('result').innerHTML = sanitizedText;
    speak(sanitizedText);
  })
}

function speak(text) {
  msg.text = text;
  speechSynthesis.speak(msg);
}
