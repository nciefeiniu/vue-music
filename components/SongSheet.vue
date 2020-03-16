<template>
  <van-card
  :desc="desc"
  :title="title"
  :thumb="url"
/>
</template>

<script>
export default {
  props: {
    url: {default: '/images/song_sheet_default.jpg'},
    title: {default: '随心听'},
    desc: {default: '放松心情😌'}
  }

}
</script>

<style scoped>

</style>