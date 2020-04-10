<template>
  <el-row class="Df Jcc">
    <EffectForm
      ref="effectForm"
      :validator="true"
      class="el-col el-col-20 feedbackForm"
      label-position="left"
      label-width="auto"
      :effects="$attrs.effects"
    >
      <EffectFormField
        v-for="field in bannerFields"
        :key="field.name"
        v-bind="field"
      />

      <span slot="btnGroup"></span>
    </EffectForm>
  </el-row>
</template>

<script>
import { bannerFields } from './formConfig'

export default {
  name: 'feedbackForm',

  computed: {
    bannerFields() {
      return bannerFields(this)
    },
  },
}
</script>

<style lang="scss">
.feedbackForm {
  .el-input-number,
  .el-date-editor {
    width: 100%;
  }
}
</style>
