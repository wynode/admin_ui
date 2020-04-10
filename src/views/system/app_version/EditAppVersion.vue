<template>
  <el-dialog v-bind="attrs.others" :visible.sync="visible" @close="clear">
    <EffectForm
      ref="effectForm"
      label-position="center"
      label-width="80px"
      @submit="handleSubmit"
      @cancel="handleCancel"
    >
      <EffectFormField
        v-for="field in editAppFields"
        :key="field.name"
        v-bind="field"
      />
    </EffectForm>
  </el-dialog>
</template>

<script>
import { NOREMAL_UPLOAD_URL } from '@/config'
import { editAppFields } from './formConfig'

export default {
  name: 'EditAppVersion.vue',

  data() {
    return {
      NOREMAL_UPLOAD_URL,
      visible: false,
    }
  },

  computed: {
    editAppFields() {
      return editAppFields(this)
    },

    attrs() {
      const { visible, ...others } = this.$attrs
      return { visible, others }
    },
  },

  methods: {
    setForm(form) {
      this.$nextTick(() => {
        const { effectForm } = this.$refs
        if (effectForm) {
          Object.keys(effectForm.fields).forEach((fieldName) => {
            if (form[fieldName] != null) {
              this.$refs.effectForm.setForm(fieldName, form[fieldName])
            }
          })
        }
      })
    },

    handleSubmit(form) {
      this.$listeners.onSubmit(form, this)
    },

    handleCancel() {
      this.$listeners.onCancel(this)
    },

    clear() {
      this.$refs.effectForm.resetFormFields()
    },
  },
}
</script>
