import tagList from '../../components/tagList'
import store from '../../store'
import * as types from '../../store/mutation-types'
import { getTagData } from '../server'

export default {
  path: '/tagList/:tag',
  name: 'tagList',
  component: tagList,
  beforeEnter: (to, before, next) => {
    var tag = to.params.tag
    document.title = tag + '-电影'
    if (store.state.tagList.tagData[tag]) {
      store.commit(types.LOADING_FLAG, false)
      next()
      return
    }
    store.commit(types.LOADING_FLAG, true)
    if (tag === '') {
      store.commit(types.LOADING_FLAG, false)
      store.commit(types.NET_STATUS, 'error')
      next()
      return
    }
    getTagData(tag, 9, 0).then((tagData) => {
      // 成功则commit后台接口的数据，并把NET_ERROR的数据置空，并把加载中的状态置为false。
      console.log(tagData)
      store.commit(types.SEARCH_DATA, Object.assign(store.state.tagList.tagData,
        {[tag]: tagData}
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
