import Vue from 'vue'
import Vuex from 'vuex'
import myMutations from './mutations'
import home from './modules/home'
import movieDetail from './modules/movieDetail'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    netStatus: '',
    loadingFlag: true
  },

  mutations: myMutations,

  modules: {
    home,
    movieDetail
  }
})
