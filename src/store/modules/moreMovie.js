import * as types from '../mutation-types'

const state = {
  moreCurrentMovie: {}
}

const getters = {}

const actions = {}

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
