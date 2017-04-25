var msg = new SpeechSynthesisUtterance()
var voices = window.speechSynthesis.getVoices()
msg.voice = voices[65]
msg.voiceURI = 'native'
msg.volume = 1
msg.rate = 1
msg.pitch = 1
msg.lang = 'en-US'

function processFile(file) {
  Tesseract.recognize(file).progress(message => {
    if (message.status == "recognizing text") message = message.progress
    console.log('progress: ', message)
    document.getElementById('result').innerHTML = message
  }).then(result => {
    console.log(result)
    var sanitizedText = result.text.split(/[^a-zA-Z0-9\s.,!$;:()-]/).join("")
    document.getElementById('result').innerHTML = sanitizedText
    speak(sanitizedText)
  })
}

function speak(text) {
  msg.text = text
  speechSynthesis.speak(msg);
}
