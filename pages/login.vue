<template>
	<div class="login">
		<div class="login-form">
			<span class="login-form__title">Login</span>
			<div class="login-form-item">
				<input
					v-model="email"
					:class="`login-form-item__field${emailError ? ' login-form-item__field_error' : ''}`"
					type="email"
					placeholder="Email"
				/>
			</div>
			<div class="login-form-item">
				<input
					v-model="password"
					:class="`login-form-item__field${passwordError ? ' login-form-item__field_error' : ''}`"
					type="password"
					placeholder="Password"
				/>
			</div>
			<div
				v-if="authenticationError"
				class="login-form-item"
			>
				<span class="login-form__error-message">{{authenticationError}}</span>
			</div>
			<div class="login-form-item">
				<button
					@click="onLogin"
					class="button button_submit login-form-item__submit"
				>
					LOGIN
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState, mapMutations } from 'vuex';
	
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
	      password: '',
	      emailError: false,
        passwordError: false
      }
    },
	  computed: {
      ...mapState([
        'authenticated',
				'authenticationError'
      ])
	  },
	  watch:{
      authenticated(status) {
        if (status) {
          this.$nuxt.$router.push({ path: '/' })
        }
      },
		  email() {
        this.emailError = false;
		  },
		  password() {
        this.passwordError = false;
      }
	  },
    methods: {
      ...mapActions({
	      login: 'login'
      }),
	    ...mapMutations({
        SET_AUTHENTICATED: 'SET_AUTHENTICATED'
	    }),
	    validateEmail() {
        const emailRegEx = new RegExp(
					/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return emailRegEx.test(this.email);
	    },
	    validatePassword() {
        return !!this.password.length;
	    },
	    onLogin() {
        if (!this.validateEmail()) this.emailError = true;
        if (!this.validatePassword()) this.passwordError = true;
        if (this.validateEmail() && this.validatePassword()) {
          this.login({ email: this.email, password: this.password });
        }
	    },
	    onEnter(event) {
				if (event.key === 'Enter') {
					this.onLogin();
				}
	    }
    },
	  mounted() {
      if (process.browser) {
        if (localStorage.getItem('token')) {
          return this.$nuxt.$router.replace({ path: '/' })
        }
				document.addEventListener('keydown', this.onEnter)
			}
		},
	  beforeDestroy() {
			document.removeEventListener('keydown', this.onEnter);
	  }
  }
</script>

<style lang="scss">
	.login {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background-color: #FAFAFA;
		
		&-form {
			width: 500px;
			
			&__title {
				text-transform: uppercase;
				font-size: 20px;
				font-weight: 500;
				padding: 20px 0;
			}
			
			&-item {
				padding: 10px 0;
				
				&__field {
					width: 100%;
					padding: 15px 15px;
					font-size: 18px;
					line-height: 20px;
					background-color: #FFFFFF;
					border: 1px solid #D2D2D2;
					border-radius: 3px;
					outline: none;
					
					&_error {
						box-shadow: red 0 0 2px;
					}
				}

				&__submit {
					padding: 10px 50px;
				}
			}
			
			&__error-message {
				color: red;
			}
		}
	}
</style>

