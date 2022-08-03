<template>
  <div class="ws_container">
    <div class="ws_form">
      <TermForm @onConnect="onConnect" @onCloseConnection="onCloseConnection"/>
    </div>
    <div class="ws_term">
      <TermWin ref="termRef"/>
    </div>
  </div>

</template>

<script>
import {defineComponent, ref} from 'vue'
import TermForm from "@/components/TermForm";
import TermWin from "@/components/TermWin";

export default defineComponent({
  components: { TermWin, TermForm },
  setup() {
    const termRef = ref()
    const onConnect = (sid) => {
      console.log(sid)
      //terminal
      //ws://127.0.0.1:8080/ws
      termRef.value.initSocket("ws://127.0.0.1:8080/terminal/" + sid);
    }
    const onCloseConnection = () => {
      termRef.value.closeSocket();
    }
    return { onConnect, onCloseConnection, termRef }
  }
});
</script>
<style scoped>
.ws_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ws_form {
  height: 500px;
}

.ws_term {
  flex: 1;
  background-color: black;
}

</style>


