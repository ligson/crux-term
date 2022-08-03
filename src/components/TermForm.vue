<template>
  <a-form
      ref="termFormRef"
      :model="termFormState"
      :rules="termFormRules"
      v-bind="layout"
      :labelAlign="'left'">
    <a-form-item name="scheme" label="协议(scheme)">
      <a-input v-model:value="termFormState.scheme"/>
    </a-form-item>
    <a-form-item name="host" label="主机(host)">
      <a-input v-model:value="termFormState.host"/>
    </a-form-item>
    <a-form-item name="port" label="端口(port)">
      <a-input v-model:value="termFormState.port"/>
    </a-form-item>
    <a-form-item name="namespace" label="命名空间(namespace)">
      <a-input v-model:value="termFormState.namespace"/>
    </a-form-item>
    <a-form-item name="podName" label="pod名称">
      <a-input v-model:value="termFormState.podName"/>
    </a-form-item>
    <a-form-item name="containerName" label="容器名称">
      <a-input v-model:value="termFormState.containerName"/>
    </a-form-item>
    <a-form-item name="token" label="令牌(token)">
      <a-textarea v-model:value="termFormState.token"/>
    </a-form-item>
  </a-form>
  <a-button type="primary" @click="handleSubmit">连接</a-button>
</template>

<script>
import {defineComponent, reactive, ref} from "vue"
import {doPost} from "@/util/HttpClient";
//import {doPost} from "@/util/HttpClient";

export default defineComponent({
  name: "TermForm",
  emits: ["onConnect"],
  setup(props, ctx) {
    console.log(props)
    const termFormRef = ref()
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
    const termFormState = reactive({
      scheme: "",
      host: "",
      port: "",
      namespace: "",
      podName: "",
      containerName: "",
      token: ""
    })

    termFormState.scheme = "wss"
    termFormState.host = "10.16.24.50"
    termFormState.port = "6443"
    termFormState.namespace = "pdev"
    termFormState.podName = "crux-auth-97c8d9458-5bcp5"
    termFormState.containerName = "crux-auth"
    termFormState.token = "eyJhbGciOiJSUzI1NiIsImtpZCI6InZsZ2V0NnMtNGdCZ0ZJNWN3b3UwY3Zpb3ZwMGRfZkppZ1B5V21RdXNVSUkifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrOHMtY3lrLWFkbWluLXRva2VuLTdmbGpiIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6Ims4cy1jeWstYWRtaW4iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiJkOWRhMmQ3Yi04OWM1LTQ2ZjUtYjhmZS0zMTM4YmMwYjgxYTAiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06azhzLWN5ay1hZG1pbiJ9.sD6DnGc69Y55Bc_bNAwmOMm72l1f77JmrWLbi-81gm48MRhA1P18YeCAHTZL10hrPZgfPU23-sJz6XPktBbFP-TUKNrMIgO64vGptlYqg8S0UBYi_yY9iuod-hChRmbyvFxOajDf1nv23fXHN2AcJ0xMS4GOQICmTKKoNRYBiJHiaucvpJyc8R3qtgUkGrXONvAcQ_Zsm8v0EfDdODKwhl1ot8SeUCeIGWnW6FsQ4PwK3dqSDH2ljxVuKov7H4aINz-rQc05FspihLbqAkznrtLla_y0qYtOLS-YUpKENjKTbDBV3DbQA7yLqZI2GBfGUBHR6FfB0QU3uYEC5unLlA"

    const termFormRules = reactive({
      scheme: [{
        required: true,
        message: "不能为空"
      }],
      host: [{
        required: true,
        message: "不能为空"
      }],
      port: [{
        required: true,
        message: "不能为空"
      }],
      namespace: [{
        required: true,
        message: "不能为空"
      }],
      podName: [{
        required: true,
        message: "不能为空"
      }],
      containerName: [{
        required: true,
        message: "不能为空"
      }],
      token: [{
        required: true,
        message: "不能为空"
      }]
    })
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      termFormRef.value.validateFields().then(values => {
        doPost("/api/terminal/execInit", values).then((data) => {
          ctx.emit("onConnect", data.sid)
        }).catch((e) => {
          console.error(e)
        })
      }).catch(err => {
        console.error(err)
      })
    }
    return {
      termFormRef,
      termFormState,
      termFormRules,
      layout,
      handleSubmit
    }
  }
})
</script>

<style scoped>

</style>
