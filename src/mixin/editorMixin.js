import Vue from 'vue';

const themes = [
    "dracula",
    "monokai",
    "terminal",
    "tomorrow_night",
    "twilight",
    "xcode",
    "ambiance",
    "chaos",
    "chrome",
    "clouds",
    "clouds_midnight",
    "cobalt",
]

const langs = [
    "javascript",
    "html",
    "css",
    "json",
    "markdown",
    "php",
    "python",
    "ruby",
    "sql",
    "text",
    "xml",
    "yaml",
]

const editorInit = function () {
    // vue2-code-editor/node_modules/
    require("brace/ext/language_tools"); //language extension prerequsite...

    // language extensions
    require("brace/mode/javascript");
    require("brace/mode/html");
    require("brace/mode/css");
    require("brace/mode/json");
    require("brace/mode/markdown");
    require("brace/mode/php");
    require("brace/mode/python");
    require("brace/mode/ruby");
    require("brace/mode/sql");
    require("brace/mode/text");
    require("brace/mode/xml");
    require("brace/mode/yaml");

    // themes
    require("brace/theme/dracula");
    require("brace/theme/monokai");
    require("brace/theme/terminal");
    require("brace/theme/tomorrow_night");
    require("brace/theme/twilight");
    require("brace/theme/xcode");
    require("brace/theme/ambiance");
    require("brace/theme/chaos");
    require("brace/theme/chrome");
    require("brace/theme/clouds");
    require("brace/theme/clouds_midnight");
    require("brace/theme/cobalt");
    require("brace/snippets/javascript"); //snippet
}



Vue.mixin({
    data: () => ({
        themes,
        langs,
        editorInit
    }),
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

