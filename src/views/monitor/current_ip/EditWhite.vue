<template>
  <div>
    <EffectForm
      ref="effectForm"
      size="medium"
      label-position="left"
      label-width="auto"
      :needToolBtnGroup="false"
    >
      <EffectFormField
        v-for="field in whiteFields"
        v-bind="field"
        :key="field.name"
      />
    </EffectForm>
  </div>
</template>

<script>
import { whiteFields } from './formConfig'

export default {
  props: {
    meta: {
      type: Object,
      default: null,
    },
  },
  computed: {
    whiteFields() {
      return whiteFields(this)
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
}
</script>

<style lang="scss"></style>
