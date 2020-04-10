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
      v-for="field in purifyConfigFields"
      v-bind="field"
      :key="field.name"
    />
  </EffectForm>
</template>

<script>
import { purifyConfigFields } from './formConfig'
import { fetchOptions } from '@/apis/options'

export default {
  name: 'purifyConfigForm',
  data() {
    return {
      kw_categoryOpt: [],
    }
  },

  props: {
    meta: {
      type: Object,
      default: null,
    },
    purifyConfigOptions: {
      type: Array,
      default: () => [],
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

  methods: {
    handleFormEffects(subscribe, { setFieldState }) {
      subscribe('onFieldChange', 'need_verify_count', (value) => {
        setFieldState('recheck_action', (proRef) => {
          proRef.ifRender = value === 1
          if (value !== 1) {
            proRef.fieldValue = ''
          }
        })
      })
    },
  },
  computed: {
    purifyConfigFields() {
      return purifyConfigFields(this)
    },
  },
  mounted() {
    fetchOptions('kw_category').then((data) => {
      this.kw_categoryOpt = data[0] || []
    })
  },
}
</script>
