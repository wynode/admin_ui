<template>
  <EffectForm
    ref="effectForm"
    size="medium"
    label-position="left"
    label-width="auto"
    :needToolBtnGroup="false"
  >
    <EffectFormField
      v-for="field in newCustomerFields"
      v-bind="field"
      :key="field.name"
    />
  </EffectForm>
</template>

<script>
import { newCustomerFields } from './formConfig'

export default {
  name: 'NewCustomerForm',

  props: {
    meta: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      categoryOpts: [],
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
              if (fieldName === 'email') {
                setForm('email', this.meta.yaemail)
              } else {
                setForm(fieldName, this.meta[fieldName])
              }
            })
          }
        })
      },
    },
  },

  computed: {
    newCustomerFields() {
      return newCustomerFields(this)
    },
  },
}
</script>
