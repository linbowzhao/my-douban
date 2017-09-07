import * as types from '../mutation-types'
import {
  hotMovie,
  commingSoon,
  top250,
  usBox,
  weekly,
  newMovies
} from '../../router/server'
const state = {
  moreCurrentMovie: {}
}

var moreAjax = (title, count, start) => {
  switch (title) {
    case '正在上映的电影-北京':
      return hotMovie(count, start)
    case '即将上映的电影':
      return commingSoon(count, start)
    case '豆瓣电影Top250':
      return top250(count, start)
    case '豆瓣电影北美票房榜':
      return usBox(count, start)
    case '豆瓣电影新片榜':
      return newMovies(count, start)
    case '豆瓣电影本周口碑榜':
      return weekly(count, start)
    default :
      return new Promise((resolve, reject) => {
        reject('错误: 404')
      })
  }
}
const getters = {}

const actions = {
  getMoreData ({commit}, {title, count, start}) {
    moreAjax(title, count, start).then((moreCurrentMovie) => {
      // 成功则commit后台接口的数据，并把NET_ERROR的数据置空，并把加载中的状态置为false。
      console.log(moreCurrentMovie)
      // 深拷贝函数
      function deepCopy (arr) {
        if (arr instanceof Array) {
          var arr1 = []
          for (var i = 0; i < arr.length; i++) {
            arr1[i] = deepCopy(arr[i])
          }
          return arr1
        } else if (arr instanceof Object) {
          var obj = {}
          for (var j in arr) {
            obj[j] = deepCopy(arr[j])
          }
          return obj
        } else {
          return arr
        }
      }

      var obj = deepCopy(this.state.moreMovie.moreCurrentMovie)
      delete obj[title]
      commit(types.MORE_CURRENT_MOVIE, Object.assign({[title]: moreCurrentMovie}, obj))
      commit(types.NET_STATUS, '')
    }).catch((error) => {
      commit(types.NET_STATUS, error)
    })
  }
}

const mutations = {
  [types.MORE_CURRENT_MOVIE] (state, moreCurrentMovie) {
    state.moreCurrentMovie = moreCurrentMovie
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
