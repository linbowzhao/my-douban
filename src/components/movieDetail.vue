<template>
  <div class='movieDetail'>
    <top-header></top-header>
    <div class="main">
      <div class="movieAbout">
        <div class="mes">
          <h1>{{currentMovie.title}}</h1>
          <star :average="currentMovie.rating.average" :length="0.3"></star>
          <span class="average">{{currentMovie.rating.average}}</span>
          <span class="commentCount">{{currentMovie.ratings_count}}人评论</span>
          <p class="keys">{{keys}}</p>
        </div>
        <div class="img">
          <img :src="this.currentMovie.images.large" alt="暂无封面">
        </div>
      </div>
      <h4 class="title">{{this.currentMovie.title}}剧情的简介</h4>
      <div class="movieIntro">
        <p class="content">{{this.currentMovie.summary}}</p>
      </div>
      <h4 class="title">查看更多</h4>
      <div class="movieTags">
        <tag v-for="tag in this.currentMovie.tags" :tag="tag"></tag>
      </div>
      <h4 class="title">{{this.currentMovie.title}}的导演和主演</h4>
      <div class="workers">
        <worker v-for="director in currentMovie.directors" :worker="director" class="director"></worker>
        <worker v-for="cast in currentMovie.casts" :worker="cast" class="avatar"></worker>
      </div>
      <h4 class="title">{{currentMovie.title}}的预告片和剧照</h4>
      <div class="foresee">
        <img v-for="trailer in currentMovie.trailers" :src="trailer.medium" alt="电影图片">
      </div>
      <h4 class="title">{{currentMovie.title}}的短评({{comments.total}})</h4>
      <div class="comment">
        <comment v-for="comment in comments.comments" :comment="comment"></comment>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import TopHeader from './Common/topHeader'
  import Star from './Common/star'
  import Tag from './Common/tag'
  import Worker from './Common/worker'
  import Comment from './common/comment'

  export default {
    name: 'movieDetail',

    components: {
      TopHeader,
      Star,
      Tag,
      Worker,
      Comment
    },

    computed: mapState({
      currentMovie (state) {
        return state.movieDetail.currentMovie
      },
      comments (state) {
        return state.movieDetail.comments
      },
      movieId () {
        return this.$route.params.movieId
      },
      keys () {
        function mystr (arr, name) {
          var str = ''
          for (var i = 0; i < arr.length; i++) {
            if (str !== '') str += '/'
            str = str + arr[i][name]
          }
          return str
        }

        var str = this.currentMovie.genres.join('/') + '/' +
          mystr(this.currentMovie.directors, 'name') + '/' +
          mystr(this.currentMovie.casts, 'name') + '/' +
          this.currentMovie.year + '年' + '(' +
          this.currentMovie.countries.join(',') + ')' + '上映'
        return str
      }
    })
  }
</script>
<style scoped>
  .main {
    padding: 0.81rem 0.4rem 0 0.4rem;
  }

  h1 {
    color: black;
    font-size: 0.45rem;
  }

  .movieAbout {
    padding-top: 0.7rem;
    display: flex;
    justify-content: space-between;
    flex-flow: row nowrap;
    align-items: flex-end;
  }

  .average {
    font-size: 0.3rem;
    font-weight: bold;
  }

  .commentCount {
    font-size: 0.3rem;
    color: #bbbbbb;
    font-weight: bold;
  }

  .keys {
    margin-top: 0.4rem;
  }

  .mes {
    display: inline-block;
    width: 4rem;
    font-size: 0.3rem;
  }

  .img {
    display: inline-block;
  }

  .img img {
    width: 2rem;
  }

  .movieIntro {
    font-size: 0.3rem;
  }

  .title {
    font-size: 0.3rem;
    color: #bbbbbb;
    margin: 0.5rem 0;
    font-weight: bold;
    text-align: left;
  }

  .movieTags {
    margin: 0 auto;
  }

  .workers, .foresee {
    white-space: nowrap;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }
  .foresee img {
    height: 2.5rem;
    margin-right: 0.3rem;
  }
</style>
