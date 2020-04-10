<template>
  <EffectForm
    ref="effectForm"
    size="medium"
    label-position="left"
    label-width="auto"
    :needToolBtnGroup="false"
    :effects="handleFormEffects"
  >
    <EffectFormField
      v-for="field in contentConfigFields"
      v-bind="field"
      :key="field.name"
    />
  </EffectForm>
</template>

<script>
import { fetchPurifyConfigSimpale } from '@/apis/purification'
import { contentConfigFields } from './formConfig'

export default {
  name: 'PlaygroundContentForm',

  props: {
    meta: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      purifyData: [],
      second: [],
      fileList: [],
      secondRulesVaild: false,
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
              setForm(fieldName, this.meta[fieldName])
            })
          }
        })
      },
    },
  },

  computed: {
    contentConfigFields() {
      return contentConfigFields(this)
    },

    categoryOpts() {
      return this.purifyData.map((item) => {
        return {
          label: item.name,
          value: item.id,
        }
      })
    },

    secondRules() {
      return this.secondRulesVaild
        ? [{ required: true, message: '净网类型名称必填', trigger: 'change' }]
        : []
    },
  },

  methods: {
    isSecondRulesVaild(form_result) {
      if (
        form_result.correct_first_result === 'illegal' &&
        this.second.length
      ) {
        this.secondRulesVaild = true
      } else {
        this.secondRulesVaild = false
      }
    },
    handleGetSecond(form) {
      this.purifyData.forEach((item) => {
        if (item.id === form.purifyconfig) {
          this.second = item.second_tags.map((tag) => {
            return {
              label: tag.label,
              value: tag.code,
            }
          })
        }
      })
    },

    handleFormEffects(subscribe) {
      subscribe('onFieldChange', 'purifyconfig', (value, form) => {
        this.handleGetSecond(form)
        if (this.meta.purifyconfig !== form.purifyconfig) {
          this.$refs.effectForm.setForm('correct_second_result', '')
          this.isSecondRulesVaild(form)
        }
      })
      subscribe('onFieldChange', 'correct_first_result', (value, form) => {
        this.isSecondRulesVaild(form)
      })
    },
  },

  mounted() {
    fetchPurifyConfigSimpale({ page_size: 99999 }).then((data) => {
      this.purifyData = data.results || []
      this.handleGetSecond(this.$refs.effectForm.form)
    })
  },
}
</script>
