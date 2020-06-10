<template>
	<div class="projects">
		<div class="projects-list">
			<project-item
				v-for="({ 
					id,
					name,
					logo_url,
					is_active,
					spent_time_week,
					spent_time_month,
					spent_time_all
				}) of projects"
				:key="id"
				:id="id"
				:name="name"
				:logo_url="logo_url"
				:is_active="is_active"
				:spent_time_week="spent_time_week"
				:spent_time_month="spent_time_month"
				:spent_time_all="spent_time_all"
			/>
		</div>
	</div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex';
  import ProjectItem from '~/components/ProjectItem';
	
	export default {
	  layout: 'dashboard',
	  components: {
	    ProjectItem
	  },
		computed: {
	    ...mapState([
	      'authenticated',
	      'projects'
	    ])
		},
		watch: {
			authenticated(status) {
				if (!status) {
					this.$nuxt.$router.push({ path: '/login' })
				}
			}
		},
		methods: {
	    ...mapActions({
		    getProjects: 'getProjects'
	    }),
      ...mapMutations({
	      SET_AUTHENTICATED: 'SET_AUTHENTICATED'
      })
		},
		mounted() {
	    if (process.browser) {
        if (!localStorage.getItem('token')) {
          return this.$nuxt.$router.push({ path: '/login' });
        } else {
					this.SET_AUTHENTICATED(true);
					this.getProjects();
				}
      }
    }
  }
</script>

<style lang="scss">
	.projects {
		display: flex;
		justify-content: space-around;
		
		&-list {
			padding-top: 30px;
			width: 90%;
		}
	}
	
	@media (min-width: 576px) {
		.projects {
			&-list {
				width: 90%;
			}
		}
	}

	@media (min-width: 768px) {
		.projects {
			&-list {
				width: 80%;
			}
		}
	}

	@media (min-width: 992px) {
		.projects {
			&-list {
				width: 70%;
			}
		}
	}

	@media (min-width: 1200px) {
		.projects {
			&-list {
				width: 50%;
			}
		}
	}
</style>

