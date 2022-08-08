<template>
  <div>
    <a-form
        ref="serverFormRef"
        :model="serverFormState"
        :rules="serverFormRules"
        v-bind="layout"
        :labelAlign="'left'">
      <a-form-item name="host" label="主机(host)">
        <a-input v-model:value="serverFormState.host"/>
      </a-form-item>
      <a-form-item name="port" label="端口(port)">
        <a-input v-model:value="serverFormState.port"/>
      </a-form-item>
      <a-form-item name="user" label="用户(namespace)">
        <a-input v-model:value="serverFormState.user"/>
      </a-form-item>
      <a-form-item name="password" label="密码">
        <a-input v-model:value="serverFormState.password"/>
      </a-form-item>
    </a-form>
    <a-space>
      <a-button type="primary" @click="handleSubmit">连接</a-button>
    </a-space>
  </div>

</template>

<script>
import {doPost} from "@/util/HttpClient";
import {defineComponent, reactive, ref} from "vue";

export default defineComponent({
  name: "ServerForm",
  emits: ["onConnect"],
  setup(props, ctx) {
    const serverFormState = reactive({
      host: "",
      port: "",
      user: "",
      password: "",
    })

    const serverFormRules = reactive({
      host: [{
        required: true,
        message: "不能为空"
      }],
      port: [{
        required: true,
        message: "不能为空"
      }],
      user: [{
        required: true,
        message: "不能为空"
      }],
      password: [{
        required: true,
        message: "不能为空"
      }],
    })
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const serverFormRef = ref()
    const handleSubmit = (e) => {
      e.preventDefault();
      serverFormRef.value.validateFields().then(values => {
        doPost("/api/terminal/initSsh", values).then((data) => {
          ctx.emit("onConnect", data.sid)
        }).catch((e) => {
          console.error(e)
        })
      }).catch(err => {
        console.error(err)
      })
    }
    return {
      serverFormState, serverFormRules, handleSubmit, layout, serverFormRef
    }
  }
})
</script>

<style scoped>

</style>
