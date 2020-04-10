<template>
  <div>
    <EditCustomer
      v-if="customer"
      class="customer_info"
      ref="editCustomer"
      :meta="customer"
    ></EditCustomer>
    <div v-if="customer" style="text-align: center;">
      <el-button
        size="small"
        type="primary"
        class="Mb20"
        @click="patchEditCustomer"
      >
        保存修改
      </el-button>
    </div>
  </div>
</template>

<script>
import EditCustomer from '../../EditCustomer'
import { errorFormat } from '@/utils/errorFormat'
import { patchCustomer } from '@/apis/client'

export default {
  name: 'CustomerInfo',

  props: {
    customer: {
      type: Object,
    },
  },

  components: {
    EditCustomer: EditCustomer,
  },

  methods: {
    // 保存修改
    async patchEditCustomer() {
      try {
        if (this.$refs.editCustomer.$refs.effectForm) {
          const { effectForm } = this.$refs.editCustomer.$refs
          if (await effectForm.useValidator()) {
            const form = effectForm.getForm()
            await patchCustomer(this.customer.id, { ...form })
            this.$notify.success('保存修改成功!')
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },
  },
}
</script>

<style lang="scss">
.customer_info {
  width: 600px;
}
</style>
