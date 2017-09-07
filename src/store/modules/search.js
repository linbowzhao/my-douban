import * as types from '../mutation-types'
import { search } from '../../router/server'

const state = {
  searchData: {}
}

const getters = {}

const actions = {
  searchMore ({commit}, {query, count, start}) {
    if (count < 10) commit(types.LOADING_FLAG, true)
    search(query, count, start).then((searchData) => {
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

      var obj
      if (count < 10) {
        obj = this.state.search.searchData
      } else {
        obj = deepCopy(this.state.search.searchData)
        delete obj[query]
      }
      commit(types.SEARCH_DATA, Object.assign({[query]: searchData}, obj))
      commit(types.LOADING_FLAG, false)
      commit(types.NET_STATUS, '')
    }).catch((error) => {
      commit(types.LOADING_FLAG, false)
      commit(types.NET_STATUS, error)
    })
  }
}

const mutations = {
  [types.SEARCH_DATA] (state, searchData) {
    state.searchData = searchData
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
