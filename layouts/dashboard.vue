<template>
	<div>
		<dashboard-header />
		<nuxt />
	</div>
</template>

<script>
	import DashboardHeader from '~/components/DashboardHeader';

	export default {
	  components: {
      DashboardHeader
	  }
	}
</script>

<style>
	*, *:before, *:after {
		box-sizing: border-box;
		margin: 0;
	}
</style>