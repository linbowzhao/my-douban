<template>
  <div class="tag">
    <router-link :to="`/tagList/${tag}`">
      {{tag}}
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'star',

    props: ['tag']
  }
</script>

<style scoped>
  .tag {
    display: inline-block;
    background-color: #eeeeee;
    font-size: 0.3rem;
    font-weight: bold;
    margin: 0.05rem;
    padding: 0.07rem 0.3rem;
    border-radius: 0.3rem;
  }
</style>
