<template>
  <EffectForm
    ref="effectForm"
    label-position="center"
    label-width="100px"
    :needToolBtnGroup="false"
    :effects="handleFormEffects"
  >
    <EffectFormField
      v-for="field in editCustomerFields"
      :key="field.name"
      v-bind="field"
    />
  </EffectForm>
</template>

<script>
import { NOREMAL_UPLOAD_URL } from '@/config'
import { editCustomerFields } from './formConfig'
import { fetchCustomer } from '@/apis/client'

export default {
  name: 'EditCustomer',

  props: {
    meta: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      NOREMAL_UPLOAD_URL,
      parentCustomers: [],
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
    editCustomerFields() {
      return editCustomerFields(this)
    },
  },

  methods: {
    handleFormEffects(subscribe, { setFieldState }) {
      subscribe('onFieldInit', (fields) => {
        fields.parent.ifRender = fields.client_type.fieldValue === 'sub_client'
        if (fields.client_type.fieldValue !== 'sub_client') {
          fields.parent.fieldValue = null
        }
      })

      subscribe('onFieldChange', 'client_type', (value) => {
        setFieldState('parent', (proRef) => {
          proRef.ifRender = value === 'sub_client'
          if (value !== 'sub_client') {
            proRef.fieldValue = null
          }
        })
      })
    },

    // 获取上级客户列表
    fetchParentCustomer() {
      fetchCustomer({
        page_size: 10000,
      }).then((response) => {
        let parentCustomers = []
        response.results.forEach((customer) => {
          if (customer.client_type === 'client') {
            parentCustomers.push({
              label: customer.name,
              value: customer.id,
            })
          }
        })
        this.parentCustomers = parentCustomers
      })
    },
  },

  mounted() {
    this.fetchParentCustomer()
  },
}
</script>
