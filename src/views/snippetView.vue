<template>
	<fragment>
		<div class="flex items-center flex-col prose max-w-none my-5">
			<h1>Beautiful Code Screenshot</h1>
			<div class="w-full max-w-full">
				<div class="mockup-code rounded-none" id="my_screenshot">
					<VueCodeEditor
						ref="editorRef"
						v-model="content"
						@init="editorInit"
						lang="javascript"
						theme="dracula"
						class="w-full min-h-[60vh]"
						:options="{
							enableBasicAutocompletion: true,
							enableLiveAutocompletion: true,
							fontSize: 20,
							highlightActiveLine: true,
							enableSnippets: true,
							showLineNumbers: true,
							tabSize: 4,
							showPrintMargin: false,
							showGutter: true,
						}"
					/>
				</div>
			</div>
			<div class="flex justify-center child:m-5 items-center">
				<div class="form-control w-full max-w-xs">
					<label class="label">
						<span class="label-text">Choose Theme </span>
					</label>
					<select
						class="select select-bordered select-primary-content text-primary-content"
						@change="changeTheme"
					>
						<option
							v-for="theme in themes"
							:key="theme"
							:value="theme"
						>
							{{ theme }}
						</option>
					</select>
				</div>

				<div class="form-control w-full max-w-xs">
					<label class="label">
						<span class="label-text">Choose Language </span>
					</label>
					<select
						class="select select-bordered select-primary-content text-primary-content"
						@change="changeLanguage"
					>
						<option v-for="lang in langs" :key="lang" :value="lang">
							{{ lang }}
						</option>
					</select>
				</div>
				<button
					class="btn btn-primary m-2"
					@click.prevent="captureScreenshot"
				>
					<font-awesome-icon icon="fa-solid fa-camera" class="mr-2" />
					Take Screenshot
				</button>
			</div>
		</div>
	</fragment>
</template>

<script>
import VueCodeEditor from "vue2-code-editor";
import editorMixin from "@/mixin/editorMixin";

export default {
	name: "snippetView",
	components: {
		VueCodeEditor,
	},
	mixins: editorMixin,
	data: () => ({
		imageSRC: "",
		content: "",
	}),

	methods: {
		changeTheme(e) {
			this.$refs.editorRef.editor.setTheme(`ace/theme/${e.target.value}`);
			console.log(e.target.value);
		},

		changeLanguage(e) {
			this.$refs.editorRef.editor
				.getSession()
				.setMode(`ace/mode/${e.target.value}`);
			console.log(e.target.value);
		},

		captureScreenshot() {
			const domtoimage = require("dom-to-image-more");

			const screenshotTarget = document.getElementById("my_screenshot");

			// const elementOptions = {
			// 	width: screenshotTarget.offsetWidth,
			// 	height: screenshotTarget.offsetHeight,
			// 	style: {
			// 		transform: "scale(1)",
			// 		transformOrigin: "top left",
			// 		width: `${screenshotTarget.offsetWidth}px`,
			// 		height: `${screenshotTarget.offsetHeight}px`,
			// 	},
			// };

			domtoimage
				.toSvg(screenshotTarget, { quality: 0.95 })
				.then(function (svg) {

                    // convert svg to png
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const img = new Image();
                    img.src = svg;

                    img.onload = function () {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        const dataURL = canvas.toDataURL("image/png");
                        const link = document.createElement("a");
                        link.download = "my-image-name.png";
                        link.href = dataURL;
                        link.click();
                    };
				})
				.catch(function (error) {
					console.error("oops, something went wrong!", error);
				});
		},

		dataSumit() {
			//code here
		},
	},
};

// import fs from 'fs';
// fs.unlink('path/to/file', (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('path/to/file was deleted');
// });
</script>
