const types = {
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_PROJECTS: 'SET_PROJECTS',
  SET_AUTHENTICATION_ERROR: 'SET_AUTHENTICATION_ERROR',
};

export const state = () => ({
  authenticated: false,
	authenticationError: '',
  projects: []
});

export const mutations = {
  [types.SET_AUTHENTICATED](state, authenticated) {
    state.authenticated = authenticated;
  },
  [types.SET_PROJECTS](state, projects) {
    state.projects = projects;
  },
	[types.SET_AUTHENTICATION_ERROR](state, error) {
    state.authenticationError = error;
  }
};

export const actions = {
  async login({ commit, dispatch }, data) {
    try {
			const response = await this._vm.$quwiAPI.login(data.email, data.password);
			commit(types.SET_AUTHENTICATION_ERROR, '');
			commit(types.SET_AUTHENTICATED, true);
			localStorage.setItem('token', response.token);
			dispatch('getProjects');
		} catch (error) {
			commit(types.SET_AUTHENTICATED, false);
			commit(types.SET_AUTHENTICATION_ERROR, error);
			setTimeout(() => commit(types.SET_AUTHENTICATION_ERROR, ''), 5000);
		}
  },
  logout({ commit }) {
    this._vm.$quwiAPI.logout()
    .finally(() => {
      commit(types.SET_AUTHENTICATED, false);
      commit(types.SET_PROJECTS, []);
      localStorage.removeItem('token');
    });
  },
  async getProjects ({ commit }) {
    const response = await this._vm.$quwiAPI.getProjects();
    commit(types.SET_PROJECTS, response.projects);
  }
};

