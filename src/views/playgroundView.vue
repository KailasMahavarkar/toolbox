<template>
	<fragment>
		<div class="w-full h-full prose max-w-none min-h-[100vh]">
			<h1>JS Playground</h1>
			<div class="flex">
				<div class="flex flex-1 flex-col w-full">
					<div class="tabs tabs-boxed child:no-underline">
						<a
							class="tab"
							:class="{ 'tab-active': activeTab === 'html' }"
							@click="setActiveTab('html')"
							>HTML</a
						>
						<a
							class="tab"
							:class="{ 'tab-active': activeTab === 'css' }"
							@click="setActiveTab('css')"
						>
							CSS
						</a>
						<a
							class="tab"
							:class="{ 'tab-active': activeTab === 'js' }"
							@click="setActiveTab('js')"
							>JS</a
						>
					</div>

					<VueCodeEditor
						v-if="activeTab === 'html'"
						v-model="htmlCode"
						@init="editorInit"
						lang="html"
						theme="dracula"
						class="flex-1 w-full min-h-[60vh]"
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
					/>

					<VueCodeEditor
						v-if="activeTab === 'css'"
						v-model="cssCode"
						@init="editorInit"
						lang="css"
						theme="dracula"
						class="flex-1 w-full min-h-[60vh]"
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

					<VueCodeEditor
						v-if="activeTab === 'js'"
						v-model="jsCode"
						@init="editorInit"
						@change="codeChangeHandler"
						lang="javascript"
						theme="dracula"
						class="flex-1 w-full min-h-[60vh]"
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

				<iframe
					class="flex-1 bg-white"
					ref="iFrameRef"
					id="iFrame"
				></iframe>
			</div>
			<button class="btn btn-primary">Save Code</button>
		</div>
	</fragment>
</template>

<script>
import editorMixin from "@/mixin/editorMixin";
import VueCodeEditor from "vue2-code-editor";

// HACK:
// VueCodeEditor requires v-model to be used
// but directly setting vuex state in v-model is not allowed
// so we are using a computed property to get the value from vuex state
// and setting the value to vuex state in the change event using watch

const tagMaker = (tag, content) => `<${tag}>${content}</${tag}>`;

const htmlMaker = (htmlCode, cssCode, jsCode) => {
	const html = tagMaker("body", htmlCode);
	const style = tagMaker("style", cssCode);
	const script = tagMaker("script", jsCode);

	// combine all the code
	return tagMaker("html", `${html}${style}${script}`);
};

export default {
	name: "playgroundView",
	mixins: editorMixin,
	components: {
		VueCodeEditor,
	},
	data: () => ({
		htmlCode: "",
		cssCode: "",
		jsCode: "",
		result: "",
		activeTab: "html",
	}),
	computed: {
		counter() {
			return this.$store.state.counter;
		},
		playground() {
			return this.$store.state.playground;
		},
	},
	watch: {
		htmlCode() {
			this.$store.commit("setPlayground", {
				...this.playground,
				htmlCode: this.htmlCode,
			});
			this.codeChangeHandler();
		},
		cssCode() {
			this.$store.commit("setPlayground", {
				...this.playground,
				cssCode: this.cssCode,
			});
			this.codeChangeHandler();
		},
		jsCode() {
			this.$store.commit("setPlayground", {
				...this.playground,
				jsCode: this.jsCode,
			});
			this.codeChangeHandler();
		},
	},

	mounted() {
		this.htmlCode = this.playground.htmlCode;
		this.cssCode = this.playground.cssCode;
		this.jsCode = this.playground.jsCode;
	},

	methods: {
		setActiveTab(tab) {
			this.activeTab = tab;
		},

		codeChangeHandler() {
			const myframe = this.$refs.iFrameRef;
			const htmlCode = htmlMaker(
				this.htmlCode,
				this.cssCode,
				this.jsCode
			);
			myframe.contentWindow.document.open();
			myframe.contentWindow.document.write(htmlCode);
			myframe.contentWindow.document.close();
			console.log(htmlCode);
		},

        saveCode() {
            // download the code as single html file
            const htmlCode = htmlMaker(this.htmlCode, this.cssCode, this.jsCode);
            const blob = new Blob([htmlCode], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "index.html";
            link.click();
        }

	},
};
</script>
