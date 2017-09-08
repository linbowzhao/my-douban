import * as types from '../mutation-types'
import { getTagData } from '../../router/server'

const state = {
  tagData: {}
}

const getters = {}

const actions = {
  tagMore ({commit}, {tag, count, start}) {
    if (count < 10) commit(types.LOADING_FLAG, true)
    getTagData(tag, count, start).then((tagData) => {
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
      var obj = deepCopy(this.state.tagList.tagData)
      console.log(tagData)
      commit(types.TAG_DATA, Object.assign(obj, {[tag]: tagData}))
      commit(types.LOADING_FLAG, false)
      commit(types.NET_STATUS, '')
    }).catch((error) => {
      commit(types.LOADING_FLAG, false)
      commit(types.NET_STATUS, error)
    })
  }
}

const mutations = {
  [types.TAG_DATA] (state, tagData) {
    state.tagData = tagData
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
