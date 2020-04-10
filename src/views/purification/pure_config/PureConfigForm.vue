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
      v-for="field in pureConfigFields"
      v-bind="field"
      :key="field.name"
    />
  </EffectForm>
</template>

<script>
import { fetchOptions } from '@/apis/options'
import { pureConfigFields } from './formConfig'
import { fetchPurifyIcons } from '@/apis/purification'

export default {
  name: 'PureConfigForm',

  props: {
    meta: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      categoryOpts: [],
      purifyIcons: [],
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
              const isSeconds = [
                'web_expire_seconds',
                'app_expire_seconds',
                'order_expire_seconds',
              ].includes(fieldName)
              setForm(
                fieldName,
                isSeconds ? this.meta[fieldName] / 60 : this.meta[fieldName]
              )
            })
          }
        })
      },
    },
  },

  computed: {
    pureConfigFields() {
      return pureConfigFields(this)
    },
  },

  methods: {
    handleFormEffects(subscribe, { setFieldState }) {
      subscribe('onFieldChange', 'platform', (value) => {
        setFieldState('app_expire_seconds', (proRef) => {
          proRef.ifRender = value !== 'only_web'
        })
      })
    },
    // 获取净网配置图标
    fetchPurifyIcons() {
      fetchPurifyIcons().then((data) => {
        this.purifyIcons = data.results || []
      })
    },
  },

  mounted() {
    fetchOptions('purify_category').then((data) => {
      this.categoryOpts = data || []
    })
    this.fetchPurifyIcons()
  },
}
</script>
