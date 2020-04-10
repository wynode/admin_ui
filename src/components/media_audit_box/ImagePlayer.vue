<template>
  <Viewer :images="urls" class="Wst Hst" :options="viewerOptions">
    <template slot-scope="scope">
      <el-popover
        v-for="src in scope.images"
        :key="src"
        trigger="hover"
        placement="right"
      >
        <DecodeImage :src="src" class="Wst Hst AuditPopverImage" notViewer />
        <DecodeImage slot="reference" :src="src" class="Wst Hst" />
      </el-popover>
    </template>
  </Viewer>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer/src/component.vue'
import DecodeImage from '@/components/DecodeImage.vue'

export default {
  name: 'ImagePlayer',

  components: {
    Viewer,
    DecodeImage,
  },

  props: {
    urls: {
      type: Array,
      default: () => [],
    },
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
}
</script>
