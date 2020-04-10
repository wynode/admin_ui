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
import { fetchOptions } from '@/apis/options'
import { fetchOptsHelpCenter } from '@/apis/options'

export default {
  name: 'BannerForm',

  data() {
    return {
      inner_jumpOpt: [],
      helpCenterOpts: [],
    }
  },

  computed: {
    bannerFields() {
      return bannerFields(this)
    },
  },

  mounted() {
    fetchOptions('inner_jump').then((data) => {
      this.inner_jumpOpt = data || []
    })
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

<style lang="scss">
.GeniusForm {
  .el-input-number {
    width: 100%;
  }
}
</style>
