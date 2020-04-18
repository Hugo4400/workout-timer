<template>
  <div class="timer">
    <input type="text" :placeholder="title" id="title"/><br>
    <span class="timernbs">
      <input id="hours" class="timerInt" type="number" max="23" placeholder="hours  " />:
      <input id="minutes" class="timerInt" type="number" max="59" placeholder="minutes  " />:
      <input id="seconds" class="timerInt" type="number" max="59" placeholder="seconds  " />
      <button @click="start()" class="h-btn action" id="start-btn">
        <font-awesome-icon icon="play"></font-awesome-icon>
      </button>
      <button @click="deleteTimer()" class="h-btn delete">
        <font-awesome-icon icon="minus"></font-awesome-icon>
      </button>
    </span>
  </div>
</template>

<script>

  import {store} from '../store';

  export default {
    name: 'timer',
    props: {
      id: Number
    },
    data: function () {
      return {
        title : "Timer "+this.id,
      }
    },
    methods: {
      deleteTimer() {
        store.commit('decrement', this.id)
      },
      start() {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #start-btn {
    margin-right: 10px;
  }
</style>
