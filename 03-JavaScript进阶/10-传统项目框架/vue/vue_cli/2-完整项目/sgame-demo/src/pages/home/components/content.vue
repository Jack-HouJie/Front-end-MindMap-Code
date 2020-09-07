<template>
  <div class="contentContainer">
    <reward-bar></reward-bar>
    <hot-swiper></hot-swiper>
    <game-list></game-list>
  </div>
</template>

<script>
import rewardBar from './content/rewardBar'
import hotSwiper from './content/hotSwiper'
import gameList from './content/gameList'
export default {
  name: 'HomeContent',
  components: {
    rewardBar,
    hotSwiper,
    gameList
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.contentContainer
  height 87vh
  weidth 100%
</style>
