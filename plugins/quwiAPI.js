import Vue from "vue";

const host = 'https://api.quwi.com/v2';

Vue.prototype.$quwiAPI = {
  login(email, password) {
    return fetch(
      `${host}/auth/login`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Client-Timezone-Offset': '60',
          'Client-Language': 'ru-RU',
          'Client-Company': 'udimiteam',
          'Client-Device': 'desktop'
        },
        body: JSON.stringify({ email, password })
      }
    )
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .catch(err => {
    	console.warn(err);
    	throw err.message
    });
  },
  logout() {
    return fetch(
      `${host}/auth/logout`,
      {
        method: 'POST',
        headers: {
          'AUTHORIZATION': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ anywhere: false })
      }
    )
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .catch(err => console.warn(err));
  },
  getProjects() {
    return fetch(
      `${host}/projects-manage/index`, 
      {
        method: 'GET',
        headers: {
          'AUTHORIZATION': `Bearer ${localStorage.getItem('token')}`,
        }
      }
    )
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .catch(err => {
    	console.warn(err)
		});
  },
  getProject(projectId) {
    return fetch(
      `${host}/projects-manage/${projectId}`, 
      {
        method: 'GET',
        headers: {
          'AUTHORIZATION': `Bearer ${localStorage.getItem('token')}`,
        }
      }
    )
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .catch(err => console.warn(err));
  },
  updateProject(projectId, data) {
    return fetch(
      `${host}/projects-manage/update?id=${projectId}`,
      {
        method: 'POST',
        headers: {
          'AUTHORIZATION': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
    .then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .catch(err => console.warn(err));
  },

};