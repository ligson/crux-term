<template>
  <div>
    <ServerForm @onConnect="onConnect"></ServerForm>
    <ServerTermWin ref="serverTermWinRef"/>
  </div>
</template>

<script>
import ServerForm from "@/components/server/ServerForm.vue";
import {defineComponent, ref} from "vue";
import ServerTermWin from "@/components/server/ServerTermWin.vue";

export default defineComponent({
  name: "ServerTerm",
  components: { ServerTermWin, ServerForm },
  setup() {
    const serverTermWinRef = ref();
    const onConnect = (sid) => {
      serverTermWinRef.value.initSocket("ws://127.0.0.1:8080/sshterminal/" + sid)
    };
    return {
      onConnect, serverTermWinRef
    }
  }
})
</script>

<style scoped>

</style>
