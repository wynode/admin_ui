<template>
  <Viewer
    class="Df Flww"
    style="margin-left:-4px;margin-right:-4px;"
    :images="decodeUrls"
    :options="viewerOptions"
  >
    <template slot-scope="scope">
      <div
        v-for="(src, index) in scope.images"
        :key="index"
        class="Mx4 Mt8 Bdrsp Ovh decode_img"
      >
        <el-popover
          v-if="showHover"
          placement="right"
          trigger="hover"
          class="Db Wst Hst"
        >
          <img
            slot="reference"
            :src="src"
            alt="加载失败"
            class="Wst Hst Curp"
            style="object-fit:contain;"
          />
          <img :src="src" alt="加载失败" class="AuditPopverImage" notViewer />
        </el-popover>
        <img
          v-else
          :src="src"
          alt="加载失败"
          class="Wst Hst Curp"
          style="object-fit:contain;"
        />
      </div>
    </template>
  </Viewer>
</template>

<script>
import axios from 'axios'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer/src/component.vue'

export default {
  name: 'DecodeImageList',

  components: {
    Viewer,
  },

  props: {
    urls: {
      type: Array,
      default: () => [],
    },
    limited: {
      type: Number,
      default: 100,
    },
    showHover: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      decodeUrls: [],
    }
  },

  computed: {
    viewerOptions() {
      return {
        filter(img) {
          if (img) {
            return img.getAttribute('notViewer') == null
          }
          return true
        },
      }
    },
  },

  watch: {
    urls: {
      deep: true,
      immediate: true,
      handler(newValue) {
        if (newValue.length) {
          this.decodeUrls = []
          let canUrls = [...this.urls]
          if (this.urls.length > this.limited) {
            canUrls.splice(this.limited)
          }
          canUrls.map((url) => {
            if (this.checkEncrypt(url)) {
              this.handleGetUrl(url)
            } else {
              this.decodeUrls.push(url)
            }
          })
        }
      },
    },
  },

  methods: {
    checkEncrypt(url) {
      // 如果有encrypt后缀, 或者是存在我们服务器的图片，并且什么后缀都没有，那么就需要解密图片
      const hasEncrypt = url.lastIndexOf('.encrypt') > -1
      // let needDecode = false
      // if (url.includes('new-ppb') || url.inclueds('newmedia.qixincha.com')) {
      //   const hasSuffix = url.slice(-6).includes('.')
      //   needDecode = !hasSuffix
      // }
      return hasEncrypt
    },

    // handleGetPreviewList(url) {
    //   const index = this.decodeUrls.indexOf(url)
    //   if (index != -1) {
    //     const pre = this.decodeUrls.slice(0, index)
    //     const next = this.decodeUrls.slice(index, this.decodeUrls.length)
    //     const result = next.concat(pre.reverse())
    //     return result
    //   }
    //   return this.decodeUrls
    // },

    async handleGetUrl(path) {
      axios
        .get(path, {
          responseType: 'blob',
        })
        .then((res) => {
          const reader = new FileReader()
          reader.onload = () => {
            const fixLength = Number(reader.result)
            const result = window.URL.createObjectURL(
              res.data.slice(8 + fixLength, res.data.length)
            )
            this.decodeUrls.push(result)
          }
          reader.readAsText(res.data.slice(7, 8))
        })
    },
  },
}
</script>

<style lang="scss">
.decode_img {
  width: 128px;
  height: 128px;
  background: #f5f7fa;
}
</style>
