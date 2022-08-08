<template>
  <a-layout>
    <a-layout-sider>
      <a-menu theme="dark"
              mode="inline"
              v-model:selected-keys="defaultSelectedKeys"
              v-model:open-keys="defaultOpenKeys">
        <a-menu-item key="pod">
          <router-link to="/pod">POD终端</router-link>
        </a-menu-item>
        <a-menu-item key="server">
          <router-link to="/server">服务器终端</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>

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
export default class Index extends Vue {
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
