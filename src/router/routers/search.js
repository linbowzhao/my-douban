import home from '../../components/search'
import store from '../../store'
import * as types from '../../store/mutation-types'
import {
  search
} from '../server'

export default {
  path: '/search/:query',
  name: 'search',
  component: home,
  beforeEnter: (to, before, next) => {
    var query = to.params.query
    document.title = query + '-电影'
    if (store.state.search.searchData[query]) {
      store.commit(types.LOADING_FLAG, false)
      next()
      return
    }
    store.commit(types.LOADING_FLAG, true)
    if (query === '搜索') {
      store.commit(types.LOADING_FLAG, false)
      store.commit(types.NET_STATUS, '')
      next()
      return
    }
    search(query, 9, 0).then((searchData) => {
      // 成功则commit后台接口的数据，并把NET_ERROR的数据置空，并把加载中的状态置为false。
      console.log(searchData)
      store.commit(types.SEARCH_DATA, Object.assign(store.state.search.searchData,
        {[query]: searchData}
      ))
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
