<template>
<div>
  <Radio
    v-for="songSheet in myRadios"
    :key="songSheet.id"
    :url="songSheet.img_url"
    :title="songSheet.sheet_name"
    :desc="songSheet.song_sheet_desc"
    @click.native="clickRadio(songSheet.id)"
  />
  <!-- 电台歌曲弹窗 -->
  <RadioMusics :sid="currentRadioID" v-if="showRadioPop" @songSheetMusicsClosed="radioPopPageClosed"/>
</div>
</template>

<script>
import Radio from "~/components/Radio.vue";
import RadioMusics from "~/components/radio/RadioMusics.vue";

export default {
  components: {
    Radio,
    RadioMusics
  },
  data() {
    return {
      myRadios: [],
      showRadioPop: false,
      currentRadioID: null
    };
  },
  mounted() {
    this.getRadioList();
  },
  methods: {
    radioPopPageClosed() {
      this.showRadioPop = false;
    },
    clickRadio(radioID) {
      console.log("点击电台");
      this.currentRadioID = radioID;
      this.showRadioPop = true;
    },
    getRadioList() {
      this.$axios
        .$get("/api/v1/music/radio_list/")
        .then(resp => {
          console.log(resp);
          if (resp.code == 200) {
            this.myRadios = resp.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>