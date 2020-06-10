<template>
	<header class="dashboard-header">
		<span class="dashboard-header__logo">Q</span>
		<div class="dashboard-header-menu">
			<nuxt-link
				to="/"
				class="dashboard-header-menu__item"
			>
				Projects
			</nuxt-link>
			<span
				@click="onLogout"
				class="dashboard-header-menu__item"
			>
				Logout
			</span>
		</div>
	</header>
</template>

<script>
	import { mapActions } from 'vuex';
	
	export default {
	  name: 'DashboardHeader',
		methods: {
	    ...mapActions({
		    logout: 'logout'
	    }),
      onLogout() {
        this.logout();
      }
		}
	}
</script>

<style lang="scss">
	.dashboard-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 10px;
		height: 70px;
		background-color: #FFFFFF;
		box-shadow: #878787 0 1px 3px;
		padding: 10px 20px;
		
		&__logo {
			font-size: 36px;
			font-weight: 500;
		}
		
		&-menu {
			display: flex;
			flex-direction: row;
			list-style: none;
			
			&__item {
				cursor: pointer;
				align-self: center;
				text-transform: uppercase;
				text-decoration: none;
				color: #000000;
				padding-left: 20px;
			}
		}
	}
</style>