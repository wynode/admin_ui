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
        <el-form-item
          label="验证码"
          prop="verifyCode"
          :rules="[{ required: true, message: '验证码错误', trigger: 'blur' }]"
        >
          <div class="verify_code">
            <el-input v-model="verifyCode"></el-input>
            <img
              :src="verifyCodeUrl"
              alt=""
              class="verify_code_img"
              @click="fetchVerifyCodeFn"
            />
          </div>
        </el-form-item>
      </EffectForm>
    </el-card>
  </div>
</template>

<script>
import store from 'store2'
import { AUTH_TOKEN, USER_INFO } from '@/config'
import { LoginFields } from './formConfig'
import { postLogin } from '@/apis/system'
import { fetchVerifyCode } from '@/apis/all'

export default {
  data() {
    return {
      // key: value,
      url: 'https://sso.yunaq.com/captcha/',
      verifyCode: '',
      verifyCodeUrl: '',
    }
  },

  computed: {
    LoginFields() {
      return LoginFields(this)
    },
  },

  methods: {
    handleLogin(form) {
      postLogin({
        ...form,
        verifyCode: this.verifyCode,
      }).then((data) => {
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

    fetchVerifyCodeFn() {
      fetchVerifyCode().then((data) => {
        this.verifyCodeUrl = data.result.verifyCode || ''
        store.set('verifyCodeHash', data.result.verifyCodeHash)
        store.set('verifyCodeTime', data.result.verifyCodeTime)
      })
    },
  },

  mounted() {
    this.fetchVerifyCodeFn()
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
  .verify_code {
    display: flex;
    .verify_code_img {
      max-width: 160px;
      height: 36px;
      margin-left: 20px;
      margin-right: 38px;
    }
  }
}
</style>
