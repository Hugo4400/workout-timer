<template>
  <div class="timer">
    <input type="text" :placeholder="title" id="title"/><br>
    <span class="timernbs">
      <input ref="hours" class="timerInt" type="number" max="23" placeholder="hours  " v-bind:value="hours" />:
      <input ref="minutes" class="timerInt" type="number" max="59" placeholder="minutes  " v-bind:value="minutes" />:
      <input ref="seconds" class="timerInt" type="number" max="59" placeholder="seconds  " v-bind:value="seconds" />
      <button @click="start()" class="h-btn action" ref="startBtn" v-if="!isActive">
        <font-awesome-icon icon="play"></font-awesome-icon>
      </button>
      <button @click="stop()" class="h-btn action" ref="stopBtn" v-if="isActive">
        <font-awesome-icon icon="pause"></font-awesome-icon>
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
        hours : '',
        minutes : '',
        seconds : ''
      }
    },
    computed: {
      isActive() {
        return store.state.active === this.id
      }
    },
    methods: {
      deleteTimer() {
        store.commit('decrement', this.id)
      },
      start() {

        store.commit('setActive', this.id)
        store.commit('setFocus', this.id)

        const fn = setInterval(() => {

          const now = new Date().getTime();
          let {hours, minutes, seconds} = this

          let time = (+hours * 60 * 60 * 1000) + (+minutes * 60 * 1000) + (+seconds * 1000) // TODO: Get countdown to update.
          let distance = (now+time) - now;

          this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          this.seconds = Math.floor((distance % (1000 * 60)) / 1000)

        }, 1000)

        store.commit('startTimer', fn)

      },
      stop() {
        store.commit('deactivate')
        store.commit('stopTimer', store.state.timerFunction)
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #start-btn {
    margin-right: 10px;
  }
</style>
