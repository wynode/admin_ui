<template>
  <div class="audit_center" v-if="showCenter">
    <ul class="audit_top">
      <li>
        <p>{{ auditAllTotal.my_all_count }}</p>
        <span>今日我已审核</span>
      </li>
      <li>
        <p>{{ auditAllTotal.my_all_web_count }}</p>
        <span>网页审核</span>
      </li>
      <li>
        <p>{{ auditAllTotal.my_all_app_count }}</p>
        <span>App审核</span>
      </li>
    </ul>

    <div class="audit_content">
      <el-radio-group v-model="auditType" @change="fetchAuditMenuListFn">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button label="only_web">仅网页</el-radio-button>
        <el-radio-button label="mixed">混合</el-radio-button>
      </el-radio-group>

      <div v-if="auditIndexList.length">
        <ul class="audit_content_ul">
          <li v-for="item in auditIndexList" :key="item.name">
            <div
              class="Posa Mt32 Curp _item"
              @click="handleGoAuditProfile(item)"
            >
              <h2>
                <i class="el-icon-s-platform"></i>
                {{ item.name }}
              </h2>
              <div>待鉴定： {{ contentTypesCount[item.id] || 0 }}</div>
            </div>
            <el-checkbox-group
              v-model="content_types[item.id]"
              class="Posa Wst TaEnd _ct"
              @change="(val) => handleContentTypesChanged(val, item)"
            >
              <el-checkbox label="text">文本</el-checkbox>
              <el-checkbox label="imagetext">图文</el-checkbox>
            </el-checkbox-group>
          </li>
        </ul>
      </div>
      <div v-else class="audit_no_content">
        暂无可审核订单
      </div>
    </div>
  </div>

  <div class="audit_list" v-else>
    <div class="audit_list_top">
      <p>今日我已审核：{{ auditTotal.my_web_count }}</p>
      <p class="Ml40">当前总未审核：{{ auditTotal.toaudit_count }}</p>
    </div>
    <div class="audit_list_title" :class="{ audit_title_reverse: isReverse }">
      审核内容
      <div class="audit_list_count_down" v-if="webExpireTime">
        <p>提交倒计时：</p>
        <count-down
          ref="countdown"
          @end="handleCountDownEnd"
          :time="webExpireTime * 1000"
          v-if="showCountDown"
        >
          <template slot-scope="props">
            {{ props.minutes }} 分钟 {{ props.seconds }} 秒
          </template>
        </count-down>
      </div>
    </div>
    <div class="audit_list_main" v-loading="auditLoading">
      <audit-item
        v-for="(item, index) in auditList"
        :key="index"
        :auditData="item"
        :ref="`audit${item.id}`"
        :secondTagsOpts="secondTagsOpts"
        :purifyConfigDetail="purifyConfigDetail"
      ></audit-item>
    </div>
    <div class="audit_list_btn" v-if="auditList.length">
      <el-button
        type="danger"
        @click="handleSubmitAndExit"
        :loading="submitLoading"
      >
        提交并退出
      </el-button>
      <el-button
        type="success"
        @click="handleSubmitAndNext"
        :loading="submitLoading"
      >
        提交并跳转下一页
      </el-button>
    </div>
  </div>
</template>

<script>
import store from 'store2'
import VueCountdown from '@chenfengyuan/vue-countdown'
import { fetchAllAuditCount } from '@/apis/web_audit'
import {
  fetchCurAuditCount,
  fetchAuditList,
  postAuditList,
  fetchAuditMenuList,
  postAuditListAndStop,
} from '@/apis/web_audit'
import AuditItem from './AuditItem.vue'

const CONTENT_TYPES_STORE = 'auditContentTypes'
const DEFAULT_CONTENT_TYPES = ['text', 'imagetext']

