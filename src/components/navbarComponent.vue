<template>
	<div class="navbar bg-base-100">
		<div class="navbar bg-base-100">
			<div class="navbar-start">
				<div class="dropdown">
					<label tabindex="0" class="btn btn-ghost btn-circle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h7"
							/>
						</svg>
					</label>
					<ul
						tabindex="0"
						class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li v-for="item in toolboxRoutes" :key="item.name">
							<router-link :to="item.path">
								{{ item.name }}
							</router-link>
						</li>
					</ul>
				</div>
				<a class="btn btn-ghost normal-case text-xl prose">
					<router-link to="/" class="no-underline">
						Homepage
					</router-link>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import { toolboxRoutes } from "@/router/index";

export default {
	name: "navbarComponent",
	data: () => ({
        toolboxRoutes,
    }),
	methods: {},
};
</script>
