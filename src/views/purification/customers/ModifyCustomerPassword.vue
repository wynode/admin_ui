<template>
  <EffectForm
    ref="effectForm"
    size="medium"
    label-position="left"
    label-width="auto"
    :needToolBtnGroup="false"
  >
    <EffectFormField
      v-for="field in modifyCustomerPasswordFields"
      v-bind="field"
      :key="field.name"
    />
  </EffectForm>
</template>

<script>
import { modifyCustomerPasswordFields } from './formConfig'

export default {
  name: 'NewCustomerForm',

  computed: {
    modifyCustomerPasswordFields() {
      return modifyCustomerPasswordFields(this)
    },
  },
}
</script>
