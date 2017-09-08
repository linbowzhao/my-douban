import * as types from '../mutation-types'
import { comments } from '../../router/server'

const state = {
  currentMovie: {}
}

const getters = {}

const actions = {
  moreComments ({commit}, {movieId, count, start}) {
    comments(movieId, count, start).then((currentComments) => {
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
      var obj = deepCopy(this.state.movieDetail.comments)
      commit(types.CURRENT_COMMENTS, Object.assign(obj, {[movieId]: currentComments}))
      commit(types.LOADING_FLAG, false)
      commit(types.NET_STATUS, '')
    }).catch((error) => {
      commit(types.LOADING_FLAG, false)
      commit(types.NET_STATUS, error)
    })
  }
}

const mutations = {
  [types.CURRENT_MOVIE] (state, currentMovie) {
    state.currentMovie = currentMovie
  },
  [types.CURRENT_COMMENTS] (state, comments) {
    state.comments = comments
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
