import movieDetail from '../../components/movieDetail'
import store from '../../store'
import * as types from '../../store/mutation-types'
import { currentMovie, comments } from '../server'

export default {
  path: '/movieDetail/:movieId',
  name: 'movieDetail',
  component: movieDetail,
  beforeEnter: (to, before, next) => {
    document.title = '电影详情'
    const movieId = to.params.movieId
    if (store.state.movieDetail.currentMovie[movieId]) {
      store.commit(types.LOADING_FLAG, false)
      next()
      return
    }
    store.commit(types.LOADING_FLAG, true)
    currentMovie(movieId).then((currentMovie) => {
      // 成功则commit后台接口的数据，并把NET_ERROR的数据置空，并把加载中的状态置为false。
      console.log(currentMovie)
      store.commit(types.CURRENT_MOVIE, currentMovie)
      return comments(movieId, 5, 0)
    }).then((comments) => {
      store.commit(types.CURRENT_COMMENTS, comments)
      console.log(comments)
      store.commit(types.LOADING_FLAG, false)
      store.commit(types.NET_STATUS, '')
    }).catch((error) => {
      console.log(1)
      document.title = '出错啦 Oops… - 豆瓣'
      store.commit(types.NET_STATUS, error)
      store.commit(types.LOADING_FLAG, false)
    })
    next()
  }
}
