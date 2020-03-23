export const state = () => ({
  isLogin: false,  // 是否登录了
  token: null,
  userName: null
})

export const mutations = {
  setToken(state, token){
    state.token = token
    state.isLogin = true
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  change (state, loginInfo) {
    state.isLogin = loginInfo.isLogin
    state.token = loginInfo.token
    state.userName = loginInfo.userName
  }
}


export const getters = {
  getUserName (state) {
    return state.userName
  },
  isLogin(state) {
    return state.isLogin
  },
  getToken(state) {
    return state.token
  }
}


const cookieparser = process.server ? require('cookieparser') : undefined
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let token = null
    let userName = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      console.log('store  中的数据',parsed.token, parsed.userName)
      try {
        token = parsed.token
        userName = parsed.userName

      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setToken', token)
    commit('setUserName', userName)

    console.log(token,)
  }
}