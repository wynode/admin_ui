<template>
  <div class="audit_item">
    <div class="audit_main">
      <div class="audit_origin">
        <el-tag type="success">{{ auditData.content_origin_cn }}</el-tag>
      </div>
      <div>
        <div class="audit_content">
          <p v-html="content" ref="content"></p>
        </div>
        <!-- <div
          @click="handleOpenDialog(content)"
          class="audit_unfold"
          v-if="unfoldContent"
        >
          <p style="color: #333">...</p>
          <div class="audit_unfold_title">
            展开内容
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div> -->
      </div>
      <div v-if="auditData.pictures.length" class="audit_pictures">
        <DecodeImageList
          :urls="auditData.pictures"
          :limited="9"
          :showHover="true"
        ></DecodeImageList>
      </div>
      <div class="audit_parent" v-if="auditData.parent_topic">
        原贴:
        <div>
          <div class="audit_parent_content">
            <p v-html="parent_topic" ref="parent"></p>
          </div>
          <div
            @click="handleOpenDialog(parent_topic)"
            class="audit_unfold"
            v-if="unfoldParent"
          >
            <p style="color: #999">...</p>
            <div class="audit_unfold_title">
              展开内容
              <i class="el-icon-caret-bottom"></i>
            </div>
          </div>
        </div>
        <div
          v-if="auditData.parent_pictures.length"
          class="audit_parent_pictures"
        >
          <DecodeImageList
            :urls="auditData.parent_pictures"
            :limited="9"
            :showHover="true"
          ></DecodeImageList>
        </div>
      </div>
      <div class="audit_subcontent">
        <p>内容id: {{ auditData.content_id }}</p>
        <p class="Ml20">入库时间: {{ auditData.create_time }}</p>
        <p class="Ml20">提交时间: {{ auditData.final_result_time }}</p>
        <p v-if="auditStaff" class="Ml20">审核人: {{ auditStaff.user_name }}</p>
        <p v-if="auditStaff" class="Ml20">
          审核提交时间: {{ auditStaff.result_time }}
        </p>
      </div>

      <div class="audit_qc">
        <el-form :model="qcForm" ref="qcForm" label-width="100px">
          <el-form-item
            label="质检结果"
            prop="qc_result"
            size="small"
            :rules="{
              required: true,
              message: '请选择一个质检结果',
              trigger: 'change',
            }"
          >
            <el-radio-group
              v-model="qcForm.qc_result"
              @change="handleQcResultChange"
            >
              <el-radio border label="normal">合规</el-radio>
              <el-radio border label="illegal">不合规</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label=""
            prop="audit_result"
            :rules="{
              required: true,
              message: '请选择一个正确结果',
              trigger: 'change',
            }"
            :error="first_result_error"
          >
            <!-- <el-radio-group v-model="qcForm.first_result">
              <el-radio border label="normal">正常</el-radio>
              <el-radio border label="illegal">违规</el-radio>
            </el-radio-group> -->
            <el-radio-group
              v-model="qcForm.audit_result"
              size="small"
              @change="handleAuditResultChange"
            >
              <el-radio
                label="normal"
                border
                :disabled="disabledTagSelect"
                class="Mt10"
              >
                正常
              </el-radio>
              <el-radio
                v-for="item in secondTagsOpts"
                :key="item.code"
                :label="item.code"
                border
                :disabled="disabledTagSelect"
                class="Mt10"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            class="form_item_remark"
            label="关键词"
            prop="remark"
            size="small"
            :rules="{
              required: remarkIsRequired,
              message: '请填写关键字',
              trigger: 'change',
            }"
          >
            <el-input
              v-model="qcForm.remark"
              size="small"
              type="textarea"
              autosize
              class="qc_form_remark"
            ></el-input>
          </el-form-item>

          <el-form-item
            v-if="showThirdTagSelect"
            label="标签"
            prop="third_result"
            :rules="{
              required: true,
              message: '请选择一个三级标签',
              trigger: 'change',
            }"
          >
            <el-select
              v-model="qcForm.third_result"
              clearable
              filterable
              size="small"
              :disabled="disabledTagSelect"
            >
              <el-option
                v-for="item in thirdTagsOpts"
                :key="item.code"
                :label="item.label"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import parseHTMLDom from '@/utils/parseHTMLDom'

const qcFormInit = {
  qc_result: 'normal',
  audit_result: '',
  third_result: '',
  remark: '',
}

