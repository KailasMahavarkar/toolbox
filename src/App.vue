<template>
	<div id="app">
		<div class="flex items-center justify-center">
			<div class="flex flex-col container">
				<navbarComponent v-if="homepage"/>
				<router-view />
				<footerComponent />
			</div>
		</div>
        <!-- position: absolute;
        top: 344px;
        left: 344px;
        width: 112px;
        height: 112px;
        border-radius: 50%;
        z-index: 100001; -->


		<!-- <div class="absolute right-[2rem] bottom-[7rem] border-r-[50%] -z-[10] ">
			<div class="dropdown dropdown-left">
				<font-awesome-icon
					tabindex="0"
					icon="fa-solid fa-gears"
					class="rounded-full p-2 hover:text-primary cursor-pointer"
					size="3x"
				/>
				<ul
					tabindex="0"
					class="dropdown-content menu p-2 shadow bg-base-100 rounded-box"
				>
					<li>
						<label for="">
							<input type="checkbox" class="checkbox" checked />
							<span class="ml-2">Favourite</span>
						</label>
					</li>
				</ul>
			</div>
		</div>  -->
	</div>
</template>

<script>
import footerComponent from "./components/footerComponent.vue";
import navbarComponent from "./components/navbarComponent.vue";


export default {
	name: "App",
	components: {
		footerComponent,
		navbarComponent,
	},

	data: () => ({
	}),

    computed: {
        homepage() {
            return this.$route.name !== "home";
        }
    },

	methods: {
	
	},

};
</script>
