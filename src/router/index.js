import Vue from 'vue'
import Router from 'vue-router'
import home from './routers/home'
import movieDetail from './routers/movieDetail'
import store from '../store'
import * as types from './../store/mutation-types'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    home,
    movieDetail
  ]
})

router.beforeEach((to, from, next) => {
  // 解决404返回不回去的bug
  store.commit(types.NET_STATUS, '')
  next()
})

export default router
