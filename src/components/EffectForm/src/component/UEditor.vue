<template>
  <div id="app">
    <vue-ueditor-wrap
      v-model="htmlForEditor"
      :config="myConfig"
      style="line-height: 1"
    ></vue-ueditor-wrap>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
import { SERVER_API } from '@/config'

export default {
  components: {
    VueUeditorWrap,
  },
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      htmlForEditor: this.value,
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 340,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: SERVER_API + '/ueditor/',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/ueditor/',
      },
    }
  },
  watch: {
    htmlForEditor(nextVal) {
      this.$emit('input', nextVal)
      this.$emit('on-change')
    },
    value() {
      this.htmlForEditor = this.value
    },
  },
}
</script>
