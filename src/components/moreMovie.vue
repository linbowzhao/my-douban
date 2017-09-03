<template>
  <div class='moreMovie'>
    <top-header></top-header>
    <div class="main">
      <h4 class="title">{{moreMovie.title}}</h4>
      <movie-item v-for="subject in moreMovie.subjects" :detail="subject"></movie-item>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import TopHeader from './Common/topHeader'
  import MovieItem from './Common/movieItem'

  export default {
    name: 'moreMovie',

    components: {
      TopHeader,
      MovieItem
    },

    computed: mapState({
      moreMovie (state) {
        return state.moreMovie.moreMovie
      }
    })

  }
</script>

<style scoped>
  .main {
    padding-top: 0.81rem;
  }
  .title {
    font-size: 0.4rem;
    color: #bbbbbb;
    margin: 0.5rem 0 0.5rem 0.4rem;
    font-weight: bold;
    text-align: left;
  }
</style>
