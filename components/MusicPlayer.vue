<template>
  <div>
    <audio ref="audio" :src="musicUrl" controls style="display:none;"></audio>
    <van-row>
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
        <span class="music-info">哈哈哈</span>
        <span class="music-info">-</span>
        <span class="music-info">周杰伦</span>
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
export default {
  data() {
    return {
      play: false,
      musicUrl: "http://m8.music.126.net/20200314203942/7bb3742d207162a5a281ce44e5e69af0/ymusic/500e/f4ce/82e9/4a6a8f0d35ceb2717e78c7c6c3308863.mp3"
    };
  },
  methods: {
    pause() {
      this.play = false;
      this.$refs.audio.pause();
    },
    playMusic() {
      this.play = true;
      this.$refs.audio.play();
    }
  }
};
</script>

<style scoped>
.music-info {
  line-height: 47px;
}
</style>