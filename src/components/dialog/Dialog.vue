<template>
  <el-dialog
    :visible.sync="visible"
    :width="width"
    :title="title"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="true"
    @open="handleOpen"
    @close="handleClose"
  >
    <slot></slot>

    <el-row v-if="footer" type="flex" justify="end" class="Mt20">
      <el-button size="small" @click="handleCancel" v-if="showCancelBtn">
        {{ cancelBtnText }}
      </el-button>
      <el-button
        type="primary"
        size="small"
        :loading="loading"
        @click="handleConfirm"
      >
        {{ confirmBtnText }}
      </el-button>
    </el-row>
  </el-dialog>
</template>

<script>
const noop = () => undefined

export default {
  name: 'Dialog',

  props: {
    title: String,

    width: String,

    footer: {
      type: [Boolean, String],
      default: true,
    },

    confirmBtnText: {
      type: String,
      default: '确定',
    }, // 确定按钮的文字

    cancelBtnText: {
      type: String,
      default: '取消',
    }, // 取消按钮的文字

    showCancelBtn: {
      type: Boolean,
      default: true,
    }, // 是否显示取消按钮

    closeOnClickModal: {
      type: Boolean,
      default: false,
    }, // 是否可以通过点击屏幕外面关闭弹窗

    onOpen: {
      type: Function,
      default: noop,
    }, // 弹窗打开的时候的回调

    onClose: {
      type: Function,
      default: noop,
    }, // 弹窗关闭的时候的回调

    onSubmit: {
      type: Function,
      default: noop,
    },

    onCancel: {
      type: Function,
      default: noop,
    },
  },

  provide() {
    return {
      onSubmit: this.onSubmit,
      onCancel: this.handleCancel,
    }
  },

  data() {
    return {
      visible: false,
      childInstance: null,
      loading: false,
    }
  },

  watch: {
    visible(nextVis) {
      if (!nextVis) {
        document.body.removeChild(this.$el)
      }
    },
  },

  methods: {
    show() {
      this.visible = true
    },

    close() {
      this.handleCancel()
    },

    // 获取直接 child 组件的实例
    getChildInstance() {
      let defaultChildInstance = null
      if (Array.isArray(this.$slots.default) && this.$slots.default[0]) {
        defaultChildInstance = this.$slots.default[0].componentInstance
      }
      return defaultChildInstance
    },

    handleConfirm() {
      this.onSubmit(this, this.getChildInstance())
    },

    handleCancel() {
      this.visible = false
      this.onCancel(this, this.getChildInstance())
    },

    handleOpen() {
      this.onOpen(this)
    },

    handleClose() {
      this.onClose(this)
    },
  },
}
</script>
