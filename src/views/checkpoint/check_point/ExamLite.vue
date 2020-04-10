<template>
  <div class="gb_wrap">
    <el-button
      size="small"
      type="primary"
      class="Mb20 Mr20"
      icon="el-icon-plus"
      @click="handleCreateQuestion"
    >
      新增题目
    </el-button>

    <Txcel
      v-loading="mixTableLoading"
      ref="table"
      class="Txcel"
      :data="tableList"
      :columns="examLiteCols"
      :pager="{
        page: pager.page,
        page_size: pager.page_size,
        layout: 'total,prev,pager,next,jumper',
        total: tableTotal,
      }"
      @change="handleTableChange"
    />

    <question-dialog
      ref="question_dialog"
      :questionDialog="questionDialog"
      @update="handleQuestionDialogUpdate"
    ></question-dialog>
  </div>
</template>

<script>
import QuestionDialog from '@/views/checkpoint/exam/subComponents/QuestionDialog.vue'
import { getMapOptions } from '@/utils/mappings'
import {
  fetchExamQuestion,
  fetchCheckPointSimple,
  putCheckPointQues,
} from '@/apis/checkpoint'
import { fetchManagers } from '@/apis/manager'
import table from '@/mixins/table'
import { examLiteCols } from './tableConfig'

const pagerInit = {
  page: 1,
  page_size: 10,
}

const tableMixins = table({ pagerInit })

export default {
  name: 'ExamLite',

  mixins: [tableMixins],

  components: {
    QuestionDialog,
  },

  props: {
    checkPointName: String,
    checkPointProfile: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      questionList: [],
      staffList: [],
      checkPointList: [],
      questionDialog: {
        dialogVis: false,
        title: '',
        type: '',
      },
    }
  },

  computed: {
    fetchTableListMethod() {
      return this.fetchExamQuestion
    },

    examLiteCols() {
      return examLiteCols(this)
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
    fetchExamQuestion(params = {}) {
      const { id } = this.$route.params
      if (id) {
        return fetchExamQuestion({ ...params, check_point__in: id })
      }
      return Promise.resolve()
    },

    handleCreateQuestion() {
      this.questionDialog = {
        dialogVis: true,
        title: '新增题目',
        type: 'create',
        check_point: this.checkPointProfile.id,
        category: this.checkPointProfile.category,
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
    async handleDeleteQuestion(row) {
      const isConfirm = await this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch(() => {
        this.$notify.info('已取消删除')
        return false
      })

      if (isConfirm) {
        putCheckPointQues(row.id)
          .then(() => {
            this.$notify.success('删除成功')
            this.fetchTableList(this.filtersCache)
          })
          .catch(() => {
            this.$notify.error('删除失败')
          })
      }
    },
  },

  mounted() {
    this.fetchTableList()
    fetchManagers({ page_size: 99999 }).then((res) => {
      this.staffList = res.results.map((v) => {
        return {
          label: v.staff_name,
          value: v.staff_id,
        }
      })
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
