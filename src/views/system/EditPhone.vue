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
        v-for="field in PhoneFields"
        v-bind="field"
        :key="field.name"
      />
    </EffectForm>
  </div>
</template>

<script>
import { PhoneFields } from './formConfig'

export default {
  computed: {
    PhoneFields() {
      return PhoneFields(this)
    },
  },
}
</script>

<style lang="scss"></style>
