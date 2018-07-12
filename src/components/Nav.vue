<template>
	<nav v-once>
		<ul role="menu">
			<li role="presentation">
				<router-link to="/" exact>home</router-link>
			</li>
			<li role="presentation">
				<router-link to="/users">users</router-link>
			</li>
			<li role="presentation">
				<router-link to="/user/edit">edit user</router-link>
			</li>
		</ul>
	</nav>
</template>

<script type="text/babel">
	import Vue from 'vue'

	Vue.component('app-nav')
</script>

<style scoped>

	nav {
		ul {
			list-style: none;
			margin: 0;

			li {
				display: inline-block;
			}

			a {
				display: block;
				padding: 5px;
			}
		}
	}
</style>
