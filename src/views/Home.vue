<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="第一个wpa应用"/> -->
    <p style="font-size: 20px; font-weight: bold">大声朗读</p>
    <p style="margin-bottom: 30px; color: #999">
      基于微软edge浏览器大声朗读功能开发的pwa应用
    </p>
    <!-- <textarea name="" id="" v-model="value" cols="30" rows="10"></textarea> -->
    <!-- <input id="rate" class="flex-fill" type="range" min="0.5" max="1.5" value="1" step="0.01"> -->
    <!-- <select id="voiceSelect" class="col-9"></select> -->
    <!-- <button id="play" @click="onClick">播放</button> -->
    <a-textarea
      placeholder="输入需要朗读的文字"
      :value="inputText"
      @input="onInput"
      class="a-textarea"
      :rows="10"
    >
    </a-textarea>

    <a-row type="flex" justify="space-between" align="middle" class="pb10 pt30" style="margin-top:30px">
      <a-col class="flex-wrap">
        <p class="text-lf fweight-bold letter2 pl5 pb10" style="margin-right:10px;">开启录音(record)</p>
        <a-switch @change="onChange" />
      </a-col>
    </a-row>

    <a-row type="flex" justify="space-between" align="middle" class="pb5 pt10">
      <a-col :span="20">
        <div class="text-lf">
          <span class="fweight-bold letter2 pl5">播放速度(rate)</span>
          <span class="letter2 pl10" style="color:#999;font-size:12px">{{rateValue}} 倍速</span>
        </div>
        <div style="padding-left: 10px" touch-action="none">
          <a-slider
            :marks="rateMarks"
            :step="0.25"
            :min="minRate"
            :max="maxRate"
            @change="onRateSlider"
            :included="false"
            :default-value="rateValue"
          />
          <!-- <RedoOutlined /> -->
        </div>
      </a-col>
    </a-row>

    <a-row type="flex" justify="space-between" align="middle" class="pb5 pt20">
      <a-col :span="20">
        <div class="text-lf">
          <span class="text-lf fweight-bold letter2 pl5">音调调整(pitch)</span>
          <span class="letter2 pl10" style="color:#999;font-size:12px">当前{{pitchValue}}</span>
        </div>
        
        <!-- <a-slider id="test" v-model="value1" :disabled="disabled" /> -->
        <div style="padding-left: 10px" touch-action="none">
          <a-slider
            :marks="pitchMarks"
            :step="0.1"
            :min="minPitch"
            :max="maxPitch"
            @change="onPitchSlider"
            :included="false"
            :default-value="pitchValue"
          />
        </div>
      </a-col>
    </a-row>

    <p class="text-lf pb5 fweight-bold letter2 pl5">选择语音</p>
    <a-row type="flex" align="middle">
      <a-col :span="14">
        <a-select
          @select="onSelect"
          :default-value="defaultSelect"
          style="width: 100%"
        >
          <a-select-option v-for="(item, index) in voices" :key="index">
            {{ item.displayName }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :span="5">
        <a-button type="primary" @click="voicePlay">播放</a-button>
      </a-col>
      <!-- <a-col :span="3">
        <a-switch default-checked checked-children="录" un-checked-children="" @change="onChange" />
      </a-col> -->
    </a-row>
  </div>
</template>
<style scoped>
.a-textarea {
  box-shadow: inset 0px 1px 4px #ececec;
  -moz-box-shadow: inset 0px 1px 10px #ececec;
  -webkit-box-shadow: inset 0px 1px 10px #ececec;
}
.ant-slider-handle {
  background-color: #999 !important;
  border: solid 4px #333 !important;
}
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import { Button, Slider, Select } from 'ant-design-vue';


var matches;

if (navigator.serviceWorker) {
  navigator.serviceWorker.register("./sw.js");
}
export default {
  name: "Home",
  components: {
    // AButton: Button,
    // ASlider: Slider,
    // ASelect: Select
  },
  data() {
    return {
      voices: [],
      value: "",
      value1: 20,
      disabled: false,
      defaultSelect: "选择朗读语言类型",
      speedSelect: "x1",
      inputText: "",
      
      // 语音倍速
      rateValue: 1,
      minRate: 0.5,
      maxRate: 2,
      rateMarks: {
        0.5: "缓慢",
        0.75: "",
        1: "常规",
        1.25: "",
        1.5: "",
        1.75: "",
        2: "快",
      },

      // 音调高低
      pitchValue: 1,
      minPitch: 0,
      maxPitch: 2,
      pitchMarks: {
        0: "",
        2: "",
      },
    };
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.populateVoiceList();
  },
  updated() {},
  beforeDestroy() {},
  methods: {
    // 获取语言支持
    populateVoiceList() {
      if (typeof speechSynthesis === "undefined") {
        return;
      }
      new Promise((resolve, reject) => {
        setTimeout(() => {
          let voices = speechSynthesis.getVoices();
          // console.log(voices)
          resolve(voices);
        }, 200);
      }).then((voices) => {
        this.voices = voices
          .filter((c) => {
            return /^(Microsoft|Google) /.test(c.name);
          })
          .map((c) => {
            if (c.name.startsWith("Google ")) {
              c.displayName = c.name.replace(/^Google /, "");
            } else if (c.name.startsWith("Microsoft")) {
              matches = c.name.match(/^Microsoft (.+) Online.*- (.+)/);
              c.displayName = `${matches[2]} - ${matches[1]}`;
            }
            return c;
          })
          .sort(function (a, b) {
            return a.displayName.localeCompare(b.displayName);
          });
        // voiceSelect.innerHTML = '';
        // for (let i = 0; i < voices.length; i++) {
        //   var option = document.createElement('option');
        //   option.textContent = voices[i].displayName;
        //   voiceSelect.appendChild(option);
        // }
      });
    },
    speak() {
      let voices = this.voices;
      var utterThis = new SpeechSynthesisUtterance(this.value);

      utterThis.onend = function (event) {
        console.log("SpeechSynthesisUtterance.onend");
        play.textContent = "► Play";
      };

      utterThis.onerror = function (event) {
        console.error("SpeechSynthesisUtterance.onerror");
      };

      utterThis.voice = voices[voiceSelect.selectedIndex];
      utterThis.rate = rate.value;

      speechSynthesis.speak(utterThis);
    },
    onClick() {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        play.textContent = "► Play";
      } else {
        if (this.value === "") {
          return;
        }
        this.speak();
        play.textContent = "■ Stop";
      }
    },
    onInput(e) {
      this.inputText = e.target.value;
    },
    // select 选中
    onSelect(index) {
      this.selectIdx = index;
    },
    voicePlay() {
      let { 
        voices, 
        selectIdx, 
        inputText, 
        rateValue,
        pitchValue 
      } = this;
      if (!inputText && inputText.length == 0) {
        alert("warning");
        return;
      }
      var utterThis = new SpeechSynthesisUtterance(inputText);

      utterThis.onend = function (event) {
        console.log("SpeechSynthesisUtterance.onend");
        // play.textContent = '► Play'
      };

      utterThis.onerror = function (event) {
        console.error("SpeechSynthesisUtterance.onerror");
      };

      utterThis.voice = voices[selectIdx]; // 设置说话的声音

      utterThis.rate = rateValue; // 设置说话的速度
      console.log(pitchValue)
      utterThis.pitch = pitchValue; // 设置音调高低
      speechSynthesis.speak(utterThis);
    },
    onChange(value) {
      console.log("change: ", value);
    },
    onAfterChange(value) {
      console.log("afterChange: ", value);
    },
    // 改变语音速度
    onRateSlider(e) {
      this.rateValue = e
    },
    // 改变音调高低
    onPitchSlider(e) {
      this.pitchValue = e
    },
  },
};
</script>
