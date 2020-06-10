<template>
	<nuxt-link
		:to="`/projects/${id}`"
		class="projects-item-title__name"
	>
		<div class="projects-item">
			<div class="projects-item-title">
				<img
					:src="logo_url"
					class="projects-item-title__logo" 
				/>
				<span	class="projects-item-title__name">
					{{name}}
				</span>
			</div>
			<div 
				v-if="is_active"
				class="projects-item__status_active"
			>
				Active
			</div>
			<div
				v-else
				class="projects-item__status_inactive"
			>
				Inactive
			</div>
			<div class="projects-item-details">
				<div class="projects-item-details-item">
					<div class="projects-item-details-item__label">time this week</div>
					<div class="projects-item-details-item__value">{{formatTime(spent_time_week)}}</div>
				</div>
				<div class="projects-item-details-item">
					<div class="projects-item-details-item__label">this month</div>
					<div class="projects-item-details-item__value">{{formatTime(spent_time_month)}}</div>
				</div>
				<div class="projects-item-details-item">
					<div class="projects-item-details-item__label">total</div>
					<div class="projects-item-details-item__value">{{formatTime(spent_time_all)}}</div>
				</div>
			</div>
		</div>
	</nuxt-link>
</template>

<script>
	export default {
	  name: 'ProjectItem',
		props: {
	    id: {
	      type: Number,
		    required: true
	    },
	    name: {
	      type: String,
		    required: true
	    },
      logo_url: {
	      type: String,
		    required: true,
	      default: ''
	    },
      is_active: {
	      type: Number,
		    required: true
	    },
      spent_time_week: {
	      type: Number,
		    required: true
	    },
      spent_time_month: {
	      type: Number,
		    required: true
	    },
      spent_time_all: {
	      type: Number,
		    required: true
	    }
		},
		methods: {
	    formatTime(time = 0) {
	      let remains = time;
	      let hours = Math.floor(remains / 3600);
	      remains -= hours * 3600;
        let minutes = Math.floor(remains / 60);
        remains -= minutes * 60;
        
        hours = hours <= 9 ? `0${hours}` : hours;
        minutes = minutes <= 9 ? `0${minutes}` : minutes;
        remains = remains <= 9 ? `0${remains}` : remains;
        
        return `${hours}:${minutes}:${remains}`
	    }
		}
	}
</script>

<style lang="scss">
	.projects-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 35px 30px;
		margin-bottom: 10px;
		border-radius: 2px;
		border: 1px solid #EAEAEA;
		background-color: #FFFFFF;
		
		&-title {
			display: flex;
			flex-direction: row;
			flex-basis: 40%;
			
			&__logo {
				margin-right: 20px;
				align-self: center;
				font-weight: 500;
				width: 50px;
				height: 50px;
			}
			
			&__name {
				align-self: center;
				font-size: 18px;
				font-weight: 600;
				text-decoration: none;
				color: #000000
			}
		}
		
		&__status {
			flex-basis: 25%;
			align-self: center;
			font-weight: 500;
			
			&_active {
				color: #018306;
			}
			
			&_inactive {
				color: #777777;
			}
		}
		
		&-details {
			display: flex;
			flex-direction: column;
			flex-basis: 35%;
			
			&-item {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				
				&__label {
					flex-basis: 55%;
					font-weight: 200;
				}
				
				&__value {
					flex-basis: 40%;
					font-weight: 500;
				}
			}
		}
	}
</style>