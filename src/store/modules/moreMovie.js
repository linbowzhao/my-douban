import * as types from '../mutation-types'

const state = {
  moreMovie: {}
}

const getters = {}

const actions = {}

const mutations = {
  [types.MORE_MOVIE] (state, moreMovie) {
    state.moreMovie = moreMovie
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
