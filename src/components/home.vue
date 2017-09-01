<template>
  <div class='home'>
    <top-header></top-header>
    <div v-for="item in homeData" :key="item.title">
      <h2>
        <span class="title">{{item.title}}</span>
        <span>
          <router-link :to="`/more/${item.title}`" class="more">更多</router-link>
        </span>
      </h2>
      <div class="movieItems">
        <movie-item v-for="item in item.subjects" :key="item.id" :detail="item"></movie-item>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import TopHeader from './Common/topHeader'
  import MovieItem from './Common/movieItem'

  export default {
    name: 'home',

    components: {
      TopHeader,
      MovieItem
    },

    computed: mapState({
      homeData (state) {
        return state.home.homeData
      }
    })

  }
</script>

<style scoped>
  .home {
    padding: 0.74rem 0.3rem 0 0;
  }

  .movieItems {
    white-space: nowrap;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    height: 4rem;
  }

  .movieItems::-webkit-scrollbar {
    display: none;
  }

  h2 {
    padding: 0.2rem 0.36rem 0.3rem 0.36rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h2 .title {
    color: #111;
    font-size: 0.36rem;
  }

  h2 .more {
    color: #42bd56;
    font-size: 0.3rem;
  }

</style>