export default {
  name: 'auditItem',
  props: {
    auditData: {
      type: Object,
      default: () => {
        return {
          pictures: [],
          parent_pictures: [],
        }
      },
    },
    secondTagsObj: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      qcForm: { ...qcFormInit },
      content: '',
      first_result_error: '',
      parent_topic: '',
      disabledTagSelect: true,
      dialogVisible: false,
      unfoldContent: false,
      unfoldParent: false,
    }
  },

  watch: {
    auditData: {
      deep: true,
      immediate: true,
      handler(newValue) {
        this.$nextTick(() => {
          if (this.$refs.qcForm) {
            this.$refs.qcForm.resetFields()
            this.qcForm.remark = newValue.remark
          }
          if (this.$refs.parent) {
            this.unfoldParent = this.$refs.parent.scrollHeight > 90
          }
          this.handleQcResultChange('normal')
        })
        const { keywords } = newValue
        let contentTemp = newValue.content
        let parentTopicTemp = newValue.parent_topic
        if (keywords) {
          let keywordArray = []
          const scriptReg = new RegExp('<script', 'gi')
          const imgReg = new RegExp('<img', 'gi')
          keywords.forEach((key) => {
            if (!keywordArray.includes(key.word)) {
              keywordArray.push(key.word)
            }
          })
          if (contentTemp) {
            contentTemp = parseHTMLDom(contentTemp)
            contentTemp = contentTemp.replace(scriptReg, '<scritp')
            contentTemp = contentTemp.replace(imgReg, '<igm')
            keywordArray.forEach((word) => {
              const reg = new RegExp(word, 'g')
              contentTemp = contentTemp.replace(
                reg,
                `<span class="keyword_mark">${word}</span>`
              )
            })
          }
          if (parentTopicTemp) {
            parentTopicTemp = parseHTMLDom(parentTopicTemp)
            parentTopicTemp = parentTopicTemp.replace(scriptReg, '<scritp')
            parentTopicTemp = parentTopicTemp.replace(imgReg, '<igm')
            keywordArray.forEach((word) => {
              const reg = new RegExp(word, 'g')
              parentTopicTemp = parentTopicTemp.replace(
                reg,
                `<span class="keyword_mark">${word}</span>`
              )
            })
          }
        }
        this.content = contentTemp
        this.parent_topic = parentTopicTemp
      },
    },
  },

  computed: {
    auditStaff() {
      if (
        this.auditData.sub_orders.length == 1 &&
        this.auditData.sub_orders[0].user_name
      ) {
        return this.auditData.sub_orders[0]
      } else {
        return false
      }
    },
    secondTagsOpts() {
      return this.secondTagsObj[this.auditData.purifyconfig_id] || []
    },

    thirdTagsOpts() {
      const thirdTemp = this.secondTagsOpts.filter((item) => {
        return item.code === this.qcForm.audit_result
      })
      return thirdTemp[0] ? thirdTemp[0].third_tags || [] : []
    },

    remarkIsRequired() {
      return Boolean(this.auditData.require_remark)
    },

    showThirdTagSelect() {
      if (this.qcForm.qc_result === 'normal') {
        return Boolean(this.auditData.third_result)
      } else {
        return (
          this.qcForm.audit_result !== 'normal' && this.thirdTagsOpts.length > 0
        )
      }
    },
  },

  methods: {
    handleQcResultChange(value) {
      if (value === 'normal') {
        this.disabledTagSelect = true
        this.qcForm.audit_result =
          this.auditData.second_result || this.auditData.first_result
        this.qcForm.third_result = this.auditData.third_result || ''
      } else {
        this.disabledTagSelect = false
      }
    },

    handleAuditResultChange() {
      this.qcForm.third_result = ''
    },

    handleOpenDialog(content) {
      this.$createDialog(
        {
          width: '940px',
          showCancelBtn: false,
          closeOnClickModal: true,
          onSubmit: (instance) => {
            instance.close()
          },
        },
        () => <p class="audit_dialog_content" domPropsInnerHTML={content}></p>
      ).show()
    },
  },
}
</script>

<style lang="scss">
.audit_item {
  display: flex;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
  margin-top: 12px;
  padding: 12px 20px 12px;
  .form_item_remark {
    margin-top: 16px;
    .qc_form_remark {
      max-width: 215px;
    }
  }

  .audit_main {
    flex-grow: 1;
    .keyword_mark {
      background: yellow;
      color: red;
    }
    .audit_origin {
      font-size: 16px;
    }
    .audit_content {
      font-size: 16px;
      max-width: 900px;
      margin: 5px 0;
      // max-height: 100px;
      // overflow: hidden;
      word-break: break-all;
      color: #333;
    }
    .audit_unfold {
      display: flex;
      margin-bottom: 2px;
      cursor: pointer;
      .audit_unfold_title {
        color: #845bea;
        margin-left: 4px;
      }
    }

    .audit_dialog_content {
      word-break: break-all;
      font-size: 16px;
    }
    .audit_pictures {
      display: flex;
      margin-bottom: 8px;
      .el-image {
        width: 80px;
        height: 80px;
      }
    }
    .audit_subcontent {
      display: flex;
      color: #999;
      font-size: 12px;
      margin: 8px 0;
    }
    .audit_qc {
      .el-form {
        .el-form-item {
          margin-bottom: 8px;
        }
        .el-radio.is-checked.is-disabled {
          background: #c0c4cc;
          .el-radio__label {
            color: #fff;
          }
        }
        .el-radio.is-disabled {
          border-color: #ebeef5;
          .el-radio__label {
            color: #c0c4cc;
          }
          .el-radio__inner {
            border-color: #e4e7ed;
          }
        }
      }
      .el-radio.is-bordered {
        border: 1px solid #845bea;
      }
      .el-radio__label {
        color: #845bea;
      }
      .el-radio__inner {
        border-color: #845bea;
      }
      .el-radio.is-bordered.is-checked {
        background: #845bea;
        .el-radio__inner {
          border-color: #fff;
        }
        .el-radio__label {
          color: #fff;
        }
      }
    }

    .audit_parent {
      padding-top: 10px;
      color: #333;
      font-size: 16px;
      border-top: 1px dashed #845bea;
      padding-left: 20px;
      .audit_parent_content {
        color: #999;
        max-width: 900px;
        max-height: 90px;
        overflow: hidden;
        word-break: break-all;
        margin: 3px 0 5px;
      }
      .audit_parent_pictures {
        display: flex;
        .el-image {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
}
</style>
