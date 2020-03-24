<template>
  <div class="tabbar-footer">
    <div>
      <MusicPlayer style="padding-bottom: 50px;"/>
    </div>
    <div>
      <van-tabbar v-model="tabbarActive" @change="onChange">
        <van-tabbar-item icon="home-o">广场</van-tabbar-item>
        <van-tabbar-item icon="service-o">电台</van-tabbar-item>
        <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import MusicPlayer from "~/components/MusicPlayer.vue";
import { mapMutations } from 'vuex';

export default {
  components: {
    MusicPlayer
  },
  data() {
    return {
      tabbarActive: 0
    };
  },
  computed: {
    tabbarIndex() {
      return this.$store.state.pages.currentPage;
    }
  },
  watch: {
    tabbarIndex(newVal, oldVal) {
      this.tabbarActive = newVal;
    }
  },
  methods: {
    onChange(index) {
      console.log(index);
      this.change(index);
    },
    ...mapMutations({
      change: 'pages/change'
    })
  }
};
</script>

<style scoped>
.tabbar-footer {
  width: 100%;
  position: fixed;
  bottom: 0px;
}
</style>