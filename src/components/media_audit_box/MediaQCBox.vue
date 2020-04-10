<template>
  <div class="media_qc_box">
    <div class="Hst media_audit_box_container">
      <div class="player_container">
        <ImagePlayer v-if="playerType === 'image'" :urls="auditData.pictures" />
        <VideoPlayer
          v-else-if="playerType === 'video' || playerType === 'audio'"
          :src="auditData.content"
          class="Di Vam"
          style="height: 100%"
        />
      </div>

      <div class="Px4 Fz12">
        <div>内容ID：{{ auditData.content_id }}</div>
        <div>入库时间：{{ auditData.create_time }}</div>
        <p v-if="auditStaff">审核人: {{ auditStaff.user_name }}</p>
        <p v-if="auditStaff">审核提交时间: {{ auditStaff.result_time }}</p>
      </div>

      <el-divider class="Mt8 Mb0"></el-divider>

      <div class="Px4 audit_options">
        <el-form :model="qcForm" ref="qcForm" size="mini">
          <el-form-item
            label="质检结果"
            prop="qc_result"
            class="qc_from_result"
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
              <el-radio border label="normal" style="margin-right:16px;">
                合规
              </el-radio>
              <el-radio border label="illegal">不合规</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            prop="audit_result"
            :rules="{
              required: true,
              message: '请选择一个审核结果',
              trigger: 'change',
            }"
          >
            <el-radio-group
              v-model="qcForm.audit_result"
              class="audit_result"
              @change="handleAuditResultChange"
            >
              <el-radio label="normal" border :disabled="disabledTagSelect">
                正常
              </el-radio>
              <el-radio
                v-for="item in secondTagsOpts"
                :key="item.code"
                :label="item.code"
                border
                :disabled="disabledTagSelect"
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
import ImagePlayer from './ImagePlayer.vue'
import VideoPlayer from './VideoPlayer.vue'

const qcFormInit = {
  qc_result: 'normal',
  audit_result: '',
  third_result: '',
  remark: '',
}

export default {
  name: 'MediaQCBox',

  components: {
    ImagePlayer,
    VideoPlayer,
  },

  props: {
    auditData: {
      type: Object,
      default: () => ({}),
    },

    secondTagsObj: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      qcForm: { ...qcFormInit },
      disabledTagSelect: true,
    }
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
    playerType() {
      return this.auditData.content_type
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
          this.handleQcResultChange('normal')
        })
      },
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
  },
}
</script>

<style lang="scss">
.media_qc_box {
  margin-top: 12px;
  padding: 0 8px;
  border-radius: 2px;

  .qc_from_result {
    display: flex;
    align-items: center;
    .el-form-item__label {
      margin-top: 8px;
    }
  }

  .form_item_remark {
    display: flex;
    .el-form-item__label {
      min-width: 58px;
      padding-right: 4px;
    }
  }

  .media_audit_box_container {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.35);
  }

  .player_container {
    height: 120px;
    line-height: 120px;
    background-color: #e7eaef;
    text-align: center;
  }

  .audit_options {
    .audit_result.el-radio-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .el-radio.is-bordered {
      margin: 0;
      margin-top: 8px;
      padding: 6px 8px 0 8px;
      &.is-disabled {
        border-color: #ebeef5;
        .el-radio__label {
          color: #c0c4cc;
        }
        .el-radio__inner {
          border-color: #e4e7ed;
        }
      }
      &.is-checked {
        background: #845bea;
        .el-radio__inner {
          border-color: #fff;
        }
        .el-radio__label {
          color: #fff;
        }
      }
      &.is-checked.is-disabled {
        background: #c0c4cc;
        .el-radio__label {
          color: #fff;
        }
      }
    }

    .el-radio__input .el-radio__inner {
      display: none;
    }

    .el-radio__label {
      padding-left: 0;
    }

    .el-form {
      display: inline-block;
    }
  }
}
</style>
