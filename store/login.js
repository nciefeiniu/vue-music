// export const state = () => ({
//   login: false,  // 是否登录了
//   token: null,
//   userName: null
// })

// export const mutations = {
//   setToken(state, token){
//     state.token = token
//     state.login = true
//   },
//   setUserName(state, userName) {
//     state.userName = userName
//   },
//   change (state, loginInfo) {
//     state.login = loginInfo.isLogin
//     state.token = loginInfo.token
//     state.userName = loginInfo.userName
//   },
//   getUserName (state) {
//     return state.userName
//   },
//   isLogin(state) {
//     return state.login
//   }
// }

// export const actions = {
//   nuxtServerInit ({ commit }, { req }) {
//     let token = null
//     let userName = null
//     if (req.headers.cookie) {
//       const parsed = cookieparser.parse(req.headers.cookie)
//       console.log('store ',parsed.token, parsed.userName)
//       try {
//         token = parsed.token
//         userName = parsed.userName

//       } catch (err) {
//         // No valid cookie found
//       }
//     }
//     commit('setToken', token)
//     commit('setUserName', userName)
//   }
// }