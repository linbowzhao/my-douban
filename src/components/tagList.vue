<template>
  <div class="tagList">
    <top-header class="topHeader"></top-header>
    <div class="main">
      <div class="tagResult">
        <h4 class="title">{{tagData.title}}</h4>
        <search-item v-for="detail in tagData.subjects" :detail="detail"></search-item>
      </div>
    </div>
  </div>
</template>

<script>
  import TopHeader from './Common/topHeader'
  import SearchItem from './Common/searchItem'
  import { mapState } from 'vuex'

  export default {
    name: 'search',

    components: {
      TopHeader,
      SearchItem
    },

    data () {
      return {
        scrolling: false
      }
    },

    computed: mapState({
      tagData (state) {
        var tag = this.$route.params.tag
        console.log(state.tagList.tagData[tag])
        return state.tagList.tagData[tag]
      }
    }),

    created () {
      window.addEventListener('scroll', this.bottomScrol)
    },

    destroyed () {
      window.removeEventListener('scroll', this.bottomScrol)
    },

    methods: {
      myscrol () {
        var reg = /"(.+?)"/
        var tag = this.tagData.title.match(reg)[1]
        var count = this.tagData.count || this.tagData.subjects.length
        count = count + 9// 豆瓣权限不够，最多二十条
        if (this.tagData.total && count < this.tagData.total && count < 20) {
          if (!this.scrollFlag) {
            this.scrollFlag = true
            this.$store.dispatch('tagMore', {tag: tag, count: count, start: 0})
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
          this.myscrol()
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    padding: 1rem 0.4rem 0 0.4rem;
  }

  .topHeader {
    z-index: 1;
  }

  .title {
    font-size: 0.3rem;
    color: #bbbbbb;
    margin: 0.3rem 0;
    font-weight: bold;
    text-align: left;
  }

  .button a {
    color: inherit;
  }
</style>
