import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        timers: [],
        timerFunction: '',
        active: '',
        focus: ''
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
        },
        setActive (state, id) {
            if (state.timers.includes(id)) {
                state.active = id
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
    }
})
