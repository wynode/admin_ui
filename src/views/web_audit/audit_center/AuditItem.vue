<template>
  <div class="audit_item">
    <div class="audit_main">
      <div class="audit_origin">
        <el-tag type="success">{{ auditData.content_origin_cn }}</el-tag>
        <div>
          <p v-if="isExpire">
            已超时：
            <span class="audit_origin_red">
              {{ orderExpireTime | expireTimeFormat }}
            </span>
          </p>
          <p v-else>
            <span>
              {{ orderWillExpireTime | expireTimeFormat }}
            </span>
            后超时
          </p>
        </div>
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
        <p class="Ml20">订单号: {{ auditData.content_id }}</p>
        <p class="Ml20">入库时间: {{ auditData.create_time }}</p>
      </div>

      <div class="audit_optionss">
        <el-form :model="auditForm" ref="auditForm">
          <el-form-item
            prop="audit_result"
            :rules="{
              required: true,
              message: '请选择一个审核结果',
              trigger: 'change',
            }"
          >
            <el-radio-group
              v-model="auditForm.audit_result"
              size="small"
              @change="handleAuditResultChange"
            >
              <el-radio label="normal" border class="Mt10">正常</el-radio>
              <el-radio
                class="Mt10"
                v-for="item in secondTagsOpts"
                :key="item.code"
                :label="item.code"
                border
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
              v-model="auditForm.remark"
              type="textarea"
              autosize
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
              v-model="auditForm.third_result"
              clearable
              filterable
              size="small"
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
import { addSeconds } from 'date-fns'
import parseHTMLDom from '@/utils/parseHTMLDom'
import { dateFormat, expireTimeFormat } from '@/utils/dateFormat'

const auditFormInit = {
  audit_result: 'normal',
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
    secondTagsOpts: {
      type: Array,
      default: () => [],
    },
    purifyConfigDetail: {
      type: Object,
      default: () => {},
    },
  },

  filters: {
    expireTimeFormat(time) {
      return expireTimeFormat(time)
    },
  },

  data() {
    return {
      auditForm: { ...auditFormInit },
      first_result_error: '',
      content: '',
      parent_topic: '',
      thirdTagsOpts: [],
      showThirdTagSelect: false,
      dialogVisible: false,
      unfoldContent: true,
      unfoldParent: true,
    }
  },

  computed: {
    orderExpireSeconds() {
      return this.purifyConfigDetail.order_expire_seconds || 900
    },

    orderExpireDate() {
      const createTime = new Date(this.auditData.create_time)
      const expireTime = addSeconds(createTime, this.orderExpireSeconds)
      return dateFormat(expireTime)
    },

    isExpire() {
      return new Date().getTime() - new Date(this.orderExpireDate).getTime() > 0
    },

    orderExpireTime() {
      return new Date().getTime() - new Date(this.orderExpireDate).getTime()
    },

    remarkIsRequired() {
      return Boolean(this.purifyConfigDetail.require_remark)
    },

    orderWillExpireTime() {
      return new Date(this.orderExpireDate).getTime() - new Date().getTime()
    },
  },

  watch: {
    auditData: {
      deep: true,
      immediate: true,
      handler(newValue) {
        this.$nextTick(() => {
          if (this.$refs.auditForm) {
            this.$refs.auditForm.resetFields()
            this.auditForm.remark = newValue.remark || ''
          }
          if (this.$refs.parent) {
            this.unfoldParent = this.$refs.parent.scrollHeight > 90
          }
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

  methods: {
    handleAuditResultChange(value) {
      this.showThirdTagSelect = false
      this.auditForm.third_result = ''
      if (value !== 'normal') {
        this.secondTagsOpts.forEach((item) => {
          if (
            item.code === value &&
            item.third_tags &&
            item.third_tags.length > 0
          ) {
            this.showThirdTagSelect = true
            this.thirdTagsOpts = item.third_tags
          }
        })
      }
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
  margin-top: 20px;
  padding: 20px 20px 12px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  .audit_main {
    flex-grow: 1;
    .keyword_mark {
      background: yellow;
      color: red;
    }
    .audit_origin {
      font-size: 16px;
      display: flex;
      width: 240px;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 14px;
        color: #333;
      }
      .audit_origin_red {
        color: #f56c6c;
      }
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
    .audit_content {
      font-size: 16px;
      max-width: 900px;
      margin: 5px 0;
      // max-height: 100px;
      // overflow: hidden;
      word-break: break-all;
      color: #333;
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
    .audit_optionss {
      .form_item_remark {
        display: flex;
      }
      .el-form-item {
        margin-bottom: 10px;
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
      .el-radio.is-checked.is-disabled {
        background: #c0c4cc;
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
