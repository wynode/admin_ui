<template>
  <el-dialog
    :title="questionDialog.title"
    :visible.sync="questionDialog.dialogVis"
    :close-on-click-modal="false"
    @close="handleResetDialog"
    width="60%"
    class="question_dialog"
  >
    <el-form ref="question_from" :model="form" label-width="120px">
      <el-form-item
        label="所属分类"
        prop="category"
        :rules="[
          { required: true, message: '请选择所属分类', trigger: 'change' },
        ]"
      >
        <el-select
          size="small"
          v-model="form.category"
          placeholder="请选择所属分类"
        >
          <el-option
            v-for="op in checkPointCategory"
            :key="op.value"
            :label="op.label"
            :value="op.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属关卡" prop="check_point">
        <el-select
          size="small"
          v-model="form.check_point"
          placeholder="请选择所属关卡"
        >
          <el-option
            v-for="op in questionDialog.checkPointList"
            :key="op.value"
            :label="op.label"
            :value="op.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="能力评估模型"
        prop="direction"
        :rules="{
          type: 'array',
          required: true,
          message: '请选择能力评估模型',
          trigger: 'change',
        }"
      >
        <el-select
          size="small"
          multiple
          v-model="form.direction"
          placeholder="请选择能力评估模型"
        >
          <el-option
            v-for="op in directionType"
            :key="op.value"
            :label="op.label"
            :value="op.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="题干"
        prop="topic"
        :error="errorMsg.topic"
        :rules="{ required: true, message: '请输入题干文字', trigger: 'blur' }"
      >
        <el-input
          type="textarea"
          placeholder="请输入题干文字"
          v-model="form.topic"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <Upload
          type="img"
          ref="upload"
          :disabled="false"
          deleteText="删除图片"
          xselector=".question_dialog"
          v-model="form.topic_image"
          style="max-width: 200px;"
        ></Upload>
      </el-form-item>
      <el-form-item label="题目类型">
        <el-radio-group
          v-model="form.question_type"
          @change="handleQuestionTypeChange"
        >
          <el-radio
            v-for="item in questionType"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-if="form.question_type === 'select'" class="question_container">
        <div class="question_item_ul">
          <el-form-item
            v-for="(puzzle, index) in form.puzzle"
            :key="index"
            ref="puzzle"
            label="选择题选项"
            :prop="'puzzle.' + index + '.1'"
            :rules="{
              required: true,
              message: '请输入选项内容',
              trigger: 'blur',
            }"
            class="question_item_li"
          >
            <el-input
              v-model="puzzle[1]"
              size="small"
              type="textarea"
              autosize
              placeholder="请输入选项内容"
              @change="changeToShortId(puzzle[1], index)"
            ></el-input>
            <i
              class="el-icon-plus puzzle_i"
              @click="handlePushPuzzle(index)"
            ></i>
            <i
              class="el-icon-minus puzzle_i"
              @click="handleDeletePuzzle(index)"
            ></i>
          </el-form-item>
        </div>

        <el-form-item
          label-width="40px"
          prop="answer"
          class="question_answer"
          :rules="{
            type: 'array',
            required: true,
            message: '请选择一个正确答案',
            trigger: 'change',
          }"
        >
          <el-radio-group v-model="form.answer[0]">
            <el-radio
              v-for="(item, index) in form.puzzle"
              :key="index"
              :label="item[0]"
              :disabled="!item[0]"
            >
              正确答案
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div v-if="form.question_type === 'judge'" class="question_container">
        <div class="question_item_ul">
          <el-form-item
            v-for="(puzzle, index) in form.puzzle"
            :key="index"
            label="判断题选项"
            :prop="'puzzle.' + index + '.1'"
            ref="puzzle"
            :rules="{
              required: true,
              message: '请输入选项内容',
              trigger: 'blur',
            }"
            class="question_item_li"
          >
            <el-input
              v-model="puzzle[1]"
              size="small"
              type="textarea"
              autosize
              placeholder="请输入选项内容"
              @change="changeToShortId(puzzle[1], index)"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item
          label-width="40px"
          class="question_answer"
          prop="answer"
          :rules="{
            type: 'array',
            required: true,
            message: '请选择一个正确答案',
            trigger: 'blur',
          }"
        >
          <el-radio-group v-model="form.answer[0]">
            <el-radio
              v-for="(item, index) in form.puzzle"
              :key="index"
              :label="item[0]"
              :disabled="!item[0]"
            >
              正确答案
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <el-form-item label="答题解析" prop="explain" :error="errorMsg.explain">
        <el-input type="textarea" v-model="form.explain"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-checkbox
        v-model="submitAndCreate"
        style="margin-right: 40px"
        v-if="questionDialog.type === 'create'"
      >
        提交后创建下一题
      </el-checkbox>
      <el-button @click="handleResetDialog">取 消</el-button>
      <el-button type="primary" @click="handleSubmitQuestion">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import shortid from 'shortid'
import { getMapOptions } from '@/utils/mappings'
import Upload from '@/components/Upload'
import {
  postExamQuestion,
  fetchCheckPointSimple,
  patchExamQuestion,
} from '@/apis/checkpoint'
import { errorFormat } from '@/utils/errorFormat'
import pick from 'lodash/pick'
import throttle from 'lodash/throttle'

const formInit = {
  question_type: 'select',
  explain: '',
  category: '',
  check_point: null,
  direction: [],
  topic: '',
  topic_image: '',
  answer: [],
  puzzle: [[], [], [], []],
}

