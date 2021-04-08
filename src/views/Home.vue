<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="第一个wpa应用"/> -->
    <textarea name="" id="" v-model="value" cols="30" rows="10"></textarea>
      <input id="rate" class="flex-fill" type="range" min="0.5" max="1.5" value="1" step="0.01">
      <select id="voiceSelect" class="col-9"></select>
    <button id="play" @click="onClick">播放</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

var voices; 
var matches;
export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      value: ''
    }
  },
  created() {
    
  },
  mounted() {
    // if (/Mobile/.test(navigator.userAgent)) {
    //   alert('Not support mobile device browser')
    // }
    speechSynthesis.onvoiceschanged
    
    this.populateVoiceList()
    
  },
  methods: {
    populateVoiceList() {
      voices = speechSynthesis.getVoices()
    .filter(c => {
      return /^(Microsoft|Google) /.test(c.name)
    })
    .map(c => {
      if (c.name.startsWith('Google ')) {
        c.displayName = c.name.replace(/^Google /, '')
      } else if (c.name.startsWith('Microsoft')) {
        matches = c.name.match(/^Microsoft (.+) Online.*- (.+)/)
        c.displayName = `${matches[2]} - ${matches[1]}`
      }
      return c
    })
    .sort(function (a, b) {
      return a.displayName.localeCompare(b.displayName)
    });

  voiceSelect.innerHTML = '';
  for (let i = 0; i < voices.length; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].displayName;
    voiceSelect.appendChild(option);
  }
    },
    speak() {
      var utterThis = new SpeechSynthesisUtterance(this.value);

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
    },
    onClick() {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel()
        play.textContent = '► Play'
      }
      else {
        if (this.value === '') {
          return;
        }
        this.speak()
        play.textContent = '■ Stop'
      }
    },
  }
}
</script>
