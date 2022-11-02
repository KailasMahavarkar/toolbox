<template>
	<fragment>
		<div class="prose">
			<h1 class="ml-[10px] m-2">
				AES - Encryption Tool ({{
					encryptMode ? "Encrypt" : "Decrypt"
				}})
			</h1>
		</div>

		<div
			class="flex flex-col w-full h-full md:flex-row child:mt-2 md:child:m-2"
		>
			<!-- {/* NON-ENCRYPTED ZONE */} -->
			<div class="flex w-full flex-col">
				<div class="flex justify-between w-full">
					<button class="btn btn-primary btn-sm rounded-b-none">
						{{ size }} kb
					</button>
					<button class="btn btn-primary btn-sm rounded-b-none">
						copy
					</button>
				</div>
				<textarea
					value="{text}"
					v-model="text"
					class="border-2 p-2 bg-base-100 min-h-[500px] max-h-[500px] rounded-md"
					placeholder="Enter text here"
				/>
			</div>

			<!-- {/* ENCRYPTED ZONE */} -->
			<div class="flex w-full flex-col">
				<div class="flex justify-between w-full">
					<button class="btn btn-primary btn-sm rounded-b-none">
						{{ encryptedSize ? encryptedSize : 0 }} kb
					</button>
					<button
						class="btn btn-primary btn-sm rounded-b-none"
						@click="copyEncryptedText"
					>
						copy
					</button>
				</div>
				<textarea
					v-model="encryptedText"
                    readonly="true"
					class="border-2 p-2 bg-base-100 min-h-[500px] max-h-[500px] rounded-md"
				>
				</textarea>
			</div>
		</div>

		<!-- controls  -->
		<div class="flex flex-col md:flex-row md:m-2 child:mt-2 md:child:m-2">
			<div class="flex flex-col md:flex-row child:m-2 w-full">
				<div class="flex flex-col child:m-2">
					<div class="form-control">
						<label class="label">
							<span class="label-text">Enter Passphrase</span>
						</label>
						<input
							v-model="passphrase"
							class="input input-bordered w-full max-w-xs"
						/>
					</div>
				</div>
				<div class="flex flex-col child:m-2">
					<div class="form-control">
						<label class="label">
							<span class="label-text">Encrypt / Decrypt</span>
						</label>
						<select
							class="input input-bordered w-full max-w-xs"
							@change="encyptModeChangeHandler"
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
			<h1 class="text-3xl font-bold">AES ECB</h1>
			<p class="mt-4">
				AES ECB is a block cipher encryption algorithm. It is a
				symmetric encryption algorithm, which means that the same key is
				used to encrypt and decrypt the data. The key can be 128, 192,
				or 256 bits long.
			</p>
			<p class="mt-4">
				One of the best implementation we recommended using is
				<a
					href="https://www.aescrypt.com/"
					target="_blank"
					rel="noreferrer"
					class="text-blue-600"
				>
					AESCrypt
				</a>
				which is a free, open-source, cross-platform utility for
				supporting encryption and decryption of files using the Advanced
				Encryption Standard (AES) algorithm.
			</p>
			<p class="mt-4">
				This tool uses the
				<a
					href="https://www.npmjs.com/package/crypto-es"
					target="_blank"
					rel="noreferrer"
					class="text-blue-600"
				>
					crypto-es
				</a>
				package.
			</p>
			<p>
				Learn More about AES ECB
				<a
					href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard"
					target="_blank"
					rel="noreferrer"
					class="text-blue-600"
				>
					here
				</a>
			</p>
		</div>
	</fragment>
</template>

<script>
import AES from "crypto-js/aes";
import { enc } from "crypto-js";

export default {
	name: "encryptionView",
	components: {},
	data: () => ({
		text: "",
		encryptedText: "",
		size: 0,
		encryptedSize: 0,

		encryptMode: true,

		// mode
		mode: "AES-256",
		type: "ECB",
		iv: "",
		passphrase: "",
	}),
	watch: {
		text() {
			this.handleChange();
		},
		passphrase() {
			this.handleChange();
		},
		iv() {
			this.handleChange();
		},
	},
	methods: {
		copyEncryptedText() {
			navigator.clipboard.writeText(this.encryptedText);
		},
		encyptModeChangeHandler() {
			// output becomes input
			this.text = this.encryptedText;
			this.encryptedText = "";
			this.encryptedSize = 0;
			this.encryptMode = !this.encryptMode;
		},

		handleChange() {

			// // check if passphrase is mentioned
			if (this.passphrase) {
				this.passphrase = this.passphrase.trim();
			}

			if (this.encryptMode) {
				// check if iv is mentioned
				this.encryptedText = AES.encrypt(
					JSON.stringify(this.text),
					this.passphrase
				).toString();
				this.encryptedSize = this.encryptedText.length / 1024;
				this.size = this.text.length / 1024;
			} else {
                try {
                    // decrypt
					const bytes = AES.decrypt(this.text, this.passphrase);
					const decryptedData = JSON.parse(bytes.toString(enc.Utf8));

					this.encryptedText = decryptedData;
					this.encryptedSize = this.encryptedText.length / 1024;
					this.size = this.text.length / 1024;
				} catch (error) {
                    // unable to decrypt
					this.encryptedText = "Invalid Decryption Text";
				}
			}
		},

		copyText() {
			navigator.clipboard.writeText(this.text);
		},
	},
};
</script>
