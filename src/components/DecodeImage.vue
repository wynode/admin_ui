<template>
  <img
    v-if="noerror"
    ref="decodeImage"
    :src="url"
    alt="加载失败"
    class="DecodeImage"
  />
  <div v-else>加载失败</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DecodeImage',
  props: {
    src: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      noerror: true,
      url: '',
    }
  },

  watch: {
    src: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          if (this.checkEncrypt(newVal)) {
            this.$nextTick(() => {
              this.handleGetImage(newVal)
            })
          } else {
            this.url = newVal
          }
        } else {
          this.noerror = false
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

    async handleGetImage(path) {
      axios
        .get(path, {
          responseType: 'blob',
        })
        .then((res) => {
          const reader = new FileReader()
          reader.onload = () => {
            const fixLength = Number(reader.result)
            const img = this.$refs.decodeImage
            const imgSrc = window.URL.createObjectURL(
              res.data.slice(8 + fixLength, res.data.length)
            )
            img.src = imgSrc || ''
            img.onload = () => {
              window.URL.revokeObjectURL(img.src)
            }
          }
          reader.readAsText(res.data.slice(7, 8))
        })
        .catch(() => {
          this.noerror = false
        })
    },
  },
}
</script>

<style lang="scss">
.DecodeImage {
  display: block;
  width: 100%;
  object-fit: contain;
}
</style>
