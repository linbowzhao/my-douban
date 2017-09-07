<template>
  <header>
    <nav>
      <router-link to="/">
        <h1>豆瓣</h1>
      </router-link>
      <router-link to="/">
        <span style="color: #2384E8;">电影</span>
      </router-link>
      <router-link to="/">
        <span style="color: #E4A813;">图书</span>
      </router-link>
      <router-link to="/">
        <span style="color: #9F7860;">广播</span>
      </router-link>
      <router-link to="/">
        <span style="color: #2AB8CC;">小组</span>
      </router-link>
      <router-link to="/search/搜索">
        <img src="./../../assets/search.png" alt="">
      </router-link>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'topHeader'
  }
</script>

<style scoped>
  header {
    width: 7.5rem;
    padding:0 0.1rem;
    position: fixed;
    background-color: white;
    top: 0;
  }
  h1 {
    color: #00b600;
    font-size: 0.5rem;
    padding-right: 0.4rem;
  }
  nav {
    display: flex;
    justify-content: space-around;
    border-bottom: solid #eeeeee 1px;
  }
  span {
    font-size: 0.3rem;
    line-height: 0.8rem;
    font-weight: bold;
  }
  img{
    width: 0.45rem;
    padding-top: 0.232rem;
  }
</style>
