<template>
  <van-popup
    closeable
    v-model="show"
    position="left"
    :style="{ height: '100%', width: '100%' }"
    @closed="popClosed"
  >
    <van-row>
      <van-col span="6">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item title="创建歌单" />
          <van-sidebar-item title="创建电台" />
          <van-sidebar-item title="上传音乐" />
          <van-sidebar-item title="退出" />
        </van-sidebar>
      </van-col>
      <van-col span="18">
        <CreateSongSheet v-if="activeKey == 0" />
        <CreateRadio v-else-if="activeKey == 1" />
        <UploadMusic v-else-if="activeKey == 2" />
        <van-button type="warning" v-else style="margin: 150px 20px;" @click="loginOut">退出登录</van-button>
      </van-col>
    </van-row>
  </van-popup>
</template>

<script>
import CreateSongSheet from "~/components/left_pop/CreateSongSheet.vue";
import UploadMusic from "~/components/radio/UploadMusic.vue";
import CreateRadio from "~/components/radio/CreateRadio";
import Vue from 'vue';
import { Dialog } from 'vant';
import { mapMutations } from "vuex";


// 全局注册
Vue.use(Dialog);
export default {
  components: {
    CreateSongSheet,
    UploadMusic,
    CreateRadio
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
    loginOut() {
      Dialog.confirm({
        title: "确认",
        message: "确认退出？"
      })
        .then(() => {
          const Cookie = process.client ? require("js-cookie") : undefined;
          // Cookie.set("token", res.token);
          // Cookie.set("userName", res.username);
          Cookie.remove('token')
          Cookie.remove('userName')
          this.setToken(null);
          this.setUserName(null);
          window.location.reload()
          // this.$emit("loginClose", true);
        })
        .catch(() => {
          // on cancel
        });
    },
    onChange(index) {
      console.log("点击左侧的: ", index);
    },
    popClosed() {
      this.$emit("leftMenuClosed", true);
    },
    ...mapMutations({
      setToken: "setToken",
      setUserName: "setUserName"
    })
  }
};
</script>

<style>
</style>