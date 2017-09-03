import moreMovie from '../../components/moreMovie'
import store from '../../store'
import * as types from '../../store/mutation-types'
import {
  hotMovie,
  commingSoon,
  top250,
  usBox,
  weekly,
  newMovies
} from '../server'

export default {
  path: '/moreMovie/:title',
  name: 'moreMovie',
  component: moreMovie,
  beforeEnter: (to, before, next) => {
    var title = to.params.title
    document.title = title
    if (Object.keys(store.state.home.homeData).length !== 0) {
      store.commit(types.LOADING_FLAG, false)
      next()
      return
    }
    store.commit(types.LOADING_FLAG, true)
    var currentAjax = (title) => {
      switch (title) {
        case '正在上映的电影-北京':
          return hotMovie(18, 0)
        case '即将上映的电影':
          return commingSoon(18, 0)
        case '豆瓣电影Top250':
          return top250(18, 0)
        case '豆瓣电影北美票房榜':
          return usBox(18, 0)
        case '豆瓣电影新片榜':
          return newMovies(18, 0)
        case '豆瓣电影本周口碑榜':
          return weekly(18, 0)
        default :
          return new Promise((resolve, reject) => {
            reject('错误: 404')
          })
      }
    }
    currentAjax(title).then((moreMovie) => {
      // 成功则commit后台接口的数据，并把NET_ERROR的数据置空，并把加载中的状态置为false。
      store.commit(types.MORE_MOVIE, moreMovie)
      store.commit(types.LOADING_FLAG, false)
      store.commit(types.NET_STATUS, '')
    }).catch((error) => {
      document.title = '出错啦 Oops… - 豆瓣'
      store.commit(types.NET_STATUS, error)
      store.commit(types.LOADING_FLAG, false)
    })
    next()
  }
}
