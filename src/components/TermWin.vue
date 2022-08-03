<template>
  <div id="xterm-container"></div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {Terminal} from 'xterm'
import {FitAddon} from 'xterm-addon-fit'
import {Base64} from "js-base64";

export default defineComponent({
  setup() {
    //const accessToken = ref("eyJhbGciOiJSUzI1NiIsImtpZCI6InZsZ2V0NnMtNGdCZ0ZJNWN3b3UwY3Zpb3ZwMGRfZkppZ1B5V21RdXNVSUkifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrOHMtY3lrLWFkbWluLXRva2VuLTdmbGpiIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6Ims4cy1jeWstYWRtaW4iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiJkOWRhMmQ3Yi04OWM1LTQ2ZjUtYjhmZS0zMTM4YmMwYjgxYTAiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06azhzLWN5ay1hZG1pbiJ9.sD6DnGc69Y55Bc_bNAwmOMm72l1f77JmrWLbi-81gm48MRhA1P18YeCAHTZL10hrPZgfPU23-sJz6XPktBbFP-TUKNrMIgO64vGptlYqg8S0UBYi_yY9iuod-hChRmbyvFxOajDf1nv23fXHN2AcJ0xMS4GOQICmTKKoNRYBiJHiaucvpJyc8R3qtgUkGrXONvAcQ_Zsm8v0EfDdODKwhl1ot8SeUCeIGWnW6FsQ4PwK3dqSDH2ljxVuKov7H4aINz-rQc05FspihLbqAkznrtLla_y0qYtOLS-YUpKENjKTbDBV3DbQA7yLqZI2GBfGUBHR6FfB0QU3uYEC5unLlA");
    //const baseUrl = ref("wss://10.16.24.50:6443");
    //const envName = ref("pdev");
    //const podId = ref("crux-auth-97c8d9458-5bcp5");
    //const containerId = ref("crux-auth");

    //const cmd = ref("/bin/sh -i")
    //const socketURI = ref(`${baseUrl.value}/api/v1/namespaces/${envName.value}/pods/${podId.value}/exec?container=${containerId.value}&stdin=true&stdout=true&stderr=true&tty=true&command=${encodeURIComponent(cmd.value)}&pretty=true&follow=true`);

    //const socketURI = ref(baseUrl.value + "/api/v1/namespaces/" + envName.value + "/pods/" + podId.value + "/exec?stdout=1&stdin=1&stderr=1&tty=1&container=crux-auth&command=" + encodeURIComponent(cmd.value) + "&access_token=" + accessToken.value)
    //const socketURI = ref("")
    //socketURI.value = "ws://127.0.0.1:8080/ws";

    const socket = ref();
    const term = ref();

    const initSocket = (socketURI) => {
      socket.value = new WebSocket(socketURI);

      socketOnClose();
      socketOnOpen();
      socketOnmessage();
      socketOnError();
    }
    const socketOnOpen = () => {
      socket.value.onopen = () => {
        console.log("web链接成功");
        // 链接成功后
        initTerm();

      };
    };
    const socketOnmessage = () => {
      socket.value.onmessage = (evt) => {
        try {
          if (typeof evt.data === "string") {
            const msg = evt.data;
            if (!msg) {
              return;
            }
            // 将返回的数据写入xterm，回显在webshell上
            //let str = new TextDecoder().decode(msg);
            let str = Base64.decode(msg.toString().substring(1))

            term.value.write(str);
            // 此处可以判断一下，如果是首次连接，需要将rows，cols传给服务器端
            // when server ready for connection,send resize to server
            // socket.value.send(
            //     JSON.stringify({
            //       type: "resize",
            //       rows: term.value.rows,
            //       cols: term.value.cols,
            //     })
            // );
          }
        } catch (e) {
          console.error(e);
          console.log("parse json error.", evt.data);
        }
      };
    };
    const socketOnClose = () => {
      socket.value.onclose = (e) => {
        socket.value.close();
        console.log("关闭 socket" + e);
        // if (socket.value) {
        //   socket.value.close();
        // }
        //window.removeEventListener("resize", this.onTerminalResize);
      };
    }
    const socketOnError = () => {
      socket.value.onerror = (e) => {
        console.log("socket 链接失败" + e);
      };
    }

    const initTerm = () => {
      term.value = new Terminal({ cursorBlink: true, rendererType: "canvas" });
      const fitAddon = new FitAddon();
      term.value.loadAddon(fitAddon);


      // 自适应大小(使终端的尺寸和几何尺寸适合于终端容器的尺寸)，初始化的时候宽高都是对的
      fitAddon.fit();
      term.value.focus();

      term.value.open(document.getElementById('xterm-container'));


      //监视命令行输入
      term.value.onData((data) => {
        let cmd = Base64.encode(data);
        socket.value.send("0" + cmd)
      })
    }
    return {
      initSocket
    }
  }
});
</script>

<style scoped>
@import url('xterm/css/xterm.css');

#xterm-container {
  width: 100%;
  height: 100%;
}
</style>
