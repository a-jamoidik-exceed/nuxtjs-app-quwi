<template>
	<div class="project-wrapper">
		 <div class="project">
			 <div class="project-parameters">
				 <div class="project-parameters-item">
					 <span class="project-parameters-item__label">Name</span>
					 <div class="project-parameters-item-form">
						 <input
							 v-model="name"
							 class="project-parameters-item-form__field"
							 type="text"
						 />
						 <button
							 @click="onUpdate"	 
							 :class="`button button_submit project-parameters-item-form__submit ${updatingProcess ? ' blur' : ''}`"
							 :disabled="updatingProcess"
						 >
							 OK
						 </button>
						 <span
							 v-show="isUpdated"
							 class="project-parameters-item-form__updated"
						 >
							 updated
						 </span>
					 </div>
				 </div>
			 </div>
		 </div>
	</div>
</template>

<script>
	export default {
	  layout: 'navigation',
    data() {
	    return {
	      id: 0,
		    name: '',
		    updatingProcess: false,
		    isUpdated: false
	    }
		},
		methods: {
	    onUpdate() {
	    	this.updatingProcess = true;
	      this.$quwiAPI.updateProject(this.id, { name: this.name })
		    .then(response => {
		    	if (!response) {
		    		throw 'Error while updating'
			    }
		    	this.isUpdated = true;
		    	setTimeout(() => {
						this.isUpdated = false		    		
			    }, 5000)
					this.updatingProcess = false;
				})
		    .catch(err => {
		    	alert(err);
					this.updatingProcess = false;
				});
	    }
		},
		mounted() {
	    if (process.browser) {
	      const projectId = this.$route.params.id;
	      this.$quwiAPI.getProject(projectId)
        .then((response => {
          if (!response.project) throw Error;
          this.id = response.project.id;
          this.name = response.project.name;
        }))
		    .catch(() => {
		      this.$nuxt.$router.push({ path: '/' })
		    })
	    }
    }
  }
</script>

<style lang="scss">
	.project {
		&-wrapper {
			width: 100%;
			height: 100%;
			padding: 35px;
		}
		
		&-parameters {
			display: flex;
			flex-direction: column;
			padding: 15px;
			background-color: #FFFFFF;
			border-radius: 3px;
			border: 1px solid #EAEAEA;
			
			 &-item {
				 display: flex;
				 flex-direction: row;
				 align-items: center;
				 padding: 15px;
				 
				 &__label {
					 display: flex;
					 flex-basis: 15%;
					 font-size: 18px;
					 font-weight: 500;
				 }
				 
				 &-form {
					 display: flex;
					 flex-direction: row;
					 align-items: center;
					 
					 &__field {
						 min-width: 350px;
						 padding: 15px 15px;
						 font-size: 18px;
						 line-height: 20px;
						 background-color: #FFFFFF;
						 border: 1px solid #D2D2D2;
						 border-radius: 3px;
						 outline: none;
					 }
					 
					 &__submit {
						 padding: 10px 25px;
						 margin-left: 10px;
					 }
					 
					 &__updated {
						 padding-left: 20px;
						 color: #018306;
						 font-weight: 600;
					 }
				 }
			 }
		}
	}
	
	.blur {
		opacity: .5;
	}
</style>