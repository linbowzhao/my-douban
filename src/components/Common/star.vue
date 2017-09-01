<template>
  <div class="star">
    <div v-if="!average">暂无评分</div>
    <div v-else>
      <img alt="*" v-for="n in 5" :src="imgSrc(n)" :style="`width: ${length}rem;height: ${length}rem`">
    </div>
  </div>
</template>

<script>
  import starActive from './../../assets/starActive.png'
  import starGrey from './../../assets/starGrey.png'

  export default {
    name: 'star',

    props: ['average', 'length'],

    methods: {
      imgSrc (n) {
        return (n*2-1>this.average) ? starGrey : starActive // eslint-disable-line
      }
    }
  }
</script>

<style scoped>
  .star {
    display: inline-block;
  }

</style>
