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
  computed: {
    ChangeFields() {
      return ChangeFields(this)
    },
  },
}
</script>

<style lang="scss"></style>
