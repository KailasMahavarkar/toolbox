<template>
	<fragment>
		<div class="prose lg:prose-md max-w-none mt-10">
			<h1 class="m-2">Quick Hash Tool</h1>

			<!-- loop through hash routes -->
			<div
				class="flex flex-col md:flex-row md:m-2 child:mt-2 md:child:m-2 items-center"
			>
				<input
					type="text"
					class="input input-lg input-bordered w-full"
					placeholder="Enter text to hash"
					v-model="text"
				/>
			</div>

			<div class="flex-col items-center text-lg mx-5">
				<div class="overflow-x-auto">
					<table class="table table-zebra w-full">
						<!-- head -->
						<thead>
							<tr>
								<th></th>
								<th>Hash</th>
                                <th>Time</th>
								<th>Content</th>
								<th>Copy</th>
							</tr>
						</thead>
						<tbody>
							<!-- loop through hashes -->
							<tr v-for="(hash, index) in hashes" :key="index">
								<th>{{ index + 1 }}</th>
                                
								<td>{{ hash.name }}</td>
								<td>{{ hash.time }} ms</td>
                                
								<td>{{ hash.hash | maxLimit64 }}</td>
								<td>
									<button
										class="btn btn-primary btn-sm rounded-b-none"
										@click="copy(hash.hash)"
									>
										copy
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="divider"></div>
			<h1>What is a hash?</h1>
			<p>
				A hash is not 'encryption' - it cannot be decrypted back to the
				original text (it is a 'one-way' cryptographic function, and is
				a fixed size for any size of source text).

				<br />
				This makes it suitable when it is appropriate to compare
				'hashed' versions of texts, as opposed to decrypting the text to
				obtain the original version.
			</p>

			Supported Hash Algorithms:
			<ol>
				<li v-for="(hash, index) in hashes" :key="index">
					{{ hash.name }}
				</li>
			</ol>
		</div>
	</fragment>
</template>

<script>
import { hashingRoutes } from "@/router/index.js";
import sha1 from "crypto-js/sha1";
import sha256 from "crypto-js/sha256";
import sha512 from "crypto-js/sha512";
import md5 from "crypto-js/md5";
import generalMixin from "@/mixin/generalMixin";

import {
	keccak224,
	keccak256,
	keccak384,
	keccak512,
	sha3_256,
	sha3_512,
	sha3_224,
	sha3_384,
	shake128,
	shake256,
} from "js-sha3";

const hashTime = (foo, text, args) => {
	const p = window.performance;
	const start = p.now();
    let hash = '';
    if (args){
        hash = foo(text, ...args).toString();
    }else{
        hash = foo(text).toString();
    }
	const end = p.now();
	return { hash, time: (end - start).toFixed(5) } ;
};

const hashChain = (text) => {
	return [
		{
			name: "MD5",
			...hashTime(md5, text),
		},
		{
			name: "SHA1",
			...hashTime(sha1, text),
		},
		{
			name: "SHA256",
            ...hashTime(sha256, text),
		},
		{
			name: "SHA512",
            ...hashTime(sha512, text),
		},
		{
			name: "SHA3-224",
            ...hashTime(sha3_224, text),
		},
		{
			name: "SHA3-256",
            ...hashTime(sha3_256, text),
		},
		{
			name: "SHA3-384",
            ...hashTime(sha3_384, text),
		},
		{
			name: "SHA3-512",
            ...hashTime(sha3_512, text),
		},
		{
			name: "Keccak-224",
            ...hashTime(keccak224, text),
		},
		{
			name: "Keccak-256",
            ...hashTime(keccak256, text),
		},
		{
			name: "Keccak-384",
            ...hashTime(keccak384, text),
		},
		{
			name: "Keccak-512",
            ...hashTime(keccak512, text),
		},
		{
			name: "Shake-128",
			...hashTime(shake128, text, [128]),
		},
		{
			name: "Shake-256",
			...hashTime(shake256, text, [256]),
		},
	];
};

// code emoji image name unicode
export default {
	name: "hashingView",
	mixins: generalMixin,
	components: {},
	data: () => ({
		hashRoutes: hashingRoutes,
		text: "",
		hashes: hashChain(""),
	}),
	watch: {
		text() {
			this.hashes = hashChain(this.text);
		},
	},

	async beforeMount() {},
	methods: {},
};
</script>
