<template>
  <div class="timer">
    <input type="text" :placeholder="title" ref="title" id="title"/><br>
    <span class="timernbs">
      <input id="hours" class="timerInt" type="number" max="23" placeholder="hours  " v-model="hours" />:
      <input id="minutes" class="timerInt" type="number" max="59" placeholder="minutes  " v-model="minutes" />:
      <input id="seconds" class="timerInt" type="number" max="59" placeholder="seconds  " v-model="seconds" />
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
        seconds : '',
        running : false
      }
    },
    computed: {
      isActive() {
        return store.state.active === this.id
      }
    },
    watch: {
      isActive(val) {
        if (val && !this.running) {
          this.start()
        }
      }
    },
    methods: {
      deleteTimer() {
        store.commit('decrement', this.id)
      },
      start() {

        this.running = true
        store.commit('setActive', this.id)
        store.commit('setFocus', this.id)

        const fn = setInterval(() => {

          const now = new Date().getTime();
          let {hours, minutes, seconds} = this

          hours = +hours
          minutes = +minutes
          seconds = +seconds

          let time = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000)

          if (time === 0) {
            this.done()
          } else {

            time = ((now + time) - now) - 1000;

            this.hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            this.minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
            this.seconds = Math.floor((time % (1000 * 60)) / 1000)

          }

        }, 1000)

        store.commit('startTimer', fn)

      },
      stop() {
        this.running = false
        store.commit('deactivate')
        store.commit('stopTimer', store.state.timerFunction)
      },
      done() {
        this.running = false
        store.commit('stopTimer', store.state.timerFunction)
        store.commit('timerDone', this.id)
      }
    },
    mounted() {
      this.$refs.title.focus();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #start-btn {
    margin-right: 10px;
  }

  .h-btn.action {
    margin-right: 10px;
  }
</style>
