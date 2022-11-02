import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from "@/views/homeView.vue";
Vue.use(VueRouter)

export const toolboxRoutes = [
    {
        name: "encryption",
        path: "/encryption",
        component: () => import("@/views/encryptionView.vue")
    },
    {
        name: "hashing",
        path: "/hashing",
        component: () => import("@/views/hashingView.vue"),
    },
    {
        name: "snippet",
        path: "/snippet",
        component: () => import("@/views/snippetView.vue"),
    },
    {
        name: "Code Playground ",
        path: "/play",
        component: () => import("@/views/playgroundView.vue"),
    },
    {
        name: "JSON linter",
        path: "/json-linter",
        component: () => import("@/views/jsonLinterView.vue"),
    },
    {
        name: "Word cloud",
        path: "/word-cloud",
        component: () => import("@/views/wordCloudView.vue"),
    },
    {
        name: "Base64",
        path: "/base64",
        component: () => import("@/views/base64View.vue")
    },

    // upcoming features i think are good to have in the toolbox
    // these are not yet implemented in the toolbox
    
    // {
    //     name: "UUID",
    //     path: "/uuid",
    //     component: () => import("@/views/uuidView.vue")
    // },

    // {
    //     name: "JSON Linter",
    //     path: "/json-linter",
    //     component: () => import("@/views/jsonLinterView.vue")
    // },

    // {
    //     name: "XML Linter",
    //     path: "/xml-linter",
    //     component: () => import("@/views/xmlLinterView.vue")
    // },

    // {
    //     name: "Random Text Generator",
    //     path: "/random-text-generator",
    //     component: () => import("@/views/randomTextView.vue")
    // },

    // {
    //     name: "Random Number Generator",
    //     path: "/random-number-generator",
    //     component: () => import("@/views/randomNumberView.vue")
    // },

    // {
    //     name: "JSON to CSV",
    //     path: "/json-to-csv",
    //     component: () => import("@/views/jsonToCsvView.vue")
    // },

    // {
    //     name: "CSV to JSON",
    //     path: "/csv-to-json",
    //     component: () => import("@/views/csvToJsonView.vue")
    // },

    // {
    //     name: "JSX to HTML",
    //     path: "/jsx-to-html",
    //     component: () => import("@/views/jsxToHtmlView.vue")
    // },

    // {
    //     name: "HTML to JSX",
    //     path: "/html-to-jsx",
    //     component: () => import("@/views/htmlToJsxView.vue")
    // },

    // {
    //     name: "JS Only Playground",
    //     path: "/js-only-playground",
    //     component: () => import("@/views/jsOnlyPlaygroundView.vue")
    // },

    // {
    //     name: "Python Only Playground",
    //     path: "/python-only-playground",
    //     component: () => import("@/views/pythonOnlyPlaygroundView.vue")
    // },

    // {
    //     name: "VueJS Playground",
    //     path: "/vuejs-playground",
    //     component: () => import("@/views/vuejsPlaygroundView.vue")
    // },

    // {
    //     name: "AwesomePython",
    //     path: "/awesomepython",
    //     component: () => import("@/views/awesomePythonView.vue")
    // },

    // {
    //     name: "AwesomeJS",
    //     path: "/awesomejs",
    //     component: () => import("@/views/awesomeJSView.vue")
    // },

    // {
    //     name: "Animation Generator",
    //     path: "/animation-generator",
    //     component: () => import("@/views/animationGeneratorView.vue")
    // },
];

const baseRoutes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
];


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...baseRoutes,
        ...toolboxRoutes,
    ]
})

export default router
