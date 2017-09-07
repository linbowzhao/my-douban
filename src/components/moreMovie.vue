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

    data: function () {
      return {
        scrollFlag: false
      }
    },

    components: {
      TopHeader,
      MovieItem
    },

    computed: mapState({
      moreMovie (state) {
        var title = this.$route.params.title
        console.log(state.moreMovie.moreCurrentMovie[title])
        return state.moreMovie.moreCurrentMovie[title]
      }
    }),
    created () {
      window.addEventListener('scroll', this.bottomScrol)
    },

    destroyed () {
      window.removeEventListener('scroll', this.bottomScrol)
    },
    methods: {
      scrolling () {
        var title = this.moreMovie.title
        var count = this.moreMovie.count || this.moreMovie.subjects.length
        count = count + 9
        if (this.moreMovie.total && count < this.moreMovie.total) {
          if (!this.scrollFlag) {
            this.scrollFlag = true
            this.$store.dispatch('getMoreData', {title: title, count: count, start: 0})
            setTimeout((that) => { that.scrollFlag = false }, 500, this)
          }
        }
      },
      bottomScrol () {
        var top = document.documentElement.scrollTop
        if (top === 0) {
          top = document.body.scrollTop
        }
        var height = document.getElementById('app').clientHeight
        var innerHeight = window.innerHeight
        if ((top + innerHeight) / height > 0.6) {
          this.scrolling()
        }
      }
    }

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
