<template>
  <div>
    <a-form
        ref="k8sFormRef"
        :model="k8sFormState"
        :rules="k8sFormRules"
        v-bind="layout"
        :labelAlign="'left'">
      <a-form-item name="apiServerUrl" label="apiServer地址">
        <a-input v-model:value="k8sFormState.apiServerUrl"/>
      </a-form-item>
      <a-form-item name="token" label="密钥">
        <a-input v-model:value="k8sFormState.token"/>
      </a-form-item>
    </a-form>
    <a-space>
      <a-button type="primary" @click="handleOk">确定</a-button>
    </a-space>
  </div>
  <div>
    <a-form
        ref="termFormRef"
        :model="termFormState"
        :rules="termFormRules"
        v-bind="layout"
        :labelAlign="'left'">
      <a-form-item
          label="环境"
          name="namespace"
      >
        <a-select
            style="width: 100%"
            :disabled="false"
            :options="nsList"
            @change="nsChange"
            v-model:value="termFormState.namespace"
        >
        </a-select>
      </a-form-item>
      <a-form-item
          label="pod名称"
          name="podName"
      >
        <a-select
            style="width: 100%"
            :disabled="false"
            :options="podList"
            @change="podChange"
            v-model:value="termFormState.podName"
        >
        </a-select>
      </a-form-item>
      <a-form-item
          label="容器名称"
          name="containerName"
      >
        <a-select
            style="width: 100%"
            :disabled="false"
            :options="containerList"
            v-model:value="termFormState.containerName"
        >
        </a-select>
      </a-form-item>
    </a-form>
    <a-space>
      <a-button type="primary" @click="handleSubmit">连接</a-button>
      <a-button type="primary" @click="closeConnection">断开连接</a-button>
    </a-space>
  </div>

</template>

<script>
import {defineComponent, reactive, ref} from "vue"
import {doPost} from "@/util/HttpClient";
//import {doPost} from "@/util/HttpClient";

