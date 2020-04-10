<template>
  <EffectForm
    ref="effectForm"
    size="medium"
    label-position="left"
    label-width="auto"
    :needToolBtnGroup="false"
  >
    <EffectFormField
      v-for="field in feedbackForm"
      v-bind="field"
      :key="field.name"
    />
  </EffectForm>
</template>

<script>
import { feedbackForm } from './formConfig'

export default {
  name: 'FeedbackForm',

  props: {
    meta: {
      type: Object,
      default: null,
    },
    secondTagsFilterOpts: {
      type: Array,
      default: () => [],
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
          const { setForm } = this.$refs.effectForm
          if (this.meta) {
            const needInitArray = ['first_result', 'second_result']
            needInitArray.forEach((fieldName) => {
              setForm(fieldName, this.meta[fieldName])
            })
          }
        })
      },
    },
  },

  computed: {
    feedbackForm() {
      return feedbackForm(this)
    },
  },
}
</script>
