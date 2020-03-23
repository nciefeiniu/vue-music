export default ({ store, $axios }) => {
  // axios.defaults.baseURL = {API endpoint}

  if (process.server) {
    return
  }

  $axios.interceptors.request.use(request => {
    // request.baseURL = {API endpoint}
    
    // Get token from auth.js store 
    const token = store.getters['getToken']
    console.log("axios中的token:", token)
    // Update token axios header
    if (token) {
      request.headers.common['Authorization'] = `JWT ${token}`
    }
    return request
  })
}