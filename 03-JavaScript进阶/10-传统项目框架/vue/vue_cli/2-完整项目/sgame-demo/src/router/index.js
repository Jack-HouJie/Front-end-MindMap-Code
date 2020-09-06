import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Help from '@/pages/others/help'
import Donate from '@/pages/others/donate'
import Author from '@/pages/others/author'
import { Button, NoticeBar, Swipe, SwipeItem } from 'vant'

Vue.use(Router)
Vue.use(Button)
Vue.use(NoticeBar)
Vue.use(Swipe)
Vue.use(SwipeItem)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/donate',
      name: 'Donate',
      component: Donate
    },
    {
      path: '/author',
      name: 'Author',
      component: Author
    }
  ]
})
