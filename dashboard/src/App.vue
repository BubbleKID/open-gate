<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width=120>
    <Table msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Table from './components/Table.vue';

export default {
  name: 'App',
  components: {
    Table,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
