<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户登录</span>
      </div>
      <EffectForm
        ref="effectForm"
        size="medium"
        label-position="left"
        label-width="auto"
        cancelText="重置"
        @submit="handleLogin"
      >
        <EffectFormField
          v-for="field in LoginFields"
          v-bind="field"
          :key="field.name"
        />
      </EffectForm>
    </el-card>
  </div>
</template>

<script>
import store from 'store2'
import { AUTH_TOKEN, USER_INFO } from '@/config'
import { LoginFields } from './formConfig'
import { postLogin } from '@/apis/system'

export default {
  data() {
    return {
      // key: value,
    }
  },

  computed: {
    LoginFields() {
      return LoginFields(this)
    },
  },

  methods: {
    handleLogin(form) {
      postLogin(form).then((data) => {
        const { adminSession, adminId, adminName, adminAccount } = data.result
        store.set(AUTH_TOKEN, adminSession)
        store.set(USER_INFO, {
          adminId,
          adminName,
          adminAccount,
        })
        this.$router.push('/')
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
  .effect_btn_group {
    display: flex;
    justify-content: center;
  }
}
</style>
