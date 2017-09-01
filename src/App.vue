<template>
  <div id="app">
    <net-error v-if="netStatus" :netStatus="netStatus"/>
    <loading v-else-if="!netStatus && loadingFlag"/>
    <router-view v-else></router-view>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Loading from './components/Loading'

  export default {
    name: 'App',

    components: {
      Loading
    },

    created () {
      // 销毁最近所看电影实例
      window.localStorage.doubanMovieCurrentPage = '{}'
      window.localStorage.doubanMovieCurrentComments = '{}'
    },

    computed: mapState({
      netStatus (state) {
        return state.netStatus
      },
      loadingFlag (state) {
        return state.loadingFlag
      }
    })
  }
</script>

<style scoped>
  #app {
    max-width: 7.5rem;
    margin: 0 auto;
  }
</style>
