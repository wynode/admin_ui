<template>
  <div class="qc_center" ref="qc_center">
    <div v-if="showFilter">
      <ul class="qc_top">
        <li>
          <p>{{ qcTotal.my_count }}</p>
          <span>今日我已质检</span>
        </li>
        <li>
          <p>{{ qcTotal.my_normal_count }}</p>
          <span>合规</span>
        </li>
        <li>
          <p>{{ qcTotal.my_illegal_count }}</p>
          <span>不合规</span>
        </li>
      </ul>
      <div class="qc_content">
        <EffectForm ref="effectForm" inline size="small" label-position="top">
          <EffectFormField
            v-for="field in filterFields"
            v-bind="field"
            :key="field.name"
          />
          <div slot="btnGroup">
            <el-button
              @click="handleGetQCCount('begin')"
              type="primary"
              size="small"
            >
              查询
            </el-button>
            <el-button
              class="Ml20"
              @click="handleFilterReset"
              type="primary"
              size="small"
            >
              重置
            </el-button>
            <el-button
              class="Ml20"
              @click="handleFilter('begin')"
              type="primary"
              size="small"
              :loading="filterLoading"
            >
              开始质检
            </el-button>
          </div>
        </EffectForm>
        <div class="Mt20">
          <p>共查询到 {{ qcTotal.total_count }} 条</p>
        </div>
      </div>
    </div>
    <div v-else class="qc_audit">
      <div class="qc_audit_top">
        <p>今日我已质检：{{ qcTotal.my_count }}</p>
        <p class="Ml40">质检合规：{{ qcTotal.my_normal_count }}</p>
        <p class="Ml40">质检不合规：{{ qcTotal.my_illegal_count }}</p>
      </div>
      <div class="qc_audit_title">
        质检内容
      </div>
      <div class="qc_audit_main">
        <qc-audit-item
          v-for="(item, index) in qcList"
          :key="index"
          :auditData="item"
          :ref="`qcAudit${item.id}`"
          :secondTagsObj="secondTagsObj"
        ></qc-audit-item>
      </div>
      <div class="qc_audit_btn">
        <el-button type="danger" @click="handleSubmitAndExit">
          提交并退出
        </el-button>
        <el-button type="success" @click="handleSubmitAndNext">
          提交并跳转下一页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchQC, fetchQCCount, postQC } from '@/apis/web_audit'
