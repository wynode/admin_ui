<template>
  <div>
    <el-card>
      <div slot="header" class="Df Aic">
        <h1 class="Fz20 Fwb Whsnw">关卡信息</h1>
        <el-button
          class="Mla"
          icon="el-icon-back"
          @click="backToMainParentPage"
        >
          返回
        </el-button>
        <el-button type="primary" @click="onSubmit">
          保存
        </el-button>
      </div>

      <el-row class="Df Jcc">
        <EffectForm
          ref="effectForm"
          class="el-col el-col-12"
          label-position="left"
          label-width="auto"
          :validate-on-rule-change="false"
          :validator="true"
          :effects="handleFormEffects"
          @submit="submitHub"
        >
          <EffectFormField
            v-for="field in newCheckPointFields"
            v-bind="field"
            :key="field.name"
          />
          <span slot="btnGroup"></span>
        </EffectForm>
      </el-row>
    </el-card>

    <el-card v-if="isModify" class="Mt24">
      <h1 slot="header" class="Fz20 Fwb Whsnw">关卡题目</h1>
      <ExamLite :checkPointProfile="checkPointProfile" />
    </el-card>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import {
  fetchCheckPointById,
  postCheckPoint,
  patchCheckPoint,
} from '@/apis/checkpoint'
import { errorFormat } from '@/utils/errorFormat'
import ExamLite from './ExamLite.vue'
import { newCheckPointFields } from './formConfig'
import { fetchOptsHelpCenter } from '@/apis/options'

export default {
  name: 'CheckPointProfile',

  components: {
    ExamLite,
  },

  data() {
    return {
      leaveFlag: true,
      isModify: false,
      helpCenterOpts: [],
      checkPointProfile: null,
    }
  },

  computed: {
    newCheckPointFields() {
      return newCheckPointFields(this)
    },

    checkPointId() {
      return this.$route.params.id
    },
  },

  methods: {
    async fetchCheckPointProfile() {
      if (this.checkPointId) {
        this.isModify = true
        this.checkPointProfile = await fetchCheckPointById(this.checkPointId)
        this.setFormFieldValue()
      }
    },

    setFormFieldValue() {
      const { effectForm: formRef } = this.$refs
      if (formRef && this.checkPointProfile) {
        Object.keys(formRef.fields).forEach((fieldName) => {
          if (this.checkPointProfile[fieldName]) {
            formRef.setForm(fieldName, this.checkPointProfile[fieldName])
          }
        })
      }
    },

    handleFormEffects(subscribe, { setFieldState }) {
      subscribe('onFieldInit', (fields) => {
        if (fields.status) {
          setFieldState('status', (ref) => {
            ref.ifRender = this.isModify
          })
        }
      })
    },

    backToMainParentPage() {
      this.$router.push({ name: 'checkPointList' })
    },

    onSubmit: debounce(function onSubmit() {
      if (this.$refs.effectForm) {
        this.$refs.effectForm.onSubmit()
      }
    }, 200),

    submitHub(form) {
      if (this.isModify && this.checkPointProfile) {
        this.updateCheckPoint(form)
      } else {
        this.newCheckPoint(form)
      }
    },

    async newCheckPoint(form) {
      try {
        await postCheckPoint(form)
        this.leaveFlag = false
        this.$notify.success('创建成功')
        setTimeout(() => {
          this.backToMainParentPage()
        }, 2000)
      } catch (error) {
        const formErrors = errorFormat(error.data)
        this.$refs.effectForm.setFieldError(formErrors)
      }
    },

    async updateCheckPoint(form) {
      try {
        await patchCheckPoint(this.checkPointId, form)
        this.leaveFlag = false
        this.$notify.success('修改成功')
        setTimeout(() => {
          this.backToMainParentPage()
        }, 2000)
      } catch (error) {
        const formErrors = errorFormat(error.data)
        this.$refs.effectForm.setFieldError(formErrors)
      }
    },
  },

  beforeRouteLeave(to, from, next) {
    if (this.leaveFlag) {
      this.$confirm('离开此页面，未保存的数据将会丢失！', '页面即将跳转', {
        type: 'warning',
      })
        .then(() => {
          next()
        })
        .catch(() => {
          next(false)
        })
    } else {
      next()
    }
  },

  mounted() {
    this.isModify = false
    this.fetchCheckPointProfile()
    fetchOptsHelpCenter().then((res) => {
      this.helpCenterOpts = res.results.map((item) => {
        return {
          label: item.title,
          value: item.id,
        }
      })
    })
  },
}
</script>

<style></style>
