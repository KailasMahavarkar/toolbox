import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(Vuex)

const defaultPlaygroundState = {
    htmlCode: "<h1>Hello World</h1>",
    cssCode: ".h1 { color: red; }",
    jsCode: "console.log('Hello World')"
}

export default new Vuex.Store({
    state: {
        counter: 0,
        playground: defaultPlaygroundState,
        
    },
    getters: {
        getCounter: state => state.counter,
        getPlayground: state => state.playground
    },
    mutations: {
        incrementCounter: state => state.counter++,
        decrementCounter: state => state.counter--,
        resetCounter: state => state.counter = 0,

        // playground mutations
        setPlayground: (state, payload) => state.playground = payload,
        resetPlayground: state => state.playground = defaultPlaygroundState

    },
    actions: {
        incrementCounter: ({ commit }) => commit('incrementCounter'),
        decrementCounter: ({ commit }) => commit('decrementCounter'),

        // playground actions
        setPlayground: ({ commit }, payload) => commit('setPlayground', payload),
        resetPlayground: ({ commit }) => commit('resetPlayground')
    },
    plugins: [vuexLocal.plugin]
})
