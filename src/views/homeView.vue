<template>
	<div class="flex min-w-full min-h-full prose lg:prose-lg">
		<div
			class="flex flex-col w-full justify-center items-center child:mt-5 min-h-[100vh]"
		>
			<div class="flex w-full items-center justify-center flex-wrap">
				<h1>Toolbox - collection of tools in one place</h1>
			</div>

			<div class="flex flex-wrap items-center justify-center cursor-pointer">
				<!-- loop routes -->
				<div v-for="route in routes" :key="route.name">
					<router-link
						:to="{ name: route.name }"
						class="flex flex-col items-center justify-center 
                        hover:bg-primary hover:text-primary-content
                        p-5 m-5 min-w-[300px] no-underline border-2 rounded-lg shadow-lg"
					>
						{{ route.name }}
					</router-link>
				</div>
			</div>

			<div class="divide-x"></div>
		</div>
	</div>
</template>

<script>
// import navbarComponentVue from "@/components/navbarComponent.vue";
import { toolboxRoutes } from "@/router/index";

// code emoji image name unicode
export default {
	name: "homeView",
	data: () => ({
		routes: toolboxRoutes,
	}),
	components: {
		// navbarComponentVue
	},
	async mounted() {},
	methods: {},
};


</script>
