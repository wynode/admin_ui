<template>
  <div>
    <el-card>
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="净网内容、内容 ID"
          @keyup.enter.native="handleSearch(true)"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch(true)"
          ></el-button>
        </el-input>
      </div>

      <RegularFilter
        ref="auditorderadminview"
        v-bind="regularConfig"
        :form-ref="$refs.effectForm"
        :search="filters.search"
        @change="handleRegulareFilter"
      />

      <EffectForm
        ref="effectForm"
        inline
        size="small"
        label-position="top"
        cancelText="重置"
        @submit="handleFilter"
        @cancel="handleFilterReset"
      >
        <EffectFormField
          v-for="field in filterFields"
          v-bind="field"
          :key="field.name"
        />
      </EffectForm>
    </el-card>

    <el-card class="Mt24">
      <div class="Mb16">
        <el-button size="small" type="primary" @click="handleExport">
          导出
        </el-button>
        <el-button
          v-auth="'export_zsxq'"
          size="small"
          type="primary"
          @click="handleImportFunc"
        >
          小知标注导入(*.xlsx)
        </el-button>
        <el-button
          v-auth="'export_zsxq'"
          size="small"
          type="primary"
          @click="handleImportFuncV2"
        >
          小知关键词标注导入(*.xlsx)
        </el-button>
        <el-button
          v-auth="'change_urgency'"
          size="small"
          type="primary"
          @click="handleChangeUrgency"
        >
          调整订单优先级
        </el-button>
        <el-button
          v-auth="'del_orders'"
          size="small"
          type="danger"
          @click="handleDelOrder"
        >
          删除订单
        </el-button>
      </div>
      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="playDetailCols"
        :pager="{
          page: pager.page,
          page_size: pager.page_size,
          layout: 'total,prev,pager,next,jumper',
          total: tableTotal,
        }"
        @change="handleTableChange"
      />
    </el-card>
    <el-dialog title="质检" :visible.sync="editDialogVis" width="50%">
      <el-form :model="editForm" ref="editForm" label-width="100px">
        <el-form-item
          label="质检状态"
          prop="qc_result"
          :rules="{
            required: true,
            message: '请选择一个质检状态',
            trigger: 'change',
          }"
        >
          <el-radio-group v-model="editForm.qc_result">
            <el-radio label="normal">合规</el-radio>
            <el-radio label="illegal">不合规</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="质检结果"
          prop="first_result"
          v-if="editForm.qc_result == 'illegal'"
          :rules="{
            required: true,
            message: '请选择一个质检结果',
            trigger: 'change',
          }"
        >
          <el-radio-group v-model="editForm.first_result">
            <el-radio label="normal">正常</el-radio>
            <el-radio label="illegal">违规</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="二级标签"
          prop="second_result"
          v-if="
            editForm.first_result == 'illegal' && editForm.qc_result != 'normal'
          "
          :rules="{
            required: requireSecond,
            message: '请选择一个二级标签',
            trigger: 'change',
          }"
        >
          <!-- <el-select v-model="editForm.second_result" clearable>
            <el-option
              v-for="item in secondTagsOpts"
              :key="item.code"
              :label="item.label"
              :value="item.code"
            ></el-option>
          </el-select> -->
          <el-cascader
            v-model="editForm.second_result"
            :options="secondTagsOpts"
            :props="{ value: 'code', children: 'third_tags' }"
            filterable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="resetEditDialog">取 消</el-button>
        <el-button type="primary" @click="submitEditDialog">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="导入"
      :visible.sync="editDialogVisImport"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form :model="editFormImport" ref="editFormImport" label-width="100px">
        <el-form-item
          label="batchid"
          prop="batch_id"
          :rules="{
            required: true,
            message: '请填写batchid',
            trigger: 'change',
          }"
        >
          <el-input v-model="editFormImport.batch_id"></el-input>
        </el-form-item>

        <el-form-item
          label="内容类型"
          prop="type"
          :rules="{
            required: true,
            message: '请选择一个内容类型',
            trigger: 'change',
          }"
        >
          <el-radio-group v-model="editFormImport.type">
            <el-radio label="1" v-if="!import_v2">图片</el-radio>
            <el-radio label="2" v-if="!import_v2">视频</el-radio>
            <el-radio label="3">文本</el-radio>
            <el-radio label="4">音频</el-radio>
            <el-radio label="5" v-if="!import_v2">其他</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editDialogVisImport = false">取 消</el-button>
        <el-button type="primary" @click="handleImport">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="调整优先级"
      :visible.sync="editDialogVisChangeUrgency"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editFormUrgency"
        ref="editFormUrgency"
        label-width="100px"
      >
        <el-form-item
          label="优先级"
          prop="urgency"
          :rules="{
            required: true,
            message: '请选择一个优先级',
            trigger: 'change',
          }"
        >
          <el-radio-group v-model="editFormUrgency.urgency">
            <el-radio label="2">中</el-radio>
            <el-radio label="3">高</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editDialogVisChangeUrgency = false">取 消</el-button>
        <el-button type="primary" @click="handleUrgency">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tableMixins from '@/mixins/table'
