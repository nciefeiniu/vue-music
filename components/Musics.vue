<template>
<div>
  <van-list>
    <van-cell v-for="item in musicList" :key="item.id">
      <div @click="addToMusic(item)">
        <p class="music_name">{{item.music_name}}</p>
        <p class="music_auth">{{item.music_auth}}</p>
      </div>
    </van-cell>
  </van-list>
  <!-- 选择 -->
  <van-action-sheet v-model="showSelect" :actions="actions" @select="onSelect" />
</div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: {musicList: {default: () => {return []}}},
  data() {
    return {
      showSelect: false,
      actions: [
        { name: '播放', id: 'play' },
        { name: '加入播放列表', id: 'add_plays' },
        { name: '喜欢', id: 'love' }
      ],
      currentMusicInfo: {}
    }
  },
  methods: {
    onSelect(item) {
      console.log(item)
      this.showSelect = false;
      let musicInfo = this.currentMusicInfo;
      if(item.id === 'play') {
        this.pushMusicList(musicInfo);
        this.setCurrentName(musicInfo.music_name);
        console.log('vuex: ', this.getMusicList())
        this.setCurrentID(musicInfo.id);
        this.setCurrentName(musicInfo.music_name);
      } else if (item.id === 'add_plays') {
        this.pushMusicList(musicInfo);
      } else if (item.id === 'love') {
        
      }
    },
    addToMusic(musicInfo) {
      // 播放音乐
      console.log("点击音乐", musicInfo)
      this.currentMusicInfo = musicInfo;
      this.showSelect = true;

      
    },
    ...mapMutations({
      setMusicList: "music/setMusicList",
      pushMusicList: "music/pushMusicList",
      setCurrentName: "music/setCurrentName",
      setCurrentID: "music/setCurrentID"
    }),
    ...mapGetters({
      getMusicList: "music/getMusicList"
    })
  }
}
</script>

<style scoped>
.music_name{
  font-size: 14px;
  color: black;
  font-weight: 400;
}
.music_auth{
  font-size: 12px;
}
</style>