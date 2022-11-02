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

		<div class="controls child:m-2">
			<label for="fontsize-label">
				<span> Max Font Size </span>
			</label>
			<select
				class="input input-select min-w-md"
				name="fontsize"
				@change="changeFontSize"
			>
				<option value="20">20</option>
				<option value="30">30</option>
				<option value="40">40</option>
				<option value="50">50</option>
				<option value="60">60</option>
				<option value="80">80</option>
			</select>
			<button class="btn btn-outline" @click="clearText">Clear</button>
			<button class="btn btn-outline" @click.stop="generateWordCloud">
				Generate
			</button>
		</div>

		<wordcloud
			:data="defaultWords"
			nameKey="name"
			valueKey="value"
			:color="myColors"
			:showTooltip="true"
			:wordClick="wordClickHandler"
			:fontSize="fontSize"
            :scale="3"
            spiral="rectangular"
		>
		</wordcloud>
	</div>
</template>

<script>
import wordcloud from "vue-wordcloud";
import stopwords from "@/data/stopwords";

export default {
	name: "wordCloudView",
	components: {
		wordcloud,
	},
	data: () => ({
		text: "",
		fontSize: [20, 50],

		myColors: ["#1f77b4", "#629fc9", "#94bedb", "#c9e0ef"],
		defaultWords: [
			{
				name: "Cat",
				value: 26,
			},
			{
				name: "fish",
				value: 19,
			},
			{
				name: "things",
				value: 18,
			},
			{
				name: "look",
				value: 16,
			},
			{
				name: "two",
				value: 15,
			},
			{
				name: "fun",
				value: 9,
			},
			{
				name: "know",
				value: 9,
			},
			{
				name: "good",
				value: 9,
			},
			{
				name: "play",
				value: 6,
			},
		],
	}),

	watch: {},

	methods: {
		clearText() {
			this.text = "";
		},

        changeFontSize(e) {
            this.fontSize = [10, Number(e.target.value)]
        },
		generateWordCloud() {
			this.defaultWords = this.text.split(" ").map((word) => {
				// remove stop words
				if (stopwords.includes(word)) {
					return {
						name: "",
						value: 1,
					};
				} else {
					return {
						name: word,
						value: 1,
					};
				}
			});

			// remove empty words
			this.defaultWords = this.defaultWords.filter((word) => {
				return word.name !== "";
			});
		},
		wordClickHandler(word) {
			console.log(word);
		},
	},
};
</script>