import { fetchUserList } from '@/apis/users'
import { fetchPurifyConfigSimpale } from '@/apis/purification'
import { filterFields, filterFieldsMutation } from './formConfig'
import { fetchOptsSecondTags, fetchOptions } from '@/apis/options'
import QcAuditItem from './QcAuditItem.vue'
import { fetchOptsDepartment } from '@/apis/options'
export default {
  name: 'QcCenter',
  components: {
    QcAuditItem,
  },
  computed: {
    filterFields() {
      return filterFields(this)
    },

    filtersMutate() {
      return filterFieldsMutation
    },
  },

  data() {
    return {
      qc_type: 'all',
      qcTotal: {
        total_count: '',
        my_count: '',
        my_normal_count: '',
        my_illegal_count: '',
      },
      qcList: [],
      purifyData: [],
      usersOpts: [],
      batchIdOptions: [],
      secondTagsFilterOpts: [],
      secondTagsObj: {},
      filterLoading: false,
      showFilter: true,
      qcResult: [],
      filterCache: {},
      secondTagIds: [],
      contentTypesOpts: [],
      departmentOpts: [],
    }
  },

  methods: {
    handleFilter(type) {
      let filter = this.filterCache
      if (type == 'begin') {
        filter = this.$refs.effectForm.getForm()
        this.filterCache = filter
      }
      this.filterLoading = true
      fetchQC({
        ...this.filtersMutate.parse(filter),
        qc_content_type: 'text',
      }).then(async (data) => {
        this.qcList = data
        if (data.length == 0) {
          if (type == 'begin') {
            this.handleGetQCCount()
            this.filterLoading = false
            this.$notify.info('共查询到 0 条数据')
          } else {
            this.$notify.info('没有更多数据了')
            this.handleRebackFilter()
          }
          return
        }
        for (let index = 0; index < data.length; index++) {
          const id = data[index].purifyconfig_id
          if (!this.secondTagIds.includes(id)) {
            this.secondTagIds.push(id)
            const res = await fetchOptsSecondTags({ id })
            this.secondTagsObj[id] = res[0].second_tags
          }
        }
        this.filterLoading = false
        this.showFilter = false
      })
    },

    handleFilterReset() {
      this.$refs.effectForm.resetFormFields()
      this.handleGetQCCount('begin')
    },

    handleGetQCCount(type) {
      let filter = this.filterCache
      if (type == 'begin') {
        filter = this.$refs.effectForm.getForm()
        this.filterCache = filter
      }
      fetchQCCount({
        ...this.filtersMutate.parse(filter),
        qc_content_type: 'text',
      }).then((data) => {
        this.qcTotal = data
      })
    },

    handleSubmit() {
      const valid = this.qcList.reduce((acc, cur) => {
        let res = false
        this.$refs[`qcAudit${cur.id}`][0].$refs.qcForm.validate((valid) => {
          res = valid ? true : false
        })
        return acc && res
      }, true)
      if (!valid) {
        this.$notify.error('请完整填写质检列表')
        return false
      }
      const payload = this.qcList.map((item) => {
        let qcForm = { ...this.$refs[`qcAudit${item.id}`][0].qcForm }
        if (qcForm.qc_result == 'normal') {
          qcForm = { qc_result: 'normal', qc_remark: qcForm.remark }
        } else if (qcForm.audit_result == 'normal') {
          qcForm = {
            qc_result: 'illegal',
            first_result: 'normal',
            qc_remark: qcForm.remark,
          }
        } else {
          qcForm = {
            qc_result: 'illegal',
            first_result: 'illegal',
            second_result: qcForm.audit_result,
            third_result: qcForm.third_result,
            qc_remark: qcForm.remark,
          }
        }
        return {
          id: item.id,
          ...qcForm,
        }
      })
      return payload
    },

    handleRebackFilter() {
      this.showFilter = true
      this.$nextTick(() => {
        Object.keys(this.filterCache).forEach((item) => {
          this.$refs.effectForm.setForm(item, this.filterCache[item])
        })
      })
    },

    handleSubmitAndExit() {
      const payload = this.handleSubmit()
      if (!payload) return
      postQC({ qc_items: payload })
        .then(() => {
          this.handleRebackFilter()
          this.handleGetQCCount()
        })
        .catch((error) => {
          const { id, first_result } = error.data
          if (id && first_result) {
            this.$refs[`qcAudit${id}`][0].first_result_error = first_result[0]
            this.$notify.error(String(first_result))
          }
        })
    },

    async handleSubmitAndNext() {
      const payload = this.handleSubmit()
      if (!payload) return
      postQC({ qc_items: payload })
        .then(() => {
          this.handleFilter()
          this.handleGetQCCount()
          const mainAnchor = document.getElementById('main_anchor')
          if (mainAnchor.scrollTo) {
            document.getElementById('main_anchor').scrollTo({
              left: 0,
              top: 0,
              behavior: 'smooth',
            })
          } else {
            mainAnchor.scrollTop = 0
          }
          this.$notify.success('提交质检成功')
        })
        .catch((error) => {
          const { id, first_result } = error.data
          if (id && first_result) {
            this.$refs[`qcAudit${id}`][0].first_result_error = first_result[0]
            this.$notify.error(String(first_result))
          }
        })
    },

    fetchPurifyConfigFn() {
      fetchPurifyConfigSimpale({ page_size: 99999 }).then((data) => {
        this.purifyData = data.results.map((item) => {
          return {
            label: item.name,
            value: item.id,
          }
        })
      })
    },

    fetchUserListFn() {
      fetchUserList({ page_size: 99999 }).then((data) => {
        this.usersOpts = data.results.map((user) => ({
          label: user.name,
          value: user.id,
        }))
      })
    },
  },

  mounted() {
    this.fetchPurifyConfigFn()
    this.fetchUserListFn()
    this.handleGetQCCount('begin')
    fetchOptions('content_type').then((data) => {
      const contentTypes = data || []
      this.contentTypesOpts = contentTypes.filter(
        (item) => item.value === 'text' || item.value === 'imagetext'
      )
    })
    fetchOptions('order_misc').then((data) => {
      data.forEach((item) => {
        if (item.model === 'batch_id') {
          this.batchIdOptions = item.options || []
        }
      })
    })
    fetchOptions('second_tags_filter').then((data) => {
      this.secondTagsFilterOpts = data[0].options
    })
    fetchOptsDepartment().then((data) => {
      this.departmentOpts = data || []
    })
  },
}
</script>

<style lang="scss">
.qc_center {
  .qc_top {
    background: #fff;
    height: 80px;
    display: flex;
    text-align: center;
    justify-content: space-around;
    align-items: center;
    li {
      width: 500px;
      border-right: 1px solid #ccc;
      &:last-child {
        border-right: 0;
      }
      p {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }

  .qc_content {
    background: #fff;
    padding: 20px;
    margin-top: 20px;
  }

  .qc_audit {
    background: #fff;
    margin-top: 20px;
    .qc_audit_top {
      display: flex;
      padding: 20px;
    }
    .qc_audit_title {
      font-size: 20px;
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      background: #845bea;
      color: #fff;
    }
    .qc_audit_main {
      padding: 0 20px 20px 20px;
    }
    .qc_audit_btn {
      width: 400px;
      margin: 0 auto;
      padding-top: 20px;
      padding-bottom: 40px;
      .el-button {
        margin-left: 20px;
      }
    }
  }
}
</style>
