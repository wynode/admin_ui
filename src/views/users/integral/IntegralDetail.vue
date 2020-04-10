<template>
  <div class="gb_wrap">
    <el-card class="Mb24">
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="请输入关键字"
          @keyup.enter.native="handleSearch"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch"
          ></el-button>
        </el-input>
      </div>

      <regular-filter
        ref="scorelogviews"
        :form-ref="$refs.effectForm"
        v-bind="regularConfig"
        :search="filters.search"
        @change="handleRegulareFilter"
      ></regular-filter>

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

    <el-card>
      <el-button
        size="small"
        type="primary"
        @click="
          handleExportCSV('/score_log/score_log/csv_view/', '积分明细导出')
        "
      >
        导出
      </el-button>
      <el-button
        size="small"
        type="primary"
        class="Mb20 Mr20"
        @click="handleCreateMessage"
      >
        增加积分
      </el-button>

      <Txcel
        ref="table"
        v-loading="mixTableLoading"
        :data="tableList"
        :columns="tableCols"
        :pager="{
          page: pager.page,
          page_size: pager.page_size,
          layout: 'total,prev,pager,next,jumper',
          total: tableTotal,
        }"
        class="Txcel"
        @change="handleTableChange"
      />
    </el-card>

    <el-dialog title="增加积分" :visible.sync="createIntegral" width="60%">
      <el-form :model="form" ref="createForm" label-width="100px">
        <el-form-item
          label="姓名"
          prop="users"
          :error="formError.users"
          :rules="{
            required: true,
            type: 'array',
            message: '请选择增加积分对象',
            trigger: 'change',
          }"
        >
          <el-select v-model="form.users" multiple filterable>
            <el-option
              v-for="type in usersOpts"
              :key="type.value"
              :label="type.label"
              :value="type.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="积分数量"
          prop="score_change"
          :error="formError.score_change"
          :rules="{
            required: true,
            message: '请选择积分数量',
            trigger: 'change',
          }"
        >
          <el-input-number
            v-model="form.score_change"
            :precision="2"
          ></el-input-number>
        </el-form-item>

        <el-form-item
          prop="score_reason"
          label="变更说明"
          :error="formError.score_reason"
          :rules="{
            required: true,
            message: '请输入变更说明',
            trigger: 'change',
          }"
        >
          <el-input type="textarea" v-model="form.score_reason"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogCancel">取 消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改积分变更状态" :visible.sync="editDialog" width="40%">
      <el-form
        ref="editForm"
        :rules="editRules"
        :model="editForm"
        label-width="120px"
      >
        <el-form-item label="积分变更状态" prop="score_status">
          <el-radio-group v-model="editForm.score_status">
            <el-radio
              v-for="item in scoreStatusType"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="变更操作说明" prop="remark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="editForm.remark"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleEditReset">取 消</el-button>
        <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import table from '@/mixins/table'
import { errorFormat } from '@/utils/errorFormat'
import {
  fetchScore,
  postScore,
  fetchUserListSimple,
  patchScoreStatus,
} from '@/apis/users'
import { tableCols } from './tableConfig'
import { filterFields, filtersMutateInit } from './formConfig'
import RegularFilter from '@/components/regular_filter'
import { fetchIntegralCommonStat } from '@/apis/regularfilter'
import { getMapOptions } from '@/utils/mappings'
import { fetchOptsPosition, fetchOptsDepartment } from '@/apis/options'

const pagerInit = {
  page: 1,
  page_size: 10,
}

const formInit = {
  users: [],
  score_reason: '',
  score_change: '',
}

const editFormInit = {
  score_status: '',
  remark: '',
}

const tableMixins = table({
  pagerInit: pagerInit,
  filtersInit: { search: '' },
  filtersMutateInit,
})

export default {
  name: 'QuestionList',

  mixins: [tableMixins],

  components: {
    RegularFilter,
  },

  data() {
    return {
      departmentOpts: [],
      positionOpts: [],
      MessageList: [],
      usersOpts: [],
      createIntegral: false,
      formError: {},
      form: { ...formInit },
      regularConfig: {
        appName: 'scorelogviews',
        mutate: filtersMutateInit,
        appStstc: fetchIntegralCommonStat,
      },
      editDialog: false,
      rowId: '',
      editForm: {
        ...editFormInit,
      },
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchScore
    },

    editRules() {
      return {
        score_status: [
          {
            required: true,
            message: '请选择积分变更状态',
            trigger: 'change',
          },
        ],
        remark: [
          {
            required: this.editForm.score_status == 'fail',
            message: '请填写变更操作说明',
            trigger: 'blur',
          },
        ],
      }
    },

    scoreStatusType() {
      return getMapOptions('scoreStatusType')
    },

    tableCols() {
      return tableCols(this)
    },

    filterFields() {
      return filterFields(this)
    },
  },

  methods: {
    modifyScoreStatus(row) {
      this.editForm.score_status = row.score_status || ''
      this.editForm.remark = row.remark || ''
      this.rowId = row.id
      this.editDialog = true
    },
    handleEditReset() {
      this.$refs.editForm.resetFields()
      this.editDialog = false
    },
    handleEditSubmit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          patchScoreStatus(this.rowId, this.filtersMutate.parse(this.editForm))
            .then(() => {
              this.$message.success('修改积分变更状态成功')
              this.handleEditReset()
              this.pager = { ...pagerInit }
              this.fetchTableList()
            })
            .catch((err) => {
              this.formError = errorFormat(err.data)
            })
        }
      })
    },
    handleCreateMessage() {
      this.createIntegral = true
    },
    handleDialogCancel() {
      this.$refs.createForm.resetFields()
      this.createIntegral = false
    },

    handleDialogSubmit() {
      this.$refs.createForm.validate((valid) => {
        if (valid) {
          if (this.form.score_change === 0) {
            this.$message.info('变更积分数量不能为0')
            return
          }
          postScore(this.form)
            .then(() => {
              this.$message.success('新增积分成功')
              this.handleDialogCancel()
              this.pager = { ...pagerInit }
              this.fetchTableList()
            })
            .catch((err) => {
              this.formError = errorFormat(err.data)
            })
        }
      })
    },
  },

  mounted() {
    this.fetchTableList()
    this.fetchOptions('score_type')
    fetchOptsPosition().then((data) => {
      this.positionOpts = data || []
    })
    fetchOptsDepartment().then((data) => {
      this.departmentOpts = data || []
    })
    fetchUserListSimple({ page_size: 999999 }).then((data) => {
      const users = data.results || []
      this.usersOpts = users.map((user) => ({
        label: user.name,
        value: user.id,
      }))
    })
  },
}
</script>
