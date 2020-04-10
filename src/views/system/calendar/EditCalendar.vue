<template>
  <EffectForm
    ref="effectForm"
    label-position="center"
    label-width="100px"
    :needToolBtnGroup="false"
  >
    <EffectFormField
      v-for="field in editFields"
      :key="field.name"
      v-bind="field"
    />
  </EffectForm>
</template>

<script>
import { fetchOptsHelpCenter } from '@/apis/options'
import { editFields } from './formConfig'

export default {
  name: 'EditCalendar',

  props: {
    meta: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      helpCenterOpts: [],
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
              let fieldValue = this.meta[fieldName]
              if (fieldName === 'email' && this.meta['yaemail']) {
                fieldValue = this.meta['yaemail']
              } else if (
                fieldName === 'sub_user_email_list' &&
                this.meta['sub_user_list']
              ) {
                fieldValue = this.meta['sub_user_list'].map(
                  (item) => item.email
                )
              }
              setForm(fieldName, fieldValue)
            })
          }
        })
      },
    },
  },

  computed: {
    editFields() {
      return editFields(this)
    },
  },

  mounted() {
    fetchOptsHelpCenter().then((res) => {
      this.helpCenterOpts = res.results.map((item) => {
        return {
          label: item.title,
          value: item.id,
        }
      })
    })
  },
}
</script>
