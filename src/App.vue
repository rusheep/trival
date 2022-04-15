<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      text: '小肥羊',
      data: [],
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./assets/scss/main.scss";

</style>
