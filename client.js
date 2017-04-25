document.addEventListener("DOMContentLoaded", function() {
  msg = new SpeechSynthesisUtterance();
  voices = window.speechSynthesis.getVoices();
  msg.voice = voices[65];
  msg.voiceURI = 'native';
  msg.volume = 1;
  msg.rate = 1;
  msg.pitch = 1;
  msg.lang = 'en-US';
});

function processFile(file) {
  ocr(file);
}

// function drawImage(file) {
//   var reader = new FileReader();
//   reader.onload = function(e) {
//      var img = new Image();
//      img.onload = function() { context.drawImage(img, 0, 0) };
//      img.src = e.target.result;
//   };
//   reader.readAsDataURL(file);
// }

function ocr(file) {
  var result = document.getElementById('result');
  Tesseract.recognize(file).progress(function(message) {
    if (message.status == "recognizing text") {
      result.innerHTML = `Progress: ${Math.round(message.progress * 100)}%`;
    } else {
      result.innerHTML = `${message.status}: ${message.progress}`;
    }
  }).then(function(result) {
    var sanitizedText = result.text.split(/[^a-zA-Z0-9\s.,!$;:()-]/).join("");
    if (sanitizedText) {
      document.getElementById('result').innerHTML = sanitizedText;
      speak(sanitizedText);
    } else {
      speak('Sorry, I could not find any text to read.')
    }
  })
}

function speak(text) {
  msg.text = text;
  speechSynthesis.speak(msg);
}
