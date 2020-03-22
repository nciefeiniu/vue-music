<template>
  <div>
    <audio ref="audio" controls style="display:none;" @ended="musicOnEnded"></audio>
    <van-row class="white_bg">
      <van-col span="4">
        <van-image
          round
          width="44px"
          height="44px"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-col>
      <van-col span="14">
        <van-notice-bar :text="currentMusicName + '-' + currentMusicAuth" background="white" color="black"/>
        <!-- <span class="music-info">{{}}</span>
        <span class="music-info">-</span>
        <span class="music-info">{{currentMusicAuth}}</span> -->
      </van-col>
      <van-col span="6">
        <van-icon
          class="music-info"
          name="play-circle-o"
          size="40"
          @click="playMusic"
          v-if="play === false"
        />
        <van-icon class="music-info" name="pause-circle-o" size="40" @click="pause" v-else />
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      musicIndex: 0,
      play: false,
      musicUrl: "",
      musicList: [],
      currentMusicName: '',
      currentMusicAuth: ''
    };
  },
  computed: {
    listenMusicList() {
      return this.$store.state.music.musicList
    },
    listenMusicID() {
      return this.$store.state.music.currentMusicID
    }
  },
  watch: {
    listenMusicList(newval, oldval) {
      console.log('listen musiclist change', newval)
      this.musicList = newval;
    },
    listenMusicID(newVal, oldVal) {
      this.getMusicUrl(newVal)
    }
  },
  methods: {
    musicOnEnded() {
      console.log("音乐播放完毕了，切歌曲")
      let currentMusicIndex = this.getCurrentIndex();
      let musicLitLength = this.getMusicListLength();
      if (currentMusicIndex >= musicLitLength - 1) {
        this.setCurrentID(this.musicList[0].id)
      } else {
        this.setCurrentID(this.musicList[currentMusicIndex + 1].id)
      }
    },
    pause() {
      this.play = false;
      this.$refs.audio.pause();
    },
    async playMusic() {
      if (this.musicList.length < 1) {
        console.log("播放列表为空，不能播放")
        return
      }
      // 根据music的ID获取播放URL
      // console.log('当前音乐链接',this.musicUrl)
      this.play = true;
      // this.$refs.audio.src = this.musicUrl;
      // this.$refs.audio.load()
      this.$refs.audio.play();
    },
    getMusicUrl(mid) {
      const that = this;
      this.$axios.$get('/api/v1/music/song_url/?mid=' + mid).then((resp) => {
        if (resp.code === 200) {
          that.musicUrl = resp.data.music_url;
          that.$refs.audio.src = that.musicUrl;
          that.play = true;
          that.$refs.audio.play();
          that.currentMusicName = that.getCurrentName();
          that.currentMusicAuth = that.getCurrentAuth();
        } else {
          console.log(resp)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    ...mapGetters({
      getMusicList: "music/getMusicList",
      getCurrentIndex: "music/getCurrentIndex",
      getMusicListLength: "music/getMusicListLength",
      getCurrentName: "music/getCurrentName",
      getCurrentAuth: "music/getCurrentAuth"
    }),
    ...mapMutations({
      setMusicList: "music/setMusicList",
      pushMusicList: "music/pushMusicList",
      setCurrentID: "music/setCurrentID"
    })
  }
};
</script>

<style scoped>
.music-info {
  line-height: 47px;
}
.white_bg {
  background-color: white;
}
</style>