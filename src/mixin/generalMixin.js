import Vue from 'vue';

Vue.mixin({
    methods: {
        copy(str) {
            // check if the browser supports the clipboard API
            if (navigator.clipboard) {
                // copy the text to the clipboard
                navigator.clipboard.writeText(str);
            }
        }
    }
})