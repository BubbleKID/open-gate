<template>
  <div id="app">
    <img v-if="this.$store.state.isLogin" alt="Vue logo" src="./assets/logo.png" width=120>
    <Table v-if="this.$store.state.isLogin" msg="Welcome to Your Vue.js App"/>
    <Login v-if="!this.$store.state.isLogin"/>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import Table from './components/Table.vue';
import Login from './components/Login.vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: false,
  },
  mutations: {
    userLogin(state) {
      state.isLogin = !state.isLogin;
      localStorage.setItem('isLogin', state.isLogin);
    },
  },
});

export default {
  name: 'App',
  store,
  components: {
    Table,
    Login,
  },
  mounted() {
    if (localStorage.getItem('isLogin')) {
      this.$store.state.isLogin = localStorage.getItem('isLogin');
    }
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
}
</style>
