<template>
	<div>
        <h1 class="ml-5 text-3xl font-bold">JSON validator</h1>
        <div class="flex flex-col md:flex-row md:m-2 child:mt-2 md:child:m-2 ">
            <!-- {/* NON-ENCRYPTED ZONE */} -->
            <div class="flex w-full flex-col ">
                <div class="flex child:mr-2 w-full ">
                    <button
                        class="btn btn-primary btn-sm rounded-b-none"
                        @click="copyToClipboard"
                    >
                        copy
                    </button>
                    <button
                        v-if="isJSON !== 'maybe'"
                            class="btn btn-sm rounded-b-none"
                        >
                        {{isJSON}} JSON
                    </button>
                </div>

                <div
                    :class="{
                        'border-4 border-solid border-red-500': isJSON === 'not',
                        'border-4 border-solid border-green-500': isJSON === 'yes',
                        'border-2 border-solid border-primary': isJSON === 'maybe',
                    }"
                >
                <VueCodeEditor
                    id="jsonRef"
                    v-model="text"
                    @init="editorInit"
                    lang="json"
                    theme="dracula"
                    class="flex-1 w-full min-h-[40vh]"
                    :options="{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        fontSize: 20,
                        highlightActiveLine: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                        showPrintMargin: false,
                        showGutter: true,
                    }"
                    :commands="[
                        {
                            name: 'save',
                            bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
                            exec: null,
                            readOnly: true,
                        },
                    ]"
                />
                </div>
                <p class="text-red-500" v-if="error" >
                    {{error}}
                </p>
                <div class="flex child:m-2">
                    <button
                        class="btn btn-outline mt-2"
                        @click="validateJSON"
                    >
                        Validate
                    </button>
                    <button
                        class="btn btn-outline mt-2"
                        @click="clearText"  
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>

        <div class="divider"></div>

        <div class="prose ml-5 max-w-screen-lg">
			

			<p class="mt-4">
				JSON (JavaScript Object Notation) is an open standard file
				format and data interchange format that uses human-readable text
				to store and transmit data objects consisting of attribute–value
				pairs and arrays (or other serializable values). It is a common
				data format with diverse uses in electronic data interchange,
				including that of web applications with servers.
			</p>

			<p class="mt-4">
				Storing JSON Data As a simple example, information about me
				might be written in JSON as follows:
				<pre>const sample = {JSON.stringify(sampleJSON, null, 2)}</pre>
				This creates an object that we access using the variable jason.
				By enclosing the variable’s value in curly braces, we’re
				indicating that the value is an object. Inside the object,
				<span class="text-green-500 font-bold ">
					{`we can declare any number of properties using a "name":
                        "value" pairing, separated by commas.`}
				</span>
				To access the information stored in json, we can simply refer to
				the name of the property we need. For instance, to access
				information about me, we could use the following snippets:
			</p>

			<pre>console.log(sample.name)</pre>

			<p class="mt-4">
				This tool uses the
				<a
					href="https://www.npmjs.com/package/jsonlint-mod"
					target="_blank"
					rel="noreferrer"
					class="text-blue-600"
				>
					jsonlint-mod
				</a>
                
				package, which internally uses JSV to validate JSON.
			</p>
		</div>

    </div>
</template>

<script>
// import { json } from "@codemirror/lang-json";
import VueCodeEditor from "vue2-code-editor";
import editorMixin from  '@/mixin/editorMixin';


const resolveBorderCSS = (isJSON) => {
		if (isJSON === "valid") {
			return "border-green-500";
		} else if (isJSON === "invalid") {
			return "border-red-500";
		} else {
			return "border-gray-500";
		}
};

export default {
	name: "jsonLinterView",
    mixins: editorMixin,
    components: {
		VueCodeEditor,
	},

	data: () => ({
        isJSON: "maybe",
        error: "",
        text: "",
        borderColor: "border-gray-500",
    }),

    watch: {
        isJSON: function () {
            this.borderColor = resolveBorderCSS(this.isJSON);
        },
    },

    methods: {
        validateJSON() {
            const jsonLinter = require("jsonlint-mod");

            try {
                jsonLinter.parse(this.text);

                this.isJSON = "valid";
                this.error = "";
            } catch (e) {
                this.isJSON = "invalid";
                this.error = e.message;
            }
        },
        clearText(){
            this.isJSON = "maybe";
            this.error = "";
            this.text = "";
        },  

        copyToClipboard() {
            navigator.clipboard.writeText(this.text);
        },
    },



};
</script>
