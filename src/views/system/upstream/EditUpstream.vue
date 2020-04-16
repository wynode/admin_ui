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
        v-for="field in ChangeFields"
        v-bind="field"
        :key="field.name"
      />
    </EffectForm>
  </div>
</template>

<script>
import { ChangeFields } from './formConfig'

export default {
  props: {
    meta: {
      type: Object,
      default: null,
    },
  },

  computed: {
    ChangeFields() {
      return ChangeFields(this)
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
              const isPass = fieldName === 'adminPassword'
              setForm(fieldName, isPass ? '' : this.meta[fieldName])
            })
          }
        })
      },
    },
  },

  // methods: {
  //   handleFormEffects(subscribe) {
  //     subscribe('onFieldInit', (fields) => {
  //       if (this.meta) {
  //         fields.adminAccount.ifRender = false
  //       }
  //     })
  //   },
  // },
}
</script>

<style lang="scss"></style>
