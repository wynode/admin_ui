<template>
  <el-row class="Df Jcc">
    <EffectForm
      ref="effectForm"
      class="el-col el-col-12 GeniusForm"
      label-position="left"
      label-width="auto"
      :effects="$attrs.effects"
    >
      <EffectFormField
        v-for="field in geniusFields"
        :key="field.name"
        v-bind="field"
      />

      <span slot="btnGroup"></span>
    </EffectForm>
  </el-row>
</template>

<script>
import { geniusFields } from './formConfig'

export default {
  name: 'GeniusForm',

  computed: {
    geniusFields() {
      return geniusFields(this)
    },
  },
}
</script>

<style lang="scss">
.GeniusForm {
  .el-input-number {
    width: 100%;
  }
}
</style>
