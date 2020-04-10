<template>
  <div class="Upload" style="overflow:hidden">
    <!-- 单张图片 -->

    <el-upload
      class="avatar-uploader avatar-img f_fl"
      :action="uploadUrl"
      ref="uploadImg"
      :headers="headers"
      :show-file-list="false"
      name="upload_file"
      :disabled="disabled"
      v-if="this.type === 'img'"
      :on-success="handleSuccess"
      :before-upload="handleLimitSize"
      :style="`height: ${value ? 0 : ''}`"
    >
      <el-row type="flex" justify="start" align="top">
        <el-button
          v-if="!value"
          type="primary"
          style="max-height:32px"
          :disabled="disabled"
          :loading="loading"
          size="mini"
        >
          <span class="avatar-uploader-icon">点击上传</span>
        </el-button>
      </el-row>
    </el-upload>

    <!-- 文件类型 -->

    <el-upload
      class="avatar-uploader avatar-img f_fl"
      :action="uploadUrl"
      ref="uploadImg"
      :headers="headers"
      :show-file-list="false"
      name="upload_file"
      :disabled="disabled"
      v-else-if="this.type === 'file'"
      :on-success="handleSuccess"
      :before-upload="handleLimitSize"
    >
      <el-row type="flex" justify="start" align="top">
        <el-button
          v-if="!value"
          type="primary"
          style="max-height:32px"
          :disabled="disabled"
          :loading="loading"
        >
          <span class="avatar-uploader-icon">点击上传</span>
        </el-button>
      </el-row>
    </el-upload>

    <!-- 多张图片类型 -->

    <el-upload
      ref="upload"
      :action="uploadUrl"
      :headers="headers"
      name="upload_file"
      v-loading="loading"
      v-else
      :on-success="handleSuccess"
      :before-upload="handleLimitSize"
      :on-remove="handleRemove"
      drag
      list-type="picture"
      :file-list="fileList"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        <h5>将文件拖拽到这里上传</h5>
        <!-- <h5>Ctrl+V只支持扩展名：.pdf .ppt .pptx</h5> -->
      </div>
      <div class="el-upload__tip" slot="tip">上传文件不超过50MB</div>
    </el-upload>

    <!-- 图片预览和文件预览 -->

    <div>
      <el-button
        v-if="value"
        type="danger"
        style="max-height:32px;"
        @click="handleRemove1"
        size="mini"
      >
        {{ deleteText }}
      </el-button>
    </div>
    <div class="Mb10">
      <div v-if="this.type === 'file' && value">
        <a :href="`/file-check?file=${value}`" target="blank">{{ rawName }}</a>
      </div>
    </div>
    <div class="Mb10">
      <DecodeImage v-if="this.type === 'img' && value" :src="value" />
    </div>
  </div>
</template>

<script>
import { UPLOAD_URL, AUTH_TOKEN } from '@/config'

export default {
  props: {
    fileList: Array,
    type: String,
    targetUrl: String,
    fileTypes: {
      type: [Array, String],
      default: () => ['jpg', 'png'],
    },
    value: String,
    disabled: Boolean,
    deleteText: {
      type: String,
      default: '删除图片',
    },
    noCtrlV: {
      type: Boolean,
      default: false,
    },
    xselector: {
      type: String,
      default: '',
    }, // NOTE 传入之后会根据dialog是否显示而取消Ctrl V的功能，如果不传入，默认Ctrl V功能打开
  },

  computed: {
    uploadUrl() {
      return this.targetUrl || UPLOAD_URL
    },

    headers() {
      const token = localStorage.getItem(AUTH_TOKEN)
      return {
        Authorization: `JWT ${JSON.parse(token)}`,
      }
    },
  },

  data() {
    const filename = this.value ? this.value.split('/') : []
    return {
      loading: false,
      pdfName: filename ? filename[filename.length - 1] : '',
      rawName: '',
    }
  },

  methods: {
    handleRemove1() {
      this.$emit('input', '')
    },

    handleRemove(file) {
      this.$emit(
        'update:fileList',
        this.fileList.filter((e) => e.url !== file.url)
      )
    },

    handleBeforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    handleSuccess(res) {
      if (this.type === 'img' || this.type === 'file') {
        this.$emit('input', res.preview_url)
        this.pdfName = res.file_url.substring(1)
      } else {
        this.$emit('update:fileList', [
          ...this.fileList,
          {
            name: res.file_url.substring(1),
            url: res.preview_url,
          },
        ])
        this.pdfName = res.file_url.substring(1)
      }
      this.loading = false
    },

    handleLimit(file) {
      if (!file) {
        return false
      }
      const isLt3M = file.size / 1024 / 1024 < 100

      if (isLt3M) {
        this.loading = true
        return true
      }
      this.$message.error('文件大小不能超过 100MB')
      return false
    },

    registerPaste() {
      document.addEventListener('paste', this.hanldeClipBoard, false)
    },

    destroyPaste() {
      document.removeEventListener('paste', this.hanldeClipBoard, false)
    },

    /**
     * 监听系统剪贴板，可以将图片直接复制过来
     * TODO 补测试用例
     */
    hanldeClipBoard(e) {
      if (this.xselector) {
        const el = document.querySelector(this.xselector)
        if (el && el.style.display === 'none') {
          return undefined
        }
      }
      const clipboard = e.clipboardData
      if (!clipboard.items || !clipboard.items.length) {
        return undefined
      }
      if (this.value.length >= 1) {
        // this.$message.error('超过最大上传数量')
        return undefined
      }
      let cacheData = null
      let imageFile = null
      clipboard.types.forEach((type, index) => {
        if (type === 'Files') {
          cacheData = clipboard.items[index]
        }
      })
      if (!cacheData) {
        return undefined
      }
      imageFile = cacheData.getAsFile()
      if (this.handleLimit(imageFile)) {
        if (this.type === 'img' || this.type === 'file') {
          this.$refs.uploadImg.handleStart(imageFile)
          return this.$refs.uploadImg.submit()
        } else {
          this.$refs.upload.handleStart(imageFile)
          this.$refs.upload.submit()
        }
      }

      return imageFile
    },

    handleLimitSize(file) {
      let fileName = this.suffixFun(file.name)
      fileName = fileName.length ? fileName[fileName.length - 1] : ''
      if (!this.fileTypes.includes(fileName)) {
        this.$message.error(`文件只能是 ${this.fileTypes.join('、')} 格式`)
        return false
      }

      this.rawName = file.name

      return this.handleLimit(file)
    },

    suffixFun(o) {
      return o ? o.split('.') : ''
    },
  },

  created() {
    if (!this.noCtrlV) {
      this.registerPaste()
    }
  },

  beforeDestroy() {
    if (!this.noCtrlV) {
      this.destroyPaste()
    }
  },
}
</script>

<style lang="scss">
.Upload {
  .el-upload__text {
    width: 100%;
  }

  .el-upload-dragger {
    margin: auto;
  }

  .upload_signal_pic {
    cursor: pointer;
    max-width: 100%;
  }

  .el-upload-dragger .el-upload__text {
    line-height: 24px;
  }

  .el-upload-dragger {
    height: 140px;

    .el-icon-upload {
      margin: 20px auto 0;
    }
  }

  .el-upload__tip {
    margin-top: 0;
    line-height: 12px;
  }
}
</style>
