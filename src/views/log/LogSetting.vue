<template>
  <div>
    <el-card class="log_card">
      <div v-if="showEdit">
        <ul class="log_setting">
          <li v-for="item in ChangeFields" :key="item.name">
            <p>{{ item.title }}：</p>
            <p>{{ logConfig[item.name] }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <EffectForm
          ref="effectForm"
          size="medium"
          label-position="left"
          label-width="auto"
          :needToolBtnGroup="false"
          :effects="handleFormEffects"
        >
          <EffectFormField
            v-for="field in ChangeFields"
            v-bind="field"
            :key="field.name"
          />
        </EffectForm>
      </div>

      <el-button
        type="primary"
        size="small"
        @click="handleGoEdit"
        v-if="showEdit"
        style="margin-left: 80px"
      >
        编辑
      </el-button>
      <div v-else class="Df" style="width: 300px; margin-left: 40px">
        <el-button type="primary" size="small" @click="handleGoSubmit">
          确定
        </el-button>
        <el-button size="small" @click="handleGoSubmitNoModify">
          返回
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ChangeFields } from './formConfig'
import { fetchLogConfig, patchLogConfig } from '@/apis/all'
import { translate } from '@/utils/mappings'

export default {
  computed: {
    ChangeFields() {
      return ChangeFields(this)
    },
  },

  data() {
    return {
      logConfig: {
        maxStorageDate: '',
        isWriteCookieData: '',
        isWritePostData: '',
        isWriteHeaderData: '',
      },
      showEdit: true,
    }
  },

  methods: {
    handleGoEdit() {
      this.showEdit = false
    },

    handleGoSubmitNoModify() {
      this.showEdit = true
    },

    handleGoSubmit() {
      const { form } = this.$refs.effectForm
      patchLogConfig(form).then(() => {
        this.$message.success('编辑成功')
        this.fetchLogConfigFn()
        this.showEdit = true
      })
    },

    fetchLogConfigFn() {
      fetchLogConfig().then((data) => {
        const result = data.result || {}
        Object.keys(result).forEach((item) => {
          this.logConfig[translate(item, 'logSetting')] = result[item]
        })
      })
    },

    handleFormEffects(subscribe) {
      subscribe('onFieldInit', (fields) => {
        Object.keys(fields).forEach((item) => {
          const { setForm } = this.$refs.effectForm
          setForm(item, this.logConfig[item])
        })
      })
    },
  },

  mounted() {
    this.fetchLogConfigFn()
  },
}
</script>

<style lang="scss">
.log_setting {
  li {
    display: flex;
    margin-bottom: 30px;
    margin-top: 16px;
  }
}
.log_card {
  .el-card__body {
    max-width: 500px;
    margin: 0 auto;
    // padding: 40px !important;
  }
  .el-form-item {
    margin-bottom: 16px;
  }
  .el-button {
    margin: 0 auto;
    display: flex;
  }
}
</style>
