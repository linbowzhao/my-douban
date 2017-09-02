<template>
  <div class="comment">
    <div class="headImg">
      <img :src="comment.author.avatar" alt="头像">
    </div>
    <div>
      <span class="name">{{comment.author.name}}</span>
      <star :average="comment.rating.value*2" :length="0.3"></star>
      <p class="time">{{comment.created_at}}</p>
      <p class="content">{{comment.content}}</p>
      <span @click.stop.prevent="tap" class="like">
        <img :src="likeSrc" alt="">
        <span class="count">{{ usefulCount }}</span>
      </span>
    </div>
  </div>
</template>

<script>
  import Star from './star'
  import likeGray from './../../assets/ic_like_gray.svg'
  import likeGreen from './../../assets/ic_like_green.svg'

  export default {
    components: {
      Star
    },

    name: 'comment',

    props: ['comment'],

    computed: {
      likeSrc () {
        return window.localStorage[this.comment.id] ? likeGreen : likeGray
      },
      usefulCount () {
        return window.localStorage[this.comment.id] ? this.comment.useful_count + 1 : this.comment.useful_count
      }
    },

    methods: {
      tap () {
        window.localStorage.setItem(this.comment.id, true)
      }
    }
  }
</script>

<style scoped>
  .comment {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 0.5rem;
    font-size: 0.3rem;
  }

  .headImg {
    width: 0.7rem;
    margin-right: 0.2rem;
  }

  img {
    width: 0.7rem;
    border-radius: 0.35rem;
  }

  .name {
    font-weight: bold;
  }

  .time {
    font-weight: lighter;
    color: #bbbbbb;
    font-size: 0.25rem;
  }

  .like img {
    width: 0.4rem;
    vertical-align: middle;
  }

  .like {
    display: inline-block;
  }

  .count {
    display: inline-block;
  }
</style>
