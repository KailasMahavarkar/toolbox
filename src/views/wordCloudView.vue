<template>
	<div class="prose max-w-none">
		<h1>Text Vizualizer</h1>
		<textarea
			class="w-full h-96 bg-base-200 p-5"
			placeholder="Enter your text here"
			v-model="text"
			cols="30"
			rows="10"
		></textarea>

		<!-- <div class="controls ">
			<label for="fontsize-label">
				<span> Font Size Ratio </span>
			</label>
			<select
				class="input input-select min-w-md"
				name="fontsize"
				@change="changeFontSize"
			>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
			</select>
		</div> -->
        <div class="child:m-2">
            <button class="btn btn-outline" @click="clearText">Clear</button>
            <button class="btn btn-outline" @click.stop="generateWordCloud">
                Generate
            </button>
        </div>
		<div class="controls child:m-2">
			<label for="color-mode">
				<span> Color Mode </span>
			</label>
			<select
				class="input input-select min-w-md"
				name="colormode"
				v-model="colorMode"
			>
            <option value="white">White Only</option>
				<option value="colorful">Colorful</option>
				<option value="white-red">white/Red</option>
				<option value="red">Red Only</option>
				<option value="blue">Blue Only</option>
				<option value="green">Green Only</option>
			</select>
		</div>



		<div class="flex items-center justify-center">
			<VueWordCloud
				style="height: 480px; width: 640px"
				:words="defaultWords"
				:color="colorFunction"
				:spacing="spacing"
				:font-size-ratio="fontSizeRatio"
				font-family="Roboto"
			>
			</VueWordCloud>
		</div> 
	</div>
</template>

<script>
import VueWordCloud from "vuewordcloud";

import stopwords from "@/data/stopwords";

export default {
	name: "wordCloudView",
	components: {
		[VueWordCloud.name]: VueWordCloud,
	},
	data: () => ({
		text: "",
		spacing: 0.5,
		fontSizeRatio: 1,
		defaultWords: [],
		colorMode: "white-red",
	}),

	watch: {
		text() {
			// update store with text
			this.$store.commit("setWordcloudText", this.text);
		},
		colorMode() {
            console.log(this.colorMode);
		},
	},

	mounted() {
		// get text from store
		this.text = this.$store.state.wordcloudText;

		this.generateWordCloud();
	},

	methods: {
		clearText() {
			this.text = "";
		},

        colorFunction(){
            switch(this.colorMode){
                case "colorful":
                    return this.randomColor();
                case "white-red":
                    return this.whiteRedRandomColor();
                case "white":
                    return "white";
                case "red":
                    return "red";
                case "blue":
                    return "blue";
                case "green":
                    return "green";
                default:
                    return "random-dark";
            }
        },

		randomColor() {
			return "#" + Math.floor(Math.random() * 16777215).toString(16);
		},

        whiteRedRandomColor(){
            const list = ["white", "red"];
            return list[Math.floor(Math.random() * list.length)];
        },

		changeFontSize(e) {
			this.fontSize = Number(e.target.value);
		},
		generateWordCloud() {
			const mywords = this.text.split(" ");

			// count the frequency of each word
			const wordCounts = mywords.reduce((acc, word) => {
				if (acc[word]) {
					acc[word] += 1;
					acc[word] = acc[word] * 1.5;
				} else {
					acc[word] = 1;
				}
				return acc;
			}, {});

			// remove stopwords
			stopwords.forEach((stopword) => {
				delete wordCounts[stopword];
			});

			// convert to array
			const wordArray = Object.entries(wordCounts);
			this.defaultWords = wordArray;
		},
		wordClickHandler(word) {
			console.log(word);
		},
	},
};
</script>
