<template>
  <router-link :to="`/movieDetail/${(detail.subject?detail.subject:detail).id}`">
    <section class="movieItem">
      <img :src="(detail.subject ? detail.subject : detail).images.large" alt="电影封面">
      <h3 class="itemTitle" :title="title">
        {{ title }}
      </h3>
      <div class="average">
        <star :average="average" :length="0.2"></star>
        <span v-if="average">
        {{ average.toFixed(1) }}
        </span>
      </div>
    </section>
  </router-link>
</template>

<script>
  import Star from './star'

  export default {
    name: 'movieItem',

    components: {
      Star
    },

    props: ['detail'],

    computed: {
      average () {
        return (
          this.detail.subject ? this.detail.subject : this.detail
        ).rating.average
      },
      title () {
        var title = this.detail.subject ? this.detail.subject.title : this.detail.title
        return title
      }
    }
  }
</script>

<style scoped>
  .movieItem {
    display: inline-flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    margin-left: 0.375rem;
  }

  img {
    width: 2rem;
    height: 2.8568rem;
  }

  .itemTitle {
    margin-top: 0.3rem;
    margin-bottom: 0.096rem;
    font-size: 0.3rem;
    line-height: 0.35rem;
    color: #111;
    max-width: 2rem;
    height: 0.36rem;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .average {
    display: flex;
    color: #aaa;
    font-size: 0.24rem;
    font-weight: bold;
  }

  .average > span {
    margin-left: 0.03rem;
  }
</style>
