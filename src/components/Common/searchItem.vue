<template>
  <router-link :to="`/movieDetail/${(detail.subject?detail.subject:detail).id}`">
    <section class="searchItem">
      <img :src="(detail.subject ? detail.subject : detail).images.small" alt="电影封面">
      <div class="content">
        <h3 class="itemTitle" :title="title">
          {{ title }}
        </h3>
        <div class="average">
          <star :average="average" :length="0.2"></star>
          <span v-if="average">
        {{ average.toFixed(1) }}
        </span>
        </div>
        <div class="time">{{detail.year}}</div>
      </div>
    </section>
  </router-link>
</template>

<script>
  import Star from './star'

  export default {
    name: 'searchItem',

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
  .searchItem {
    border-bottom: solid #eeeeee 1px;
    padding: 0.2rem 0;
  }
  img {
    width: 0.8rem;
    vertical-align: top;
  }
  .content {
    display: inline-block;
    color: #aaa;
    font-size: 0.25rem;
  }
  .itemTitle {
    color: #111;
    font-size: 0.3rem;
    overflow: hidden;
    white-space: nowrap;
    width: 5.8rem;
  }
</style>
