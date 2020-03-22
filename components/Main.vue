<template>
  <Ground v-if="currentPageIndex === 0" />
  <RadioPage v-else-if="currentPageIndex === 1" />
  <MyPage v-else-if="currentPageIndex === 2" />
</template>

<script>
import Ground from "~/components/Ground.vue";
import RadioPage from "~/components/RadioPage.vue";
import MyPage from "~/components/MyPage.vue";
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {
    Ground,
    RadioPage,
    MyPage
  },
  middleware: "checkIsLogin",
  data() {
    return {
      currentPageIndex: 0
    };
  },
  computed: {
    getCurrentIndex() {
      return this.$store.state.pages.currentPage;
    }
  },
  watch: {
    getCurrentIndex(newVal, oldVal) {
      console.log("侦听vuex:", newVal);
      this.currentPageIndex = newVal;
    }
  },
  methods: {
    ...mapGetters({
      getData: "pages/getData"
    })
  }
};
</script>

<style scoped>
</style>