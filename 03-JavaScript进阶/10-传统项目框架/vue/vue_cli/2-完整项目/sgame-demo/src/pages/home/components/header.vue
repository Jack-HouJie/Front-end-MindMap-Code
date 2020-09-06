<template>
  <div class="header">
    <div class="help">
      <router-link to="/help">
        <van-button round
                    type="info"
                    class="headBtn">帮助信息</van-button>
      </router-link>
    </div>
    <div class="donate">
      <router-link to="/donate">
        <van-button round
                    type="info"
                    class="headBtn">捐赠</van-button>
      </router-link>
    </div>
    <div class="author">
      <router-link to="/author">
        <van-button round
                    type="info"
                    class="headBtn">联系作者</van-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.header
  display flex
  background $bgColor
  line-height 7vh
  color #fff
  .help
    flex 3
    padding-left 7px
    text-align left
  .donate
    flex 3
    text-align center
  .author
    flex 3
    padding-right 7px
    text-align right
  .headBtn
    background $bgColor
    border solid white
    height 5vh
</style>
