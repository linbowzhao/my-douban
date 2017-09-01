<template>
  <Spin fix>
    <img src="../assets/doubanIcon.png" alt="豆瓣" class="logo"/>
    <icon class="spin-icon-load" type="load-c" size="120"></icon>
    <h1 class="slogen">豆瓣：我们的精神部落</h1>
  </Spin>
</template>

<script>
  import Spin from 'iview/src/components/spin'
  export default {
    name: 'loading',

    components: {
      Spin
    }
  }
</script>

<style scoped>
  .spin-icon-load{
    animation: ani-spin 1s linear infinite;
  }

  @keyframes ani-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }

  .spin-icon-load,.slogen{
    color:#00b600
  }
  .logo{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    margin-top: -25px;
    margin-left: -25px;
  }
  .slogen{
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }


</style>