export default {
  name: 'AuditCenter',

  components: {
    AuditItem,
    'count-down': VueCountdown,
  },

  data() {
    return {
      submitLoading: false,
      auditLoading: false,
      canShowConfirm: false,
      showCenter: true,
      showCountDown: true,
      isReverse: false,
      auditType: '',
      auditAllTotal: {},
      auditIndexList: [],
      content_types: {},
      contentTypesCount: {},
      webExpireTime: 600,
      once_assign_number: 0,

      secondTagIds: [],
      auditList: [],
      auditTotal: {},
      secondTagsObj: {},
      purifyConfigDetail: {},
      purify_config_id: '',
      secondTagsOpts: [],
      last_sub_id: 0,
    }
  },

  methods: {
    // 倒计时结束后退出审核
    async handleCountDownEnd() {
      try {
        const res = await postAuditListAndStop()
        if (res.status !== 'success') {
          this.$notify.error(res.message)
          return
        }
        this.auditList = []
        this.$notify.success('退出审核成功')
        this.showCenter = true
        this.canShowConfirm = false
        this.fetchAllAuditCountFn()
      } catch {
        this.$notify.error('退出审核失败')
      }
    },
    // 控制顶部悬浮
    registerScroll() {
      const scrollTop = document.getElementById('main_anchor').scrollTop || 0
      if (scrollTop > 250) {
        this.isReverse = true
      } else {
        this.isReverse = false
      }
    },
    // 传入客户 ID
    getCustomCntTypesById(id) {
      const customerCntTypes = store.get(CONTENT_TYPES_STORE, {})
      return customerCntTypes[id] || []
    },

    /**
     * id 客户ID
     * types | Array 需要存储的 content_types，如果参数不是 Array 则使用 DEFAULT_CONTENT_TYPES 作为值
     */
    setCustomCntTypesById(id, types = []) {
      const storeTypes = Array.isArray(types)
        ? types
        : [...DEFAULT_CONTENT_TYPES]
      this.$set(this.content_types, `${id}`, storeTypes)
      store.transact(CONTENT_TYPES_STORE, (obj) => {
        obj[id] = storeTypes
      })
    },

    // 按 content_types 总合待鉴定数量
    countPendingCntTypes(item) {
      const { id, content_type_count: cntTypeCount } = item
      const cntTypes = this.getCustomCntTypesById(id)
      if (cntTypes.length) {
        return cntTypes.reduce((acc, cur) => {
          const currentCount = cntTypeCount[cur]
          return currentCount != null ? acc + currentCount : acc
        }, 0)
      }
      return 0
    },

    fetchAuditMenuListFn(platform) {
      fetchAuditMenuList({ platform }).then((res) => {
        this.auditIndexList = res.data
        const customerCntTypes = store.get(CONTENT_TYPES_STORE, {})
        this.auditIndexList.forEach((item) => {
          const value = customerCntTypes[item.id] || [...DEFAULT_CONTENT_TYPES]
          this.setCustomCntTypesById(item.id, value)
          this.$set(
            this.contentTypesCount,
            `${item.id}`,
            this.countPendingCntTypes(item)
          )
        })
      })
    },

    fetchAllAuditCountFn() {
      fetchAllAuditCount().then((data) => {
        this.auditAllTotal = data
      })
    },

    async handleGoAuditProfile(item) {
      this.showCenter = false
      this.canShowConfirm = true
      this.purifyConfigDetail = item
      this.purify_config_id = item.id
      this.secondTagsOpts = item.second_tags
      this.webExpireTime = item.web_expire_seconds || 600
      await postAuditListAndStop()
      this.fetchCurAuditCountFn()
    },

    // 获取当前客户 ID 下的审核统计
    fetchCurAuditCountFn() {
      const params = {
        purifyconfig_id: this.purify_config_id,
        content_types: this.getCustomCntTypesById(this.purify_config_id).join(
          ','
        ),
      }
      fetchCurAuditCount(params).then((data) => {
        this.auditTotal = data
        this.once_assign_number = Number(data.once_assign_number / 10).toFixed(
          0
        )
        this.fetchAuditListFn(this.once_assign_number)
      })
    },

    async fetchAuditListFn(time) {
      this.auditLoading = true
      for (let index = 0; index < time; index++) {
        const res = await fetchAuditList({
          purify_config_id: this.purify_config_id,
          last_sub_id: this.last_sub_id,
          content_types: this.getCustomCntTypesById(this.purify_config_id).join(
            ','
          ),
          random: String(new Date().getTime()).slice(6),
        })

        if (res.data) {
          if (res.data.length == 0 && index == 0) {
            this.$notify.info('没有更多的订单了')
            await postAuditListAndStop()
            this.fetchAllAuditCountFn()
            this.showCenter = true
            this.canShowConfirm = false
            return
          }
          if (res.data.length == 0) {
            this.auditLoading = false
            return
          }
          if (index == time - 1) {
            this.auditLoading = false
          }
          this.auditList = [...this.auditList, ...res.data]
          this.auditList.forEach((item) => {
            if (item.sub_id > this.last_sub_id) {
              this.last_sub_id = item.sub_id
            }
          })
        } else {
          this.$notify.error(res.message || res.msg || '获取列表错误')
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }
      }
    },

    // 提交逻辑
    async handleSubmit() {
      // 表单验证
      const valid = this.auditList.reduce((acc, cur) => {
        let res = false
        this.$refs[`audit${cur.id}`][0].$refs.auditForm.validate((valid) => {
          res = valid ? true : false
        })
        return acc && res
      }, true)
      if (!valid) {
        this.$notify.error('请完整填写审核列表')
        return false
      }
      //
      const payload = this.auditList.map((item) => {
        let auditForm = { ...this.$refs[`audit${item.id}`][0].auditForm }
        if (auditForm.audit_result == 'normal') {
          auditForm = {
            first_result: 'normal',
            second_result: '',
            remark: auditForm.remark,
          }
        } else {
          auditForm = {
            first_result: 'illegal',
            second_result: auditForm.audit_result,
            third_result: auditForm.third_result,
            remark: auditForm.remark,
          }
        }
        return {
          sub_id: item.sub_id,
          ...auditForm,
        }
      })
      try {
        this.submitLoading = true
        const res = await postAuditList({ answers: payload })
        this.submitLoading = false
        if (res.status !== 'success') {
          this.$notify.error(res.message)
          return false
        }
        this.$notify.success('提交成功')
        return true
      } catch {
        this.$notify.error('提交审核出错')
      }
    },

    async handleSubmitAndExit() {
      const res = await this.handleSubmit()
      if (!res) return
      try {
        const res = await postAuditListAndStop()
        if (res.status !== 'success') {
          this.$notify.error(res.message)
          return
        }
        this.auditList = []
        this.$notify.success('退出审核成功')
        this.showCenter = true
        this.canShowConfirm = false
        this.fetchAllAuditCountFn()
      } catch {
        this.$notify.error('退出审核失败')
      }
    },

    async handleSubmitAndNext() {
      const res = await this.handleSubmit()
      if (!res) return
      this.showCountDown = false
      this.auditList = []
      this.fetchAuditListFn(this.once_assign_number)
      const params = {
        purifyconfig_id: this.purify_config_id,
        content_types: this.getCustomCntTypesById(this.purify_config_id).join(
          ','
        ),
      }
      fetchCurAuditCount(params).then((data) => {
        this.auditTotal = data
        this.showCountDown = true
      })
    },

    // NOTE content_types 被勾选后需要同步 localStorage 存储
    handleContentTypesChanged(newVal, item) {
      store.transact(CONTENT_TYPES_STORE, (obj) => {
        obj[item.id] = newVal
      })
      this.$set(
        this.contentTypesCount,
        `${item.id}`,
        this.countPendingCntTypes(item)
      )
    },
  },

  beforeRouteEnter(to, from, next) {
    // NOTE 初始化 localStorage content_types 字段
    if (store.get(CONTENT_TYPES_STORE) == null) {
      store.set(CONTENT_TYPES_STORE, {})
    }
    next()
  },

  beforeRouteLeave(to, form, next) {
    if (this.canShowConfirm) {
      this.$confirm(
        '跳转将会自动结束本次审核，未提交审核的订单将不会提交，请谨慎！',
        '页面即将跳转',
        {
          type: 'warning',
        }
      )
        .then(() => {
          postAuditListAndStop().then(() => {
            this.$notify.success('退出审核成功')
          })
          next()
        })
        .catch(() => {
          next(false)
        })
    } else {
      next()
    }
  },

  mounted() {
    this.fetchAllAuditCountFn()
    this.fetchAuditMenuListFn()
    document
      .getElementById('main_anchor')
      .addEventListener('scroll', this.registerScroll, false)
  },

  beforeDestroy() {
    document
      .getElementById('main_anchor')
      .removeEventListener('scroll', this.registerScroll, false)
  },
}
</script>

