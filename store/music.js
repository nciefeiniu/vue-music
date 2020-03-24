export const state = () => ({
  musicList: [], // [{id: xx, music_name: xx, music_auth: xx, music_url}]
  currentMusicID: '',
  currentMusicName: '',
  currentMusicAuth: '',
  currentIndex: 0
})

export const mutations = {
  setMusicList(state, musicList){
    state.musicList = musicList
  },
  pushMusicListWait(state, musicInfo){
    for(let i=0; i<state.musicList.length; i++) {
      if (musicInfo.id === state.musicList[i].id) {
        return
      }
    }
    state.musicList.push(musicInfo)
  },
  pushMusicList(state, musicInfo) {

    for(let i=0; i<state.musicList.length; i++) {
      if (musicInfo.id === state.musicList[i].id) {
        state.currentMusicID = state.musicList[i].id
        state.currentMusicName = state.musicList[i].music_name
        state.currentMusicAuth = state.musicList[i].music_auth
        state.currentIndex = i
        return
      }
    }

    state.musicList.push(musicInfo)
    state.currentMusicID = musicInfo.id
    state.currentMusicName = musicInfo.music_name
    state.currentMusicAuth = musicInfo.music_auth
    state.currentIndex = state.musicList.length - 1
  },
  setCurrentName(state, name) {
    state.currentMusicName = name
  },
  setCurrentID(state, ID) {
    state.currentMusicID = ID
  },
  setCurrentAuth(state, auth) {
    state.currentMusicAuth =auth;
  }
}

export const getters = {
  getMusicList (state) {
    return state.musicList
  },
  getCurrentName(state) {
    return state.currentMusicName
  },
  getCurrentID(state) {
    return state.currentMusicID
  },
  getCurrentAuth(state) {
    return state.currentMusicAuth
  },
  getCurrentIndex(state) {
    return state.currentIndex;
  },
  getMusicListLength(state) {
    return state.musicList.length;
  }
}