<template>
  <el-row class="Df Jcc">
    <EffectForm
      ref="effectForm"
      :validator="true"
      class="el-col el-col-16 GeniusForm"
      label-position="left"
      label-width="auto"
      :effects="$attrs.effects"
    >
      <EffectFormField
        v-for="field in editFields"
        :key="field.name"
        v-bind="field"
      />

      <span slot="btnGroup"></span>
    </EffectForm>
  </el-row>
</template>

<script>
import { editFields } from './formConfig'
import { fetchHelpCenterTree } from '@/apis/system'
export default {
  name: 'HelpCenterForm',

  data() {
    return {
      wikiParents: [],
    }
  },
  computed: {
    editFields() {
      return editFields(this)
    },
  },
  mounted() {
    fetchHelpCenterTree().then((data) => {
      this.wikiParents = data || []
    })
  },
}
</script>

<style lang="scss">
.GeniusForm {
  .el-input-number,
  .el-date-editor {
    width: 100%;
  }
}
</style>
