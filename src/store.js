import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        timers: [],
        timerFunction: false,
        active: '',
        focus: '',
        done: false,
        reps: 0
    },
    mutations: {
        load (state, timers) {
            state.timers = timers
        },
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
            let next = state.timers[state.timers.indexOf(id)+1]
            if (typeof next === "undefined") {

                if (state.reps > 0) {
                    state.reps--
                    next = state.timers.find(x=>x!==undefined)
                } else {
                    state.done = true
                }
            }
            state.active = next
            state.focus = next
        },
        setReps (state, reps) {
            state.reps = reps
            localStorage.setItem('reps', reps)
        },
        addRep (state) {
            state.reps++
            localStorage.setItem('reps', state.reps)
        },
        removeRep (state) {
            state.reps--
            localStorage.setItem('reps', state.reps)
        }
    }
})
