<template>
  <div>
    <van-list>
      <van-cell
        v-for="item in musicList"
        :key="item.id"
        clickable
        @click="addToMusic(item)"
        :title="item.music_name"
        :label="item.music_auth"
      >
        <template #right-icon>
          <van-icon name="like-o" style="line-height: inherit;" />
        </template>
      </van-cell>
    </van-list>
    <!-- 选择 -->
    <van-action-sheet v-model="showSelect" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  props: {
    musicList: {
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      showSelect: false,
      actions: [
        { name: "播放", id: "play" },
        { name: "加入播放列表", id: "add_plays" },
        { name: "喜欢", id: "love" }
      ],
      currentMusicInfo: {}
    };
  },
  methods: {
    onSelect(item) {
      console.log(item);
      this.showSelect = false;
      let musicInfo = this.currentMusicInfo;
      if (item.id === "play") {
        this.pushMusicList(musicInfo);
        this.setCurrentName(musicInfo.music_name);
        console.log("vuex: ", this.getMusicList());
        this.setCurrentID(musicInfo.id);
        this.setCurrentName(musicInfo.music_name);
      } else if (item.id === "add_plays") {
        this.pushMusicListWait(musicInfo);
      } else if (item.id === "love") {
        this.addToMyLoveMusic(item)
      }
    },
    addToMyLoveMusic(item) {
      this.$axios.$post('/api/v1/music/love_music/', this.currentMusicInfo).then(resp => {
        console.log(resp)
        Toast.success('添加到喜欢歌曲OK');
      }).catch(err => {
        console.log(err)
      })
    },
    addToMusic(musicInfo) {
      // 播放音乐
      console.log("点击音乐", musicInfo);
      this.currentMusicInfo = musicInfo;
      this.showSelect = true;
    },
    ...mapMutations({
      setMusicList: "music/setMusicList",
      pushMusicList: "music/pushMusicList",
      setCurrentName: "music/setCurrentName",
      setCurrentID: "music/setCurrentID",
      pushMusicListWait: "music/pushMusicListWait"
    }),
    ...mapGetters({
      getMusicList: "music/getMusicList"
    })
  }
};
</script>

<style scoped>
.music_name {
  font-size: 14px;
  color: black;
  font-weight: 400;
}
.music_auth {
  font-size: 12px;
}
</style>