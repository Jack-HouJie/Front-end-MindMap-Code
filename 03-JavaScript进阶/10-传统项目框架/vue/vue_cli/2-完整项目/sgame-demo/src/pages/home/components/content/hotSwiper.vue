<template>
  <div class="hotSwiper">
    <van-swipe class="my-swipe"
               :autoplay="3000"
               indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'hotSwiper'
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.my-swipe .van-swipe-item
  color #fff
  font-size 1rem
  line-height 150px
  text-align center
  background-color #39a9ed
</style>
