<template>
  <EffectForm
    ref="effectForm"
    label-position="center"
    label-width="80px"
    :needToolBtnGroup="false"
  >
    <EffectFormField
      v-for="field in editCategoryFields"
      :key="field.name"
      v-bind="field"
    />
  </EffectForm>
</template>

<script>
import { editCategoryFields } from './formConfig'

export default {
  name: 'EditCategory',

  props: {
    meta: {
      type: Object,
      default: () => {},
    },
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
    editCategoryFields() {
      return editCategoryFields(this)
    },
  },
}
</script>
