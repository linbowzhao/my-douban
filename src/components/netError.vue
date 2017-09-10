<template>
  <div class="error">
    <top-header></top-header>
    <div class="content">
      <img :src="err" alt="">
      <div>这个页面不在了</div>
      <router-link to="/">返回豆瓣首页</router-link>
    </div>
  </div>
</template>

<script>
  import TopHeader from './Common/topHeader'
  import err from '../assets/404.png'

  export default {
    name: 'error',

    components: {
      TopHeader
    },

    data () {
      return {
        err: err
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content {
    padding-top: 3.5rem;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    color: #999;
    font-size: 0.35rem;
  }

  img {
    width: 4rem;
  }

  .content div{
    margin-top: 0.25rem;
  }

  .content a {
    margin-top: 0.25rem;
    color: #42bd56;
  }
</style>
