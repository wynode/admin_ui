<template>
  <div>
    <el-card>
      <div class="info_top">
        <div class="info_top_line1">
          <p class="info_item">
            客户名称：
            <span>{{ customer.name }}</span>
          </p>
          <p class="info_item">
            客户编码：
            <span>{{ customer.code }}</span>
          </p>
          <p class="info_item">
            审核量：
            <span>{{ customer.finished_count }}</span>
          </p>
          <p v-if="customer.parent" class="info_item">
            上级客户：
            <span>{{ customer.parent }}</span>
          </p>
        </div>
        <div v-if="customer.remark" class="info_top_line2">
          <p class="info_item">
            备注：
            <span>{{ customer.remark }}</span>
          </p>
        </div>
        <div class="info_top_line2">
          <p class="info_item">
            创建时间：
            <span>{{ customer.create_time }}</span>
          </p>
          <p class="info_item">
            上次登录时间：
            <span>{{ customer.last_login }}</span>
          </p>
        </div>
      </div>
    </el-card>

    <el-card class="box-card Mt24">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="基本信息" name="info">
          <CustomerInfo :customer="customer"></CustomerInfo>
        </el-tab-pane>
        <el-tab-pane label="业务信息" name="business">
          <CustomerBusiness :customer="customerId"></CustomerBusiness>
        </el-tab-pane>
        <el-tab-pane label="净网配置" name="purification">
          <CustomerPurification :customer="customerId"></CustomerPurification>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
Ω

<script>
import { fetchCustomerById } from '@/apis/client'
import CustomerInfo from './tabs/info/CustomerInfo'
import CustomerBusiness from './tabs/business/CustomerBusiness'
import CustomerPurification from './tabs/purification/CustomerPurification'

export default {
  name: 'CustomerDetails',

  components: {
    CustomerInfo: CustomerInfo,
    CustomerBusiness: CustomerBusiness,
    CustomerPurification: CustomerPurification,
  },

  data() {
    return {
      activeTab: 'info',
      customer: {},
    }
  },

  computed: {
    customerId() {
      return parseInt(this.$route.params.id)
    },
  },

  methods: {
    // 获取客户信息
    fetchCustomer() {
      fetchCustomerById(this.customerId).then((data) => {
        this.customer = data
      })
    },
  },

  mounted() {
    this.fetchCustomer()
  },
}
</script>

<style lang="scss">
.info_top {
  width: 100%;
  .info_cover {
    max-height: 90px;
    max-width: 160px;
  }
  .info_item {
    display: flex;
    flex: 1;
    align-items: flex-start;
  }
  .edit_button {
    display: flex;
    align-items: flex-start;
    width: 60px;
  }
  .info_top_line1 {
    width: 100%;
    display: flex;
  }
  .info_top_line2 {
    margin-top: 20px;
    display: flex;
  }
}
</style>
