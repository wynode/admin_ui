<template>
  <EffectForm
    ref="effectForm"
    label-position="center"
    label-width="100px"
    :needToolBtnGroup="false"
    :effects="handleFormEffects"
  >
    <EffectFormField
      v-for="field in editFields"
      :key="field.name"
      v-bind="field"
    />
  </EffectForm>
</template>

<script>
import { editFields } from './formConfig'
import { fetchOptions } from '@/apis/options'

export default {
  name: 'EditCustomer',

  props: {
    meta: {
      type: Object,
      default: () => {},
    },
    edit: {
      type: Boolean,
      default: false,
    },
    purifyConfigs: {
      type: Array,
      default: () => [],
    },
    customer: {
      type: Number,
    },
    customers: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      kwCategoryOptions: [],
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
          if (this.customer) {
            setForm('customer', this.customer)
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

  methods: {
    handleFormEffects(subscribe, { setFieldState }) {
      subscribe('onFieldInit', (fields) => {
        fields.recheck_action.ifRender =
          fields.need_verify_count.fieldValue === 1
        fields.recheck_action.fieldValue = ''
      })

      subscribe('onFieldChange', 'need_verify_count', (value) => {
        setFieldState('recheck_action', (proRef) => {
          proRef.ifRender = value === 1
          proRef.fieldValue = ''
        })
      })
    },

    // 获取关键词分类
    fetchKwCategoryOptions() {
      fetchOptions('kw_category').then((response) => {
        this.kwCategoryOptions = response[0].options
      })
    },
  },

  mounted() {
    this.fetchKwCategoryOptions()
  },
}
</script>
