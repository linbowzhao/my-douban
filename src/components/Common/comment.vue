<template>
  <div class="comment">
    <Alert type="success" show-icon v-if="showAlter" class="success">已经点过赞</Alert>
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
  import Alert from 'iview/src/components/alert'
  import Star from './star'
  import likeGray from './../../assets/ic_like_gray.svg'
  import likeGreen from './../../assets/ic_like_green.svg'

  export default {
    data: function () {
      return {
        usefulCount: '',
        likeSrc: '',
        showAlter: false
      }
    },
    created: function () {
      this.usefulCount = window.localStorage[this.comment.id] ? this.comment.useful_count + 1 : this.comment.useful_count
      this.likeSrc = window.localStorage[this.comment.id] ? likeGreen : likeGray
    },
    components: {
      Star,
      Alert
    },

    name: 'comment',

    props: ['comment'],

    computed: {
    },
    methods: {
      tap () {
        if (window.localStorage[this.comment.id]) {
          this.showAlter = true
          setTimeout(function (that) {
            that.showAlter = false
          }, 1000, this)
          return
        }
        window.localStorage.setItem(this.comment.id, true)
        this.usefulCount += 1
        this.likeSrc = likeGreen
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
  .success {
    position: fixed;
    font-size: 0.24rem;
    display: inline-block;
    top: 0.81rem;
    width: 3.5rem;
    left: 1.8rem;
    text-align: center;
    white-space: nowrap;
  }
</style>
