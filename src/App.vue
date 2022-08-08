<template>
  <router-view></router-view>
</template>

<script lang="ts">
import {ref} from 'vue';

import {Options, Vue} from 'vue-class-component';

@Options({
  data() {
    const defaultSelectedKeys = ref([]);
    const defaultOpenKeys = ref([]);
    return {
      defaultSelectedKeys,
      defaultOpenKeys
    }
  }
})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
