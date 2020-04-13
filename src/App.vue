<template>
  <div id="app">
    <div id="timerList">
      <timer v-for="i in timers" v-bind:key="i" :id="i" />
    </div>
    <button id="addTimer" @click="addTimer()" class="h-btn action">Add timer&nbsp;&nbsp;&nbsp;<font-awesome-icon icon="plus"></font-awesome-icon></button>
  </div>
</template>

<script>
import timer from './components/timer.vue'
import tinycolor from 'tinycolor2'

export default {
  name: 'App',
  components: {
    timer
  },
  data: function() {
    return {
      timers : [1],
      primaryColors : ['#663399', '#2abb9b', '#f2784b', '#00b5cc']
    };
  },
  methods: {

    addTimer() {
      this.timers.push(this.timers.length+1)
    },

    setPrimaryColor() {
      const primaryColor = this.primaryColors[Math.floor(Math.random()*this.primaryColors.length)]

      const css = 'body { border-top: 6px solid '+primaryColor+'; }' +
              '.h-btn.action { background-color: '+primaryColor+'; } ' +
              '.h-btn.action:hover{ box-shadow: 3px 4px 0 0 '+tinycolor(primaryColor).darken(20).toString()+'; }' +
              '.timer #title { color: '+tinycolor(primaryColor).lighten(10).toString()+'; }' +
              '.timer .timerInt { color: '+primaryColor+'; }';
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
