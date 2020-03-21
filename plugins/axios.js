export default ({ store }) => {
  // axios.defaults.baseURL = {API endpoint}

  if (process.server) {
    return
  }

  axios.interceptors.request.use(request => {
    // request.baseURL = {API endpoint}
    
    // Get token from auth.js store 
    const token = store.getters['auth/token']
    
    // Update token axios header
    if (token) {
      request.headers.common['Authorization'] = `Bearer ${token}`
    }
    return request
  })
}