<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户注册</span>
      </div>
      <EffectForm
        ref="effectForm"
        size="medium"
        label-position="left"
        label-width="auto"
        cancelText="重置"
        @submit="handleRegister"
      >
        <EffectFormField
          v-for="field in RegisterFields"
          v-bind="field"
          :key="field.name"
        />
      </EffectForm>
    </el-card>
  </div>
</template>

<script>
import { RegisterFields } from './formConfig'
import { postUser } from '@/apis/users'

export default {
  data() {
    return {
      // key: value,
    }
  },

  computed: {
    RegisterFields() {
      return RegisterFields(this)
    },
  },

  methods: {
    handleRegister(form) {
      postUser(form).then(() => {
        this.$router.push({ name: 'login' })
      })
    },
  },
}
</script>

<style lang="scss">
.login {
  max-width: 500px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
