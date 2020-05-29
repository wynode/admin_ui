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
          class="verify_code_item"
          :error="errorMsg"
        >
          <div class="verify_code" v-on:keyup.enter="handleLoginFn">
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
      verifyCodeTime: '',
      verifyCodeHash: '',
      errorMsg: '',
    }
  },

  computed: {
    LoginFields() {
      return LoginFields(this)
    },
  },

  methods: {
    handleLoginFn() {
      const form = this.$refs.effectForm.form
      this.handleLogin(form)
    },
    handleLogin(form) {
      if (!this.verifyCode) {
        this.errorMsg = '请填入验证码'
        return
      }
      postLogin({
        ...form,
        verifyCode: this.verifyCode,
        verifyCodeTime: this.verifyCodeTime,
        verifyCodeHash: this.verifyCodeHash,
      })
        .then((data) => {
          const { adminSession, adminId, adminName, adminAccount } = data.result
          store.set(AUTH_TOKEN, adminSession)
          store.set(USER_INFO, {
            adminId,
            adminName,
            adminAccount,
          })
          this.$router.push('/')
        })
        .catch(() => {
          this.errorMsg = ''
        })
      this.errorMsg = ''
      this.fetchVerifyCodeFn()
    },

    fetchVerifyCodeFn() {
      fetchVerifyCode().then((data) => {
        this.verifyCodeUrl = data.result.verifyCode || ''
        this.verifyCodeTime = data.result.verifyCodeTime
        this.verifyCodeHash = data.result.verifyCodeHash
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
  .verify_code_item {
    position: relative;
    &::before {
      content: '*';
      color: #f04038;
      margin-right: 4px;
      position: absolute;
      top: 10px;
      left: 13px;
    }
  }
  .verify_code {
    display: flex;
    .verify_code_img {
      max-width: 160px;
      height: 36px;
      cursor: pointer;
      margin-left: 20px;
      margin-right: 38px;
    }
  }
}
</style>
