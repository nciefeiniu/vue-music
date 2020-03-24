<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="songSheetInfo.sheet_name"
      name="歌单名"
      label="歌单名"
      placeholder="歌单名"
      :rules="[{ required: true, message: '请填写歌单名' }]"
    />
    <van-field
      v-model="songSheetInfo.song_sheet_desc"
      autosize
      rows="2"
      label="简介"
      type="textarea"
      placeholder="请输入歌单介绍"
      :rules="[{ required: true, message: '请输入歌单介绍' }]"
    />
    <van-radio-group icon-size="15px" v-model="songSheetInfo.is_public" direction="horizontal">
      <van-radio name="true">公开</van-radio>
      <van-radio name="false">不公开</van-radio>
    </van-radio-group>
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>

<script>
export default {
  data() {
    return {
      songSheetInfo: {
        sheet_name: "",
        img_url: "",
        song_sheet_desc: "",
        is_public: focus
      }
    }
  },
  methods: {
    onSubmit() {
      console.log("当前填写的信息：", this.songSheetInfo)
    }
  }
};
</script>

<style scoped>
</style>