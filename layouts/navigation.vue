<template>
	<div>
		<navigation-panel />
		<nuxt />
	</div>
</template>

<script>
  import NavigationPanel from '~/components/NavigationPanel';
  
  export default {
    components: {
      NavigationPanel
    }
  }
</script>

<style>
	*, *:before, *:after {
		box-sizing: border-box;
		margin: 0;
	}
</style>