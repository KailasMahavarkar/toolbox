<template>
	<fragment>
		<div class="prose max-w-none">
			<h1 class="ml-[10px] m-2">
				Base62/64 - Tool ({{
					toolMode === "encrypt" ? "Encrypt" : "Decrypt"
				}})
			</h1>

			<div
				class="flex flex-col w-full h-full md:flex-row child:mt-2 md:child:m-2"
			>
				<!-- {/* NON-ENCRYPTED ZONE */} -->
				<div class="flex w-full flex-col">
					<div class="flex justify-between w-full">
						<button class="btn btn-primary btn-sm rounded-b-none">
							{{ inputSize }} kb
						</button>
						<button class="btn btn-primary btn-sm rounded-b-none">
							copy
						</button>
					</div>
					<textarea
						value="{inputText}"
						v-model="inputText"
						class="border-2 p-2 bg-base-100 min-h-[500px] max-h-[500px] rounded-md"
						placeholder="Enter inputText here"
					/>
				</div>

				<!-- {/* ENCRYPTED ZONE */} -->
				<div class="flex w-full flex-col">
					<div class="flex justify-between w-full">
						<button class="btn btn-primary btn-sm rounded-b-none">
							{{ outputSize ? outputSize : 0 }} kb
						</button>
						<button
							class="btn btn-primary btn-sm rounded-b-none"
							@click="copyEncryptedText"
						>
							copy
						</button>
					</div>
					<textarea
						v-model="outputText"
						readonly="true"
						class="border-2 p-2 bg-base-100 min-h-[500px] max-h-[500px] rounded-md"
					>
					</textarea>
				</div>
			</div>

			<!-- controls  -->
			<div
				class="flex flex-col md:flex-row md:m-2 child:mt-2 md:child:m-2"
			>
				<div class="flex flex-col md:flex-row child:m-2 w-full">
					<div class="flex flex-col child:m-2">
						<div class="form-control">
							<label class="label">
								<span class="label-inputText">
									Select Mode
								</span>
							</label>
							<select
								class="input input-bordered w-full max-w-xs"
								v-model="baseMode"
							>
								<option value="base64">base64</option>
								<option value="base62">base62</option>
							</select>
						</div>
					</div>
					<div class="flex flex-col child:m-2">
						<div class="form-control">
							<label class="label">
								<span class="label-inputText"
									>Encrypt / Decrypt</span
								>
							</label>
							<select
								class="input input-bordered w-full max-w-xs"
								v-model="toolMode"
							>
								<option value="encrypt">encrypt</option>
								<option value="decrypt">decrypt</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			<div class="divider"></div>

			<!-- toolinfo -->
			<div class="ml-5 max-w-screen-lg">
				<h1 class="inputText-3xl font-bold">Base62/64 - Tool</h1>
				<p class="mt-4">
					Base62 - is a tool that allows you to encode and decode
					inputText using Base62 algorithm.
				</p>

				<p class="mt-4">
					This tool uses the
					<a
						href="https://www.npmjs.com/package/base62"
						target="_blank"
						rel="noreferrer"
						class="inputText-blue-600"
					>
						base62
					</a>
					package from npm.
				</p>
				<p>
					Learn More about base64
					<a
						href="https://en.wikipedia.org/wiki/Base64"
						target="_blank"
						rel="noreferrer"
						class="link link-primary"
					>
						here
					</a>
				</p>
			</div>

			<div class="divider"></div>
			<h1 class="ml-5">Code snippet (base62/64)</h1>

			<div class="flex flex-col bg-base-300 px-5 rounded-md child:m-0">
				<div class="flex items-center justify-end">
					<div
						class="btn btn-primary btn-xs mt-2 rounded-b-none"
						@click="copyCodeSnippet"
					>
						copy
					</div>
				</div>
				<pre wrap="whitespace-normal">
                    <code >
                        {{ codeString }}
                    </code>
                </pre>
			</div>
		</div>
	</fragment>
</template>

<script>
import { codeString, base62, base64 } from "@/logic/baseEncoder";

import editorMixin from "@/mixin/editorMixin";

export default {
	name: "base64View",
	components: {},
	mixins: editorMixin,
	beforeCreate() {},
	mounted() {
		this.codeString = codeString;
	},
	data: () => ({
		toolMode: "encrypt",
		baseMode: "base64",
		inputText: "",
		outputText: "",

		// size
		inputSize: 0,
		outputSize: 0,

		codeString: codeString,
	}),
	watch: {
		inputText() {
			this.handleChange();
		},

		toolMode() {
			// output becomes input
			this.inputText = this.outputText;
			this.outputText = "";
			// reset inputs
			this.inputsize = this.outputSize;
			this.outputsize = 0;

            this.toolMode === "encrypt" ? this.baseMode = "base64" : this.baseMode = "base62"
		},

		baseMode() {
			console.log("baseMode changed -->", this.baseMode);
            this.handleChange();
		},
	},
	methods: {
		copyEncryptedText() {
			navigator.clipboard.writeText(this.outputText);
		},
		copyCodeSnippet() {
			navigator.clipboard.writeText(this.codeString);
		},

		handleChange() {
			this.inputSize = this.inputText.length / 1024;

			if (this.baseMode === "base62") {
				// check encrypt or decrypt
				if (this.toolMode === "encrypt") {
					this.outputText = base62.encode(this.inputText);
				} else {
					this.outputText = base62.decode(this.inputText);
				}
			} else {
				// check encrypt or decrypt
				if (this.toolMode === "encrypt") {
					this.outputText = base64.encode(this.inputText);
				} else {
					this.outputText = base64.decode(this.inputText);
				}
			}

			this.outputSize = this.outputText.length / 1024;
		},
	},
};
</script>