<style lang="scss">
.audit_center {
  .audit_top {
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
  .audit_content {
    background: #fff;
    margin-top: 20px;
    padding: 20px;
    min-height: 400px;
    .audit_content_ul {
      display: flex;
      flex-wrap: wrap;
      li {
        position: relative;
        background: #e7eaef;
        border-radius: 10px;
        height: 150px;
        margin-top: 20px;
        margin-right: 20px;
        width: 240px;
        box-sizing: border-box;
        border: 1px solid transparent;
        ._item {
          display: flex;
          flex-direction: column;
          align-items: center;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        ._ct {
          box-sizing: border-box;
          left: 0;
          bottom: 0;
          padding: 0 12px;
          height: 32px;
          line-height: 32px;
        }
        h2 {
          font-size: 18px;
          margin-bottom: 14px;
        }
        &:hover {
          border: 1px solid #845bea;
        }
      }
    }
  }

  .audit_no_content {
    height: 200px;
    text-align: center;
    margin-top: 140px;
  }
}

.audit_list {
  background: #fff;
  margin-top: 20px;
  // min-width: 1200px;
  .audit_list_top {
    display: flex;
    padding: 20px;
  }
  .audit_list_title {
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    padding: 0 24px;
    background: #845bea;
    color: #fff;
    display: flex;
    justify-content: space-between;
    .audit_list_count_down {
      display: flex;
    }
  }
  .audit_title_reverse {
    position: fixed;
    width: calc(100% - 321px);
    top: 64px;
    z-index: 99;
    box-shadow: 0 4px 12px 0 rgba(52, 63, 75, 0.06);
  }
  .audit_list_main {
    min-height: 100px;
    padding: 0 20px 20px 20px;
  }
  .audit_list_btn {
    width: 400px;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 40px;
    .el-button {
      margin-left: 20px;
    }
  }
}
</style>
