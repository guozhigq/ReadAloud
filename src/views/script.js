if (/Mobile/.test(navigator.userAgent)) {
    alert('Not support mobile device browser')
}
console.log('SpeechSynthesis.js')
let voices;
function populateVoiceList() {
// console.log('populateVoiceList')
console.log(speechSynthesis.getVoices())
// voices = speechSynthesis.getVoices()
//   .filter(c => {
//     return /^(Microsoft|Google) /.test(c.name)
//   })
//   .map(c => {
//     if (c.name.startsWith('Google ')) {
//       c.displayName = c.name.replace(/^Google /, '')
//     } else if (c.name.startsWith('Microsoft')) {
//       matches = c.name.match(/^Microsoft (.+) Online.*- (.+)/)
//       c.displayName = `${matches[2]} - ${matches[1]}`
//     }
//     return c
//   })
//   .sort(function (a, b) {
//     return a.displayName.localeCompare(b.displayName)
//   });

// voiceSelect.innerHTML = '';
// for (i = 0; i < voices.length; i++) {
//   var option = document.createElement('option');
//   option.textContent = voices[i].displayName;
//   voiceSelect.appendChild(option);
// }

}


speechSynthesis.onvoiceschanged = populateVoiceList;

function speak() {

var utterThis = new SpeechSynthesisUtterance(inputText.value);

utterThis.onend = function (event) {
  console.log('SpeechSynthesisUtterance.onend');
  play.textContent = '► Play'
}

utterThis.onerror = function (event) {
  console.error('SpeechSynthesisUtterance.onerror');
}

utterThis.voice = voices[voiceSelect.selectedIndex];
utterThis.rate = rate.value;

speechSynthesis.speak(utterThis);
}

// play.onclick = () => {
// if (speechSynthesis.speaking) {
//   speechSynthesis.cancel()
//   play.textContent = '► Play'
// }
// else {
//   if (inputText.value === '') {
//     return;
//   }
//   speak()
//   play.textContent = '■ Stop'
// }
// }

// rate.oninput = function () {
// rateText.textContent = parseFloat(rate.value).toFixed(2);
// }

// inputText.focus();