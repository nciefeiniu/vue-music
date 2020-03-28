<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="radio_name"
      name="radio_name"
      label="电台名"
      placeholder="电台名"
      :rules="[{ required: true, message: '请填写电台名' }]"
    />
    <van-field
      v-model="radio_desc"
      name="radio_desc"
      label="电台描述"
      placeholder="电台描述"
      :rules="[{ required: true, message: '请填写电台描述' }]"
    />
    <van-field
      v-model="label"
      name="label"
      label="电台标签"
      placeholder="电台标签"
      :rules="[{ required: true, message: '请填写电台标签' }]"
    />

    <van-field name="radio" label="单选框">
      <template #input>
        <van-radio-group v-model="radio_classification" direction="horizontal">
          <van-radio name="Casual">随心听</van-radio>
          <van-radio name="Classic">经典</van-radio>
          <van-radio name="Popular">流行</van-radio>
          <van-radio name="Blue">忧伤</van-radio>
          <van-radio name="Cantonese">粤语</van-radio>
          <van-radio name="Calm">平静</van-radio>
          <van-radio name="GetUP">起床</van-radio>
          <van-radio name="LoveSong">情歌</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <van-uploader name="img_url" :after-read="afterRead" v-model="fileList" :max-count="1" />

    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>

<script>
import Vue from 'vue';
import { Notify } from 'vant';

Vue.use(Notify);

export default {
  data() {
    return {
      radio_name: "",
      radio_desc: "",
      radio_type: "",
      label: "",
      radio_classification: "",
      fileList: [],
      img_url: ""
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      values['img_url'] = this.img_url;
      console.log(values)
      this.$axios.$post("/api/v1/music/radio/", values).then(resp => {
        console.log(resp)
        if (resp.code === 200) {
          Notify({ type: 'success', message: '创建radio成功' });
        } else {
           Notify({ type: 'warning', message: '创建radio失败。' });
        }
        
      }).catch(err => {
        console.log(err)
        Notify({ type: 'warning', message: '请求创建radio失败，请稍后再试。' });
      })
    },
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";

      // 此时可以自行将文件上传至服务器
      console.log(file);
      let formData = new FormData();
      formData.append("name", "test");
      formData.append("file", file.file);
      let conf = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      const that = this;
      this.$axios
        .$post("/api/v1/music/upload_image/", formData, conf)
        .then(resp => {
          console.log(resp);
          const baseurl = process.env.APIURL;
          console.log('huanjingbianlaiang:',baseurl);
          that.fileList = [
            {
              url: baseurl + resp.relative_url,
              status: "done",
              message: "上传ok"
            }
          ];
          that.img_url = baseurl + resp.relative_url;
          console.log(this.fileList);

        })
        .catch(err => {
          that.fileList = [
            {
              url: "",
              status: "failed",
              message: "上传失败"
            }
          ];
        });
    }
  }
};
</script>

<style>
</style>