<template>
  <div class="headFooter">
    <van-notice-bar left-icon="volume-o"
                    text="您的捐赠是作者完善本站的动力！合作或版权问题点击“联系作者”。"
                    class="noticeBar" />
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.headFooter
  position relative
  bottom 0
.noticeBar
  height 6vh
  color white
  background $bgColor
</style>
