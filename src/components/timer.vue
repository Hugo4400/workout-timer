<template>
  <div class="timer">
    <input type="text" :placeholder="title" ref="title" id="title" @change="save()" /><br>
    <span class="timernbs">
      <input id="hours" class="timerInt" type="number" max="23" placeholder="hours  " v-model="hours" @change="save()" :disabled="isActive" />:
      <input id="minutes" class="timerInt" type="number" max="59" placeholder="minutes  " v-model="minutes" @change="save()" :disabled="isActive" />:
      <input id="seconds" class="timerInt" type="number" max="59" placeholder="seconds  " v-model="seconds" @change="save()" :disabled="isActive" />
      <button @click="start()" class="h-btn action" ref="startBtn" v-if="!isActive">
        <font-awesome-icon icon="play"></font-awesome-icon>
      </button>
      <button @click="stop()" class="h-btn action" ref="stopBtn" v-if="isActive">
        <font-awesome-icon icon="pause"></font-awesome-icon>
      </button>
      <button @click="deleteTimer()" class="h-btn delete">
        <font-awesome-icon icon="minus"></font-awesome-icon>
      </button>
      <button @click="reset()" class="h-btn delete" v-if="resetButton && !isActive">
        <font-awesome-icon icon="redo-alt"></font-awesome-icon>
      </button>
    </span>
  </div>
</template>

<script>

  import {store} from '@/store';
  import debounce from 'lodash.debounce'

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
        running : false,
        resetButton : false,
        save : false,
        hoursSet : '',
        minutesSet : '',
        secondsSet : ''
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
          new Audio('https://freesound.org/people/andersmg/sounds/511492/download/511492__andersmg__double-beep.wav').play()
          this.start()
        }
      },
      hours(val) {
        if (!this.running) {
          this.hoursSet = val
        }
      },
      minutes(val) {
        if (!this.running) {
          this.minutesSet = val
        }
      },
      seconds(val) {
        if (!this.running) {
          this.secondsSet = val
        }
      },
    },
    methods: {
      deleteTimer() {
        let timers = localStorage.getItem('timers')

        if (timers !== null) {
          timers = JSON.parse(timers).filter(t => t !== this.id)
          localStorage.setItem('timers', JSON.stringify(timers))
        }

        store.commit('decrement', this.id)
      },
      start() {

        this.running = true
        this.resetButton = false

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
      reset() {
        this.resetButton = false
        this.hours = this.hoursSet
        this.minutes = this.minutesSet
        this.seconds = this.secondsSet
      },
      stop() {
        this.running = false
        this.resetButton = true

        store.commit('deactivate')
        store.commit('stopTimer', store.state.timerFunction)
      },
      done() {
        this.running = false
        this.resetButton = false

        this.hours = this.hoursSet
        this.minutes = this.minutesSet
        this.seconds = this.secondsSet

        store.commit('stopTimer', store.state.timerFunction)
        store.commit('timerDone', this.id)
      }
    },
    created() {
      this.save = debounce(() => {

        let timers = localStorage.getItem('timers')

        if (timers === null) {
          timers = {}
        } else {
          timers = JSON.parse(timers)
        }

        timers[this.id] = {
          'title' : this.$refs.title.value,
          'h' : this.hours,
          'm' : this.minutes,
          's' : this.seconds
        }
        localStorage.setItem('timers', JSON.stringify(timers))

      }, 300, {'leading': false, 'trailing': true})
    },
    mounted() {

      let timers = localStorage.getItem('timers')

      if (typeof timers !== 'undefined' && timers !== null) {

        timers = JSON.parse(timers)
        const timer = timers[this.id]

        if (typeof timer !== "undefined" && timer !== '') {
          this.title = timer.title
          this.$refs.title.value = timer.title
          this.hours = timer.h
          this.minutes = timer.m
          this.seconds = timer.s
          this.hoursSet = timer.h
          this.minutesSet = timer.m
          this.secondsSet = timer.s
        }

      } else {
        this.$refs.title.focus();
      }
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
