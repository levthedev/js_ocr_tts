var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[65];

function el(id) { return document.getElementById(id) }

function processFile(file) {
  Tesseract.recognize(file).progress(function(message) {
    log(message)
  }).then(function(result) {
    var sanitizedText = result.text.split(/[^a-zA-Z0-9\s.,!$;:()-]/).join("");
    sanitizedText ? readAndUpdate(sanitizedText) : speak('Sorry, I could not find any text to read.');
  })
}

function speak(text) {
  msg.text = text;
  speechSynthesis.speak(msg);
}

function log(message) {
  var result = el('result');
  result.innerHTML = `${message.status}: ${Math.round(message.progress * 100)}%`;
}

function readAndUpdate(text) {
  el('result').innerHTML = text;
  speak(text);
}
