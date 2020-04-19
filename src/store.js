import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        timers: [],
        timerFunction: false,
        active: '',
        focus: '',
        done: false
    },
    mutations: {
        increment (state, id) {
            state.timers.push(id)
        },
        decrement (state, id) {
            state.timers = state.timers.filter(t => t !== id)
        },
        startTimer (state, interval) {
            state.timerFunction = interval
        },
        stopTimer (state, interval) {
            state.timerFunction = clearInterval(interval)
            state.timerFunction = false
        },
        setActive (state, id) {
            if (state.timers.includes(id)) {
                state.active = id
                state.done = false
            }
        },
        deactivate (state) {
            state.active = undefined
        },
        setFocus (state, id) {
            if (state.timers.includes(id)) {
                state.focus = id
            }
        },
        blur (state) {
            state.focus = undefined
        },
        timerDone (state, id) {
            const next = state.timers[state.timers.indexOf(id)+1]
            if (typeof next === "undefined") {
                state.done = true
            }
            state.active = next
            state.focus = next
        }
    }
})
