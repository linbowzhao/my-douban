<template>
  <div class="search">
    <top-header class="topHeader"></top-header>
    <div class="main">
      <i-input v-model="searchKey" placeholder="请输入关键词" class="myInput"></i-input>
      <div @click.stop="searchMore" class="button">
        <router-link :to="`/search/${searchKey === '' ? '搜索' : searchKey}`">搜索
        </router-link>
      </div>
      <div class="searchResult" v-if="searchFlag === 1">
        <h4 class="title">{{searchData.title}}</h4>
        <search-item v-for="detail in searchData.subjects" :detail="detail"></search-item>
      </div>
    </div>
  </div>
</template>

<script>
  import TopHeader from './Common/topHeader'
  import IInput from 'iview/src/components/input'
  import SearchItem from './Common/searchItem'
  import { mapState } from 'vuex'

  export default {
    name: 'search',

    components: {
      TopHeader,
      IInput,
      SearchItem
    },

    data () {
      return {
        searchKey: '',
        scrolling: false
      }
    },

    computed: mapState({
      searchData (state) {
        var query = this.$route.params.query
        if (this.searchFlag === -1) {
          return {}
        }
        console.log(state.search.searchData[query])
        return state.search.searchData[query]
      },
      searchFlag () {
        return this.$route.params.query === '搜索' ? -1 : 1
      }
    }),

    created () {
      window.addEventListener('scroll', this.bottomScrol)
    },

    destroyed () {
      window.removeEventListener('scroll', this.bottomScrol)
    },

    methods: {
      searchMore () {
        var query = this.$route.params.query
        this.$store.dispatch('searchMore', {
          query: query,
          count: 9,
          start: 0
        })
      },
      myscrol () {
        var reg = /"(.+?)"/
        var query = this.searchData.title.match(reg)[1]
        var count = this.searchData.count || this.searchData.subjects.length
        count = count + 9// 豆瓣权限不够，最多二十条
        if (this.searchData.total && count < this.searchData.total && count < 20) {
          if (!this.scrollFlag) {
            this.scrollFlag = true
            this.$store.dispatch('searchMore', {query: query, count: count, start: 0})
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

  .myInput {
    display: inline-block;
    width: 6rem;
  }

  .button {
    display: inline-block;
    width: 0.6rem;
    text-align: center;
    color: #111;
  }

  .button a {
    color: inherit;
  }
</style>
