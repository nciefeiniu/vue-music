<template>
  <van-popup closeable v-model="show" position="left" :style="{ height: '100%', width: '100%' }" @closed="popClosed">
    <van-row>
      <van-col span="6">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item title="创建歌单" />
          <van-sidebar-item title="创建电台" />
          <van-sidebar-item title="上传音乐" />
        </van-sidebar>
      </van-col>
      <van-col span="18">
        <CreateSongSheet v-if="activeKey == 0"/>
        <UploadMusic v-else-if="activeKey == 2" />
      </van-col>
    </van-row>
  </van-popup>
</template>

<script>
import CreateSongSheet from '~/components/left_pop/CreateSongSheet.vue';
import UploadMusic from '~/components/radio/UploadMusic.vue';

export default {
  components: {
    CreateSongSheet,
    UploadMusic
  },
  data() {
    return {
      show: false,
      activeKey: 0
    };
  },
  mounted() {
    this.show = true;
  },
  methods: {
    onChange(index) {
      console.log("点击左侧的: ", index);
    },
    popClosed() {
      this.$emit("leftMenuClosed", true);
    }
  }
};
</script>

<style>
</style>