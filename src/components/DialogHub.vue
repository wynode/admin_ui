<template>
  <el-dialog
    :visible.sync="visible"
    :title="dialogHub.title"
    :width="dialogHub.width"
    @open="handleOpen"
    @close="handleClose"
  >
    <component
      ref="asyncComponent"
      :is="dialogHub.component"
      @change="hanlderComponentChange"
    ></component>

    <div v-if="dialogHub.footer" slot="footer">
      <el-button type="danger" plain size="small" @click="handleCancel">
        取消
      </el-button>
      <el-button type="primary" plain size="small" @click="handleConfirm">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const name = 'dialogHub'

export default {
  name: 'DialogHub',

  provide() {
    return {
      dispatchRef: this.getComponentRef,
    }
  },

  data() {
    return {
      tempPayload: {},
      currentRef: null,
    }
  },

  computed: {
    ...mapState('dialog', {
      dialogHub: (state) => state[name],
    }),

    visible: {
      get() {
        return this.$store.state.dialog[name].visible
      },
      set(nextVisible) {
        this.toggleDialog({ name, visible: nextVisible })

        if (nextVisible === false && this.currentRef && this.currentRef.reset) {
          this.currentRef.reset()
        }
        this.currentRef = null
      },
    },
  },

  methods: {
    ...mapActions('dialog', ['toggleDialog']),

    getComponentRef(componentInstance) {
      this.currentRef = componentInstance || null
    },

    hanlderComponentChange(data) {
      this.tempPayload = data
    },

    handleConfirm() {
      this.dialogHub.onConfirm(this.tempPayload, this, this.currentRef)
    },

    handleCancel() {
      this.visible = false
      this.dialogHub.onCancel(this.currentRef)
    },

    handleOpen() {
      this.dialogHub.onOpen()
    },

    handleClose() {
      this.tempPayload = {}
      this.dialogHub.onClose(this.$refs, this.currentRef)
      if (this.dialogHub.closeAuto) {
        this.visible = false
      }
    },
  },
}
</script>