import { fetchUserList } from '@/apis/users'
import debounce from 'lodash/debounce'
import {
  fetchPureContentDetail,
  patchPurifyStatusAndSec,
  fetchPurifyConfigSimpale,
  fetchPureContentDetailExport,
  fetchZSXQPureContentDetailExport,
  importXiaozhiData,
  importXiaozhiDataV2,
  PutchangeUrgency,
  PutDelOrders,
} from '@/apis/purification'
import { fetchContentDetailCommonStat } from '@/apis/regularfilter'
import {
  fetchOptions,
  fetchOptsSecondTags,
  fetchOptsPosition,
  fetchOptsDepartment,
} from '@/apis/options'
import RegularFilter from '@/components/regular_filter'
import { allErrors } from '@/utils/errorFormat'
import { playDetailCols } from './tableConfig'
import { filterFields, filterFieldsMutation } from './formConfig'
import { Loading } from 'element-ui'

const pagerInit = { page: 1, page_size: 10 }
const table = tableMixins({
  pagerInit,
  filtersInit: { search: '' },
  filtersMutateInit: filterFieldsMutation,
})
const DELAY_TIME = 500

const editFormInit = {
  qc_result: 'normal',
  first_result: '',
  second_result: '',
}

export default {
  name: 'PureContentDetail',

  mixins: [table],

  components: {
    RegularFilter,
  },

  data() {
    return {
      purifyTypeOpts: [],
      departmentOpts: [],
      usersOpts: [],
      positionOpts: [],
      thirdTagsOpts: [],
      secondTagsFilterOpts: [],
      contentTypeChoices: [],
      customerConfCode: [],
      batchIdOptions: [],

      editDialogVisImport: false,
      editDialogVisChangeUrgency: false,
      editDialogVis: false,
      editFormImport: { type: '', batch_id: '' },
      editFormUrgency: { urgency: '' },
      editForm: { ...editFormInit },
      secondTagsOpts: [],
      requireSecondFlag: false,
      purifyId: '',
      error_first_result: '',
      error_second_result: '',
      import_v2: false,
    }
  },
  methods: {
    // 导入
    handleImportFunc() {
      this.editDialogVisImport = true
      this.import_v2 = false
    },
    handleImportFuncV2() {
      this.editDialogVisImport = true
      this.import_v2 = true
    },
    handleChangeUrgency() {
      this.editDialogVisChangeUrgency = true
    },
    // handleUrgency
    handleUrgency: debounce(async function handleImport() {
      const valid = await this.$refs.editFormUrgency.validate()
      if (!valid) {
        return
      }

      try {
        const data = filterFieldsMutation.parse(this.filtersCache)
        data.urgency = this.editFormUrgency.urgency
        await PutchangeUrgency(data)
        this.$notify.success('修改优先级成功，请等待配置生效')
        this.pager.page = 1
        this.fetchTableList(this.filtersCache)
        this.editDialogVisChangeUrgency = false
      } catch (error) {
        allErrors(error.data || error)
      }
    }, DELAY_TIME),
    handleDelOrder: debounce(async function handleImport() {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          try {
            const loadingInstance = Loading.service({ fullscreen: true })

            const res = await PutDelOrders(
              filterFieldsMutation.parse(this.filtersCache)
            )
            this.$notify.success(`正在删除 ${res.count} 条，请稍候!`)
            this.pager.page = 1
            this.fetchTableList(this.filtersCache)
            this.$nextTick(() => {
              // 以服务的方式调用的 Loading 需要异步关闭
              loadingInstance.close()
            })
          } catch (error) {
            allErrors(error.data || error)
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }, DELAY_TIME),

    handleImport: debounce(async function handleImport() {
      const valid = await this.$refs.editFormImport.validate()
      if (!valid) {
        return
      }

      const el = document.createElement('input')
      el.type = 'file'
      el.onchange = async (event) => {
        const file = event.target.files[0]
        if (file) {
          if (!file.name.endsWith('xlsx')) {
            this.$notify.error('文件类型不匹配')
            return
          }
          const formData = new FormData()
          formData.append('xls_file', file)
          formData.append('type', this.editFormImport.type)
          formData.append('batch_id', this.editFormImport.batch_id)

          const res = this.$message({
            showClose: true,
            message: '导入操作耗时较长, 请耐心等待!',
            type: 'success',
          })
          const loadingInstance = Loading.service({ fullscreen: true })
          try {
            if (!this.import_v2) {
              await importXiaozhiData(formData, {
                headers: {
                  'Content-Type': 'h/form-data',
                },
              })
            } else {
              await importXiaozhiDataV2(formData, {
                headers: {
                  'Content-Type': 'h/form-data',
                },
              })
            }
            this.$notify.success('导入完成')
          } catch (e) {
            this.$notify.error('导入失败')
          }
          this.pager.page = 1
          this.fetchTableList()
          this.editDialogVisImport = false
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close()
          })

          // this.fetch_options()
          res.close()
        }
      }
      el.click()
    }, DELAY_TIME),

    handleExport: debounce(async function handleExport() {
      try {
        await fetchPureContentDetailExport(
          filterFieldsMutation.parse(this.filtersCache)
        )
        this.$notify.success('导出成功，请稍后在邮件中查看')
      } catch (error) {
        allErrors(error.data || error)
      }
    }, DELAY_TIME),

    handleZSXQExport: debounce(async function handleExport() {
      try {
        await fetchZSXQPureContentDetailExport(
          filterFieldsMutation.parse(this.filtersCache)
        )
        this.$notify.success('导出成功，请稍后在邮件中查看')
      } catch (error) {
        allErrors(error.data || error)
      }
    }, DELAY_TIME),

    modifyPureDetail(row) {
      this.purifyId = row.id
      fetchOptsSecondTags({ id: row.purifyconfig_id }).then((data) => {
        this.secondTagsOpts = data[0].second_tags
        if (data[0].second_tags.length) {
          this.requireSecondFlag = true
        }
      })
      this.editDialogVis = true
    },

    submitEditDialog() {
      let payload = { ...this.editForm }
      if (this.editForm.qc_result == 'normal') {
        payload = {
          qc_result: 'normal',
        }
      } else if (this.editForm.first_result == 'normal') {
        payload = {
          qc_result: 'illegal',
          first_result: 'normal',
        }
      }
      if (payload.second_result) {
        if (payload.second_result.length === 2) {
          payload.third_result = payload.second_result[1]
          payload.second_result = payload.second_result[0]
        } else if (payload.second_result.length === 1) {
          payload.second_result = payload.second_result[0]
        }
      }
      patchPurifyStatusAndSec(this.purifyId, payload)
        .then(() => {
          this.$notify.success('编辑成功')
          this.resetEditDialog()
          this.editForm = { ...editFormInit }
          this.pager = { ...pagerInit }
          this.fetchTableList(this.filtersCache)
        })
        .catch((error) => {
          allErrors(error.data || error)
          this.error_first_result = error.data.first_result
          this.error_second_result = error.data.second_result
        })
    },

    resetEditDialog() {
      this.$refs.editForm.resetFields()
      this.editDialogVis = false
      this.requireSecondFlag = false
    },
  },

  computed: {
    qc_result_illegal() {
      return this.editForm.qc_result === 'illegal'
    },
    requireSecond() {
      return this.requireSecondFlag && this.editForm.first_result === 'illegal'
    },

    fetchTableListMethod() {
      return fetchPureContentDetail
    },

    playDetailCols() {
      return playDetailCols(this)
    },

    filterFields() {
      return filterFields(this)
    },

    regularConfig() {
      return {
        appName: 'auditorderadminview',
        mutate: filterFieldsMutation,
        appStstc: fetchContentDetailCommonStat,
      }
    },
  },

  mounted() {
    if (this.$route.query.id__in) {
      this.filters.id__in = this.$route.query.id__in
    }

    this.fetchTableList()
    // 筛选下岗位名称
    fetchOptsPosition().then((data) => {
      this.positionOpts = data || []
    })
    // 筛选下所在部门
    fetchOptsDepartment().then((data) => {
      this.departmentOpts = data || []
    })
    fetchPurifyConfigSimpale({ page_size: 99999 }).then((data) => {
      const options = data.results || []
      this.purifyTypeOpts = options.map((opt) => ({
        label: opt.name,
        value: opt.id,
      }))
    })
    fetchUserList({ page_size: 999999 }).then((data) => {
      const users = data.results || []
      this.usersOpts = users.map((user) => ({
        label: user.name,
        value: user.id,
      }))
    })
    fetchOptions('third_tags_filter').then((data) => {
      this.thirdTagsOpts = data[0].options
    })
    fetchOptions('second_tags_filter').then((data) => {
      this.secondTagsFilterOpts = data[0].options
    })
    fetchOptions('content_type').then((data) => {
      this.contentTypeChoices = data || []
    })
    fetchOptions('customer_conf_code_filter').then((data) => {
      this.customerConfCode = data[0].options || []
    })
    fetchOptions('order_misc').then((data) => {
      data.forEach((item) => {
        if (item.model === 'batch_id') {
          this.batchIdOptions = item.options || []
        }
      })
    })
  },
}
</script>

<style lang="css">
.batch_id {
  border-color: #e6defb;
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 12px;
  color: #845bea;
}
</style>
