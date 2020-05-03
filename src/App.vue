<template>
  <div id="app">
    <div id="timerList">
      <timer v-for="i in timers" v-bind:key="i" :id="i" />
    </div>
    <br>
    <button id="addTimer" @click="addTimer()" class="h-btn action">Add timer&nbsp;&nbsp;&nbsp;<font-awesome-icon icon="plus"></font-awesome-icon></button>
    <div class="repCounter">
      <button id="removeRep" class="h-btn delete" @click="removeRep"><font-awesome-icon icon="minus"></font-awesome-icon></button>
      <input id="repNumber" type="number" v-model="reps">
      <button id="addRep" class="h-btn delete" @click="addRep"><font-awesome-icon icon="plus"></font-awesome-icon></button>
    </div>
    <h1 v-if="done">
      DONE !
    </h1>
  </div>
</template>

<script>
import timer from './components/timer.vue'
import tinycolor from 'tinycolor2'
import {store} from './store'
import keys from 'lodash.keys'

export default {
  name: 'App',
  components: {
    timer
  },
  data() {
    return {
      primaryColors : ['#663399', '#2abb9b', '#f2784b', '#00b5cc']
    };
  },
  computed: {
    timers() {
      return store.state.timers
    },
    done() {
      const done = store.state.done
      if (done) {
        new Audio('https://freesound.org/people/original_sound/sounds/366104/download/366104__original-sound__confirmation-downward.wav').play()
      }
      return done;
    },
    reps: {
      get() {
        return store.state.reps
      },
      set(reps) {
        store.commit('setReps', reps)
      }
    }
  },
  methods: {

    addTimer() {
      const newId = (this.timers.length !== 0)?+this.timers[this.timers.length-1]+1:1
      store.commit('increment', newId)
    },

    addRep() {
      store.commit('addRep')
    },

    removeRep() {
      store.commit('removeRep')
    },

    setPrimaryColor() {
      const primaryColor = this.primaryColors[Math.floor(Math.random()*this.primaryColors.length)]

      const css = 'body { border-top: 6px solid '+primaryColor+'; }' +
              '.h-btn.action { background-color: '+primaryColor+'; } ' +
              '.h-btn.action:hover{ box-shadow: 3px 4px 0 0 '+tinycolor(primaryColor).darken(20).toString()+'; }' +
              '.timer #title { color: '+tinycolor(primaryColor).lighten(10).toString()+'; }' +
              '.timer .timerInt { color: '+primaryColor+'; }' +
              '#repNumber { color: '+primaryColor+'; }';
      let style = document.createElement('style');

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      document.getElementsByTagName('head')[0].appendChild(style);
    }

  },
  mounted() {
    this.setPrimaryColor();
    const timers = localStorage.getItem('timers')

    if (timers !== null) {
      store.commit('load', keys(JSON.parse(timers)).map(Number))
    }

    const reps = localStorage.getItem('reps')
    if (reps !== null) {
      store.commit('setReps', reps)
    }
  }
}
</script>

<style lang="scss">

  @import "~normalize.css";
  @import "./assets/h.scss";

  #app {
    text-align: center;
    font-family: 'Baloo Paaji 2', sans-serif;
  }

  .timer {

    margin-top: 30px;

    #title {
      width: 300px;
      font-size: 36px;
      border: none;
    }
    .timernbs {
      display: block;
      font-size: 24px;
    }
    .timerInt {
      border: none;
      font-size: 24px;
      width: 100px;
      text-align: right;
    }
  }
</style>
