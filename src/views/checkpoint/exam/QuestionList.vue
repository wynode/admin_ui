<template>
  <div class="gb_wrap">
    <el-card class="Mb24">
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="题目"
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
        ref="examquestionviews"
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
        @submit="handleFilterFn"
        @cancel="handleFilterResetFn"
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
        class="Mb20 Mr20"
        @click="handleCreateQuestion"
      >
        新增题目
      </el-button>
      <el-button
        size="small"
        type="primary"
        class="Mb20"
        @click="checkSelection() && handleEditQuestionStatus()"
      >
        修改题目状态
      </el-button>

      <Txcel
        ref="table"
        v-loading="mixTableLoading"
        :data="tableList"
        :columns="questionCols"
        :rowSelection="{ onChange: handleSelectionChange }"
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

    <QuestionDialog
      ref="question_dialog"
      :questionDialog="questionDialog"
      @update="handleQuestionDialogUpdate"
    />

    <el-dialog
      title="修改题目状态"
      :visible.sync="editQuestionStatusDialog"
      width="30%"
    >
      <el-form :model="statusForm" ref="statusForm" label-width="40px">
        <el-form-item prop="status" :error="statusError.status">
          <el-radio-group v-model="statusForm.status">
            <el-radio
              v-for="item in questionStatusType"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancelSubmitEdit">取 消</el-button>
        <el-button type="primary" @click="handleSubmitEditQuestionStatus">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import table from '@/mixins/table'
import { getMapOptions } from '@/utils/mappings'
import { errorFormat } from '@/utils/errorFormat'
import {
  fetchExamQuestion,
  fetchCheckPointSimple,
  postExamQuestionStatus,
  deleteExamQuestionById,
} from '@/apis/checkpoint'
import { fetchManagers } from '@/apis/manager'
import { fetchUserListSimple } from '@/apis/users'
import { questionCols } from './tableConfig'
import { filterFields, filtersMutateInit } from './formConfig'
import RegularFilter from '@/components/regular_filter'
import QuestionDialog from './subComponents/QuestionDialog.vue'
import { fetchQuestionCommonStat } from '@/apis/regularfilter'

const pagerInit = {
  page: 1,
  page_size: 10,
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
    QuestionDialog,
    RegularFilter,
  },

  data() {
    return {
      questionList: [],
      managerOpts: [],
      usersOpts: [],
      checkPointList: [],

      editQuestionStatusDialog: false,
      statusForm: {
        status: '',
      },
      regularConfig: {
        appName: 'examquestionviews',
        mutate: filtersMutateInit,
        appStstc: fetchQuestionCommonStat,
      },
      statusError: {},
      questionDialog: {
        dialogVis: false,
        title: '',
        type: '',
      },
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchExamQuestion
    },

    questionCols() {
      return questionCols(this)
    },

    filterFields() {
      return filterFields(this)
    },

    questionStatusType() {
      return getMapOptions('questionStatusType')
    },
  },

  methods: {
    handleQuestionDialogUpdate() {
      if (this.questionDialog.type === 'create') {
        this.pager = { ...pagerInit }
        this.fetchTableList()
      } else if (this.questionDialog.type === 'edit') {
        this.fetchTableList(this.filtersCache)
      } else {
        this.pager = { ...pagerInit }
        this.fetchTableList()
      }
    },

    handleSelectionChange(select) {
      this.questionList = select.map((s) => s.id)
    },

    handleFilterFn(form) {
      this.$refs.examquestionviews.currentFilter.id = 'noset'
      this.handleFilter(form)
    },

    handleFilterResetFn() {
      this.$refs.examquestionviews.currentFilter.id = 'noset'
      this.handleFilterReset()
    },

    handleCreateQuestion() {
      this.questionDialog = {
        dialogVis: true,
        title: '新增题目',
        type: 'create',
        checkPointList: this.checkPointList,
      }
    },

    handleEditQuestion(row) {
      this.questionDialog = {
        dialogVis: true,
        title: '编辑题目',
        type: 'edit',
        row: row,
        checkPointList: this.checkPointList,
      }
    },

    // 删除题目
    handleDeleteQuestion(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteExamQuestionById(row.id)
            .then(() => {
              this.$message.success('删除成功')
              this.fetchTableList(this.filtersCache)
            })
            .catch((error) => {
              this.$message.error(error.data ? error.data[0] : '删除失败')
            })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },

    // 修改题目状态
    checkSelection() {
      if (this.questionList.length <= 0) {
        this.$notify.info('请勾选题目')
        return false
      }
      return true
    },

    handleEditQuestionStatus() {
      this.editQuestionStatusDialog = true
    },

    handleCancelSubmitEdit() {
      this.$refs.statusForm.resetFields()
      this.editQuestionStatusDialog = false
    },

    handleSubmitEditQuestionStatus() {
      postExamQuestionStatus({
        ids: this.questionList,
        status: this.statusForm.status,
      })
        .then(() => {
          this.$message.success('修改题目状态成功')
          this.handleCancelSubmitEdit()
          this.fetchTableList(this.filtersCache)
        })
        .catch((err) => {
          this.statusError = errorFormat(err.data)
        })
    },
  },

  mounted() {
    this.fetchTableList()
    fetchManagers({ page_size: 99999 }).then((res) => {
      this.managerOpts = res.results.map((v) => {
        return {
          label: v.staff_name,
          value: v.staff_id,
        }
      })
    })

    fetchUserListSimple({ page_size: 999999 }).then((data) => {
      const users = data.results || []
      this.usersOpts = users.map((user) => ({
        label: user.name,
        value: user.id,
      }))
    })

    fetchCheckPointSimple().then((res) => {
      this.checkPointList = res.results.map((v) => {
        return {
          label: v.name,
          value: v.id,
        }
      })
    })
  },
}
</script>

<style lang="scss">
.question_topic_title {
  font-weight: bold;
  line-height: 2;
}
</style>
