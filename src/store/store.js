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
        wordcloudText: `Apple Inc., formerly Apple Computer, Inc., Microcomputer design and manufacturing company, the first successful personal-computer company. It was founded in 1976 by Steven P. Jobs and Stephen G. Wozniak, whose first computer was manufactured in the Jobs family’s garage. The Apple II (1977), with its plastic case and colour graphics, launched the company to success, earning Apple over $100 million by 1980, the year the company first offered stock to the public. The Macintosh, introduced in 1984, was the first personal computer to use a graphical user interface and a mouse. The “Mac” initially sold poorly, and Jobs left the company in 1985, but eventually it found its niche in the desktop publishing market. Apple recalled Jobs in 1997. He returned the company to profitability by introducing more innovative products, such as the iMac. Apple introduced iTunes, software for playing music that has been converted to the MP3 format, and the iPod portable MP3 music player in 2001; in 2003 the company began selling downloadable copies of major record company songs in MP3 format over the Internet. Apple introduced the iPhone, a touch-screen smartphone, in 2007 and the iPad, which created a new market for tablet computers, in 2010.`
    },
    getters: {
        getCounter: state => state.counter,
        getPlayground: state => state.playground,
        getWordcloudText: state => state.wordcloudText
    },
    mutations: {
        incrementCounter: state => state.counter++,
        decrementCounter: state => state.counter--,
        resetCounter: state => state.counter = 0,

        // playground mutations
        setPlayground: (state, payload) => state.playground = payload,
        resetPlayground: state => state.playground = defaultPlaygroundState,

        // wordcloud mutations
        setWordcloudText: (state, payload) => state.wordcloudText = payload

    },
    actions: {
        incrementCounter: ({ commit }) => commit('incrementCounter'),
        decrementCounter: ({ commit }) => commit('decrementCounter'),

        // playground actions
        setPlayground: ({ commit }, payload) => commit('setPlayground', payload),
        resetPlayground: ({ commit }) => commit('resetPlayground'),

        // wordcloud actions
        setWordcloudText: ({ commit }, payload) => commit('setWordcloudText', payload)
    },
    plugins: [vuexLocal.plugin]
})
