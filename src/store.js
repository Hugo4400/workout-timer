import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        timers: []
    },
    mutations: {
        increment (state, id) {
            state.timers.push(id)
        },
        decrement (state, id) {
            state.timers = state.timers.filter(t => t !== id)
        }
    }
})
