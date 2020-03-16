<template>
  <van-card
    :desc="desc"
    :title="title"
    :thumb="url"
  >
    <div slot="tags">
      <van-tag plain type="danger" v-for="label in labels">{{label}}</van-tag>
    </div>
  </van-card>
</template>

<script>
export default {
  props: {
    title: {default: 'hello'},
    desc: {default: '新的电台'},
    labels: {default: ()=> {return ['测试']}},
    url: {default: '/images/radio_default_url.jpg'}
  }
};
</script>

<style scoped>
</style>