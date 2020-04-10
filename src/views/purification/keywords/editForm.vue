<template>
  <EffectForm
    ref="effectForm"
    size="medium"
    label-position="left"
    label-width="auto"
    :needToolBtnGroup="false"
  >
    <EffectFormField
      v-for="field in EditFields"
      v-bind="field"
      :key="field.name"
    />
  </EffectForm>
</template>

<script>
import { fetchOptions } from '@/apis/options'
import { EditFields } from './formConfig'

export default {
  name: 'PureConfigForm',

  props: {
    meta: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      kw_categoryOpt: [],
    }
  },

  watch: {
    meta: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          const { fields, setForm } = this.$refs.effectForm
          if (this.meta) {
            Object.keys(fields).forEach((fieldName) => {
              setForm(fieldName, this.meta[fieldName])
            })
          }
        })
      },
    },
  },

  computed: {
    EditFields() {
      return EditFields(this)
    },
  },

  mounted() {
    fetchOptions('kw_category').then((data) => {
      this.kw_categoryOpt = data[0] || []
    })
  },
}
</script>
