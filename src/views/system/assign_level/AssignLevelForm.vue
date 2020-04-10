<template>
  <el-row class="Df Jcc">
    <EffectForm
      ref="effectForm"
      class="el-col el-col-12 GeniusForm"
      :validator="true"
      label-position="left"
      label-width="auto"
      :effects="$attrs.effects"
    >
      <EffectFormField
        v-for="field in assignLevelFields"
        :key="field.name"
        v-bind="field"
      />

      <span slot="btnGroup"></span>
    </EffectForm>
  </el-row>
</template>

<script>
import { assignLevelFields } from './formConfig'
import { fetchPurifyConfigSimpale } from '@/apis/purification'

export default {
  name: 'BannerForm',

  data() {
    return {
      purifyData: [],
    }
  },

  computed: {
    assignLevelFields() {
      return assignLevelFields(this)
    },
  },

  mounted() {
    fetchPurifyConfigSimpale({ page_size: 99999 }).then((data) => {
      this.purifyData = data.results.map((item) => {
        return {
          label: item.name,
          value: item.id,
        }
      })
    })
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