export default defineComponent({
  name: "TermForm",
  emits: ["handleOk", "onConnect", "onCloseConnection"],
  setup(props, ctx) {
    console.log(props)
    const nsList= ref();
    const podList= ref();
    const containerList= ref();
    const k8sFormRef = ref()
    const k8sFormState = reactive({
      apiServerUrl: "",
      token: ""
    })
    const k8sFormRules = reactive({
      apiServerUrl: [{
        required: true,
        message: "不能为空"
      }],
      token: [{
        required: true,
        message: "不能为空"
      }],
    })
    const handleOk = () =>{
      doPost("/api/terminal/namespaces",{apiServerUrl: k8sFormState.apiServerUrl,token: k8sFormState.token})
          .then((res) => {
                nsList.value = res.namespaces.map((item) => ({value:item,label:item}))
          });
    }
    const termFormRef = ref()
    const termFormState = reactive({
      namespace: "",
      podName: "",
      containerName: "",
    })

    // termFormState.scheme = "wss"
    // termFormState.host = "10.16.24.50"
    // termFormState.port = "6443"
    // termFormState.namespace = "pdev"
    // termFormState.podName = "crux-auth-97c8d9458-5bcp5"
    // termFormState.containerName = "crux-auth"
    // termFormState.token = "eyJhbGciOiJSUzI1NiIsImtpZCI6InZsZ2V0NnMtNGdCZ0ZJNWN3b3UwY3Zpb3ZwMGRfZkppZ1B5V21RdXNVSUkifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJrOHMtY3lrLWFkbWluLXRva2VuLTdmbGpiIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6Ims4cy1jeWstYWRtaW4iLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiJkOWRhMmQ3Yi04OWM1LTQ2ZjUtYjhmZS0zMTM4YmMwYjgxYTAiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06azhzLWN5ay1hZG1pbiJ9.sD6DnGc69Y55Bc_bNAwmOMm72l1f77JmrWLbi-81gm48MRhA1P18YeCAHTZL10hrPZgfPU23-sJz6XPktBbFP-TUKNrMIgO64vGptlYqg8S0UBYi_yY9iuod-hChRmbyvFxOajDf1nv23fXHN2AcJ0xMS4GOQICmTKKoNRYBiJHiaucvpJyc8R3qtgUkGrXONvAcQ_Zsm8v0EfDdODKwhl1ot8SeUCeIGWnW6FsQ4PwK3dqSDH2ljxVuKov7H4aINz-rQc05FspihLbqAkznrtLla_y0qYtOLS-YUpKENjKTbDBV3DbQA7yLqZI2GBfGUBHR6FfB0QU3uYEC5unLlA"

    const termFormRules = reactive({
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
      }]
    })
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    let containerMap = reactive({

    })
    const nsChange = value => {
      doPost("/api/terminal/pods",{apiServerUrl: k8sFormState.apiServerUrl,token: k8sFormState.token,namespace: value})
          .then((res) => {
            podList.value = res.pods.map((item) => ({value:item.name,label:item.name}))

            const newMap = {}
            res.pods.forEach((item) => {
              newMap[item.name] = [...item.containerVo]
            })
            containerMap = newMap
          });
    };
    const podChange = value => {
      containerList.value = containerMap[value].map((item) => ({value:item.id,label:item.id}))
    }
    const acToken= ref();
    const handleSubmit = (e) => {
      e.preventDefault();
      termFormRef.value.validateFields().then(values => {
        getAcToken().then(()=>{
          doPost("/api/terminal/execInit", {...values,
            scheme: "wss", host: k8sFormState.apiServerUrl.split(":")[1].split("//")[1],
            port: k8sFormState.apiServerUrl.split(":")[2],
            token: acToken.value
          }).then((data) => {
            ctx.emit("onConnect", data.sid)
          }).catch((e) => {
            console.error(e)
          })
        });
      }).catch(err => {
        console.error(err)
      })
    }
    const closeConnection = () => {
      ctx.emit("onCloseConnection")
    }
    const getAcToken = () =>{
      return doPost("/api/terminal/accountToken",{apiServerUrl: k8sFormState.apiServerUrl,token: k8sFormState.token}).then((res) => {
        acToken.value = res.token
        // acToken.value = "eyJhbGciOiJSUzI1NiIsImtpZCI6InpfaFdmcXN6M1Y0YkZ3RXdVRFpGaUl5ekpialpPRVExeDBYUGdJY2xHY2MifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJuYW1lc3BhY2UtY29udHJvbGxlci10b2tlbi1nZzQyNCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJuYW1lc3BhY2UtY29udHJvbGxlciIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6IjRjMmE4YTA0LTc4YzMtNDFlNS04ZDc4LWVhZGU3YzFlY2RkNiIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlLXN5c3RlbTpuYW1lc3BhY2UtY29udHJvbGxlciJ9.CPqanGiu7M9idqsZRAvaMMHTDo8ii-ZXvn26Cp-zxKkOkh7f_yEHhJXaH6rRBbaIkcXmeIGX4Ksm8bSn2oC-9rscYFsWryE-nhvwtez9LsWCd_3urgKVheqxr7jZRjSuheE8aobaom6AonPMLfXQDecc7xn50E9uV7flVzMm20--FrByV6zseAaaME32u6Ksw4lDXwrgYGTr0oQGOCqf5NM4Oz6ndnfD5ORA6Z98ANqlldaFp92jF-ZwXSKbKVr2jaw36sZZhArLXCE3XLlHksMTpWGwG_qffpE2KeGCc9PsMT4tPqFZjX84N5S2kKhdTXPzSs6JBKABGhqn2yAqEg"
        // console.log(res)
      })
    }
    return {
      nsList,
      podList,
      containerList,
      k8sFormRef,
      k8sFormState,
      k8sFormRules,
      handleOk,
      closeConnection,
      termFormRef,
      termFormState,
      termFormRules,
      layout,
      handleSubmit,
      nsChange,
      podChange,
      acToken
    }
  }
})
</script>

<style scoped>

</style>