export default {
  components: {
    Upload,
  },

  props: {
    questionDialog: {
      type: Object,
      default: () => {},
    },
  },

  watch: {
    questionDialog: {
      handler(newDialog) {
        if (newDialog.row) {
          this.form = {
            ...formInit,
            ...newDialog.row,
          }
        } else {
          this.form = {
            ...formInit,
            category: newDialog.category || '',
            check_point: newDialog.check_point || null,
            answer: [],
            puzzle: [[], [], [], []],
          }
        }
        this.$nextTick(() => {
          this.$refs.question_from.clearValidate()
        })
      },
    },

    'form.category': {
      handler(newValue) {
        if (!newValue) return
        fetchCheckPointSimple({ category__in: newValue }).then((res) => {
          this.questionDialog.checkPointList = res.results.map((v) => {
            return {
              label: v.name,
              value: v.id,
            }
          })
        })
      },
    },
  },

  data() {
    return {
      submitAndCreate: false,
      form: { ...formInit, answer: [], puzzle: [[], [], [], []] },
      errorMsg: {},
    }
  },

  computed: {
    checkPointCategory() {
      return getMapOptions('checkPointCategory')
    },
    questionType() {
      return getMapOptions('questionType')
    },
    directionType() {
      return getMapOptions('directionType')
    },
  },

  methods: {
    handlePushPuzzle(index) {
      if (this.form.puzzle.length >= 4) {
        this.$message.info('选择题最多输入四个选项')
        return
      }
      this.form.puzzle.splice(index + 1, 0, [])
    },
    handleDeletePuzzle(index) {
      if (this.form.puzzle.length <= 2) {
        this.$message.info('选择题最少输入两个选项')
        return
      }
      this.form.puzzle = this.form.puzzle.filter(
        (v, vindex) => vindex !== index
      )
    },

    handleSubmitQuestion: throttle(
      function fn() {
        this.submitQuestion()
      },
      500,
      {
        trailing: false,
      }
    ),

    submitQuestion() {
      this.$refs.question_from.validate((valid) => {
        if (valid) {
          if (this.questionDialog.type === 'create') {
            postExamQuestion(this.form)
              .then(() => {
                this.$message.success('创建题目成功')
                if (this.submitAndCreate) {
                  const tempForm = pick(this.form, [
                    'category',
                    'check_point',
                    'question_type',
                    'direction',
                  ])
                  this.$refs.question_from.resetFields()
                  if (tempForm.question_type === 'select') {
                    this.form = {
                      ...formInit,
                      answer: [],
                      puzzle: [[], [], [], []],
                      ...tempForm,
                    }
                  } else {
                    const correntId = shortid.generate('正确')
                    const failId = shortid.generate('错误')
                    this.form = {
                      ...formInit,
                      answer: [],
                      puzzle: [
                        [correntId, '正确'],
                        [failId, '错误'],
                      ],
                      ...tempForm,
                    }
                  }
                } else {
                  this.handleResetDialog()
                }
              })
              .catch((error) => {
                this.errorMsg = errorFormat(error.data)
              })
          } else if (this.questionDialog.type === 'edit') {
            patchExamQuestion(this.questionDialog.row.id, this.form)
              .then(() => {
                this.$message.success('编辑题目成功')
                this.handleResetDialog()
              })
              .catch((error) => {
                this.errorMsg = errorFormat(error.data)
              })
          } else {
            this.$message.error('题目弹窗Type设置错误')
          }
        }
      })
    },

    changeToShortId(value, index) {
      const valueToshortid = shortid.generate(value)
      // 修改了正确答案,将答案移到正确答案上面
      if (
        this.form.puzzle[index][0] === this.form.answer[0] &&
        this.form.answer[0]
      ) {
        this.$set(this.form.puzzle[index], 0, valueToshortid)
        this.$set(this.form.answer, 0, valueToshortid)
      } else {
        this.$set(this.form.puzzle[index], 0, valueToshortid)
      }
    },
    handleQuestionTypeChange(value) {
      if (value === 'select') {
        this.form.puzzle = [[], [], [], []]
        this.answer = []
      } else {
        const correntId = shortid.generate('正确')
        const failId = shortid.generate('错误')
        this.form.puzzle = [
          [correntId, '正确'],
          [failId, '错误'],
        ]
        this.form.answer = []
      }
    },

    handleResetDialog() {
      this.form = { ...formInit, answer: [], puzzle: [[], [], [], []] }
      this.$refs.question_from.resetFields()
      this.$emit('update')
      this.questionDialog.dialogVis = false
    },
  },
}
</script>

<style lang="scss">
.question_dialog {
  .el-form-item {
    margin-bottom: 8px;
  }
  .el-dialog {
    min-width: 600px;
  }
  .el-form-item__content {
    min-height: 40px;
  }
  .el-form-item__error {
    padding-top: 0;
  }
  .el-textarea {
    margin: 6px 0 4px;
  }
  #decode_image {
    max-width: 300px;
    max-height: 100%;
  }
  .question_container {
    display: flex;
    .question_item_ul {
      flex-grow: 4;
      .el-form-item {
        .el-form-item__label {
          display: none;
        }
        &:first-child {
          .el-form-item__label {
            display: block;
          }
        }
      }

      .question_item_li {
        .el-form-item__content {
          display: flex;
          align-items: center;
        }
        .puzzle_i {
          margin-left: 4px;
          &:hover {
            cursor: pointer;
            opacity: 0.9;
          }
        }
      }
    }
    .question_answer {
      flex-grow: 1;
      .el-radio-group {
        display: flex;
        flex-direction: column;
        .el-radio {
          line-height: 44px;
        }
      }
    }
  }
}
</style>
