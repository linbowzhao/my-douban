<template>
  <router-link :to="`/workerDetail/`">
    <section class="worker">
      <img :src="worker.avatars.large" alt="照片">
      <h3 class="name">
        {{ worker.name }}
      </h3>
    </section>
  </router-link>
</template>

<script>
  export default {
    name: 'worker',

    props: ['worker']
  }
</script>

<style scoped>
  .worker{
    display: inline-flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    margin-right: 0.375rem;
  }
  img{
    width: 2rem;
  }
  .name{
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
</style>
