<template>
	<div class="navigation-panel">
		<nuxt-link to="/">
			<button class="button button_normal navigation-panel__back">Back</button> 
		</nuxt-link>
	</div>
</template>

<style lang="scss">
	.navigation-panel {
		display: flex;
		align-items: center;
		height: 80px;
		padding: 0 35px;
		box-shadow: inset #878787 0 3px 3px -2px;
		margin-top: 15px;
		background-color: #C7CED8;
		
		&__back {
			padding: 10px 25px;
		}
	}
</style>