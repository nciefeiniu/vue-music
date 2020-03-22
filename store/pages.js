export const state = () => ({
  currentPage: 0  // 0 广场，1是电台，2是我的
})

export const mutations = {
  change (state, index) {
    state.currentPage = index
  }
  
}

export const getters = {
  getData (state) {
    return state.currentPage
  }
}