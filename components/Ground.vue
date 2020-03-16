<template>
  <div>
    <div>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img
            style="width: 100%; height: 150px; transform: translateX(0px);"
            fit="contain"
            v-lazy="image"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <van-grid icon-size="24px">
        <van-grid-item icon="friends" text="歌手" />
        <van-grid-item icon="music" text="排行" />
        <van-grid-item icon="bars" text="分类" />
        <van-grid-item icon="audio" text="电台" />
      </van-grid>
    </div>
    <!-- 分割线 -->
    <DividingLine title="为你推荐歌单"/>
    <!-- 歌单 -->
    <SongSheet />
  </div>
</template>

<script>
import DividingLine from '~/components/DividingLine.vue';
import SongSheet from '~/components/SongSheet.vue'

import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);

export default {
  components: {
    DividingLine,
    SongSheet
  },
  data() {
    return {
      images: ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"]
    };
  }
};
</script>

<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>