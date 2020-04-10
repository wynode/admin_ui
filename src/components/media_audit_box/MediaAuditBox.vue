<template>
  <div class="media_audit_box">
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

      <el-divider class="Mt8 Mb0"></el-divider>

      <div class="Px4 audit_options">
        <el-form
          :model="auditForm"
          ref="auditForm"
          label-position="right"
          size="mini"
        >
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
              @change="handleAuditResultChange"
            >
              <el-radio label="normal" border>正常</el-radio>
              <el-radio
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
            label="关键词"
            prop="remark"
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
            <el-select v-model="auditForm.third_result" clearable filterable>
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
import { addSeconds } from 'date-fns'
import { dateFormat, expireTimeFormat } from '@/utils/dateFormat'

const auditFormInit = {
  audit_result: 'normal',
  third_result: '',
  remark: '',
}

export default {
  name: 'MediaAuditBox',

  components: {
    ImagePlayer,
    VideoPlayer,
  },

  filters: {
    expireTimeFormat(time) {
      return expireTimeFormat(time)
    },
  },

  props: {
    auditData: {
      type: Object,
      default: () => ({}),
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

  data() {
    return {
      auditForm: { ...auditFormInit },
      showThirdTagSelect: false,
      thirdTagsOpts: [],
    }
  },

  computed: {
    playerType() {
      return this.auditData.content_type
    },

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

    orderWillExpireTime() {
      return new Date(this.orderExpireDate).getTime() - new Date().getTime()
    },

    remarkIsRequired() {
      return Boolean(this.purifyConfigDetail.require_remark)
    },
  },

  watch: {
    auditData: {
      deep: true,
      immediate: true,
      handler(newValue) {
        const { remark } = newValue
        this.auditForm.remark = remark || ''
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
  },
}
</script>

<style lang="scss">
.media_audit_box {
  margin-top: 12px;
  padding: 0 8px;
  border-radius: 2px;

  .media_audit_box_container {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.35);
  }

  .audit_origin_red {
    color: #f56c6c;
  }

  .player_container {
    height: 120px;
    overflow: auto;
    line-height: 120px;
    background-color: #e7eaef;
    text-align: center;
  }

  .audit_options {
    .el-radio-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .el-form-item__content {
      display: flex;
    }

    .el-radio.is-bordered {
      margin: 0;
      margin-top: 8px;
      padding: 6px 8px 0 8px;
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
