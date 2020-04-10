<template>
  <Txcel
    ref="table"
    class="Txcel"
    :data="relatedLessons"
    :columns="rowCols"
    :pager="{
      layout: '',
    }"
  />
</template>

<script>
import table from '@/mixins/table'
import { rowCols } from './tableConfig'
import VideoPlayer from '@/components/media_audit_box/VideoPlayer.vue'

const pagerInit = {
  page: 1,
  page_size: 100,
}

const tableMixins = table({
  pagerInit,
})
export default {
  name: 'RelatedLessons',

  mixins: [tableMixins],

  props: {
    relatedLessons: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    rowCols() {
      return rowCols(this)
    },
  },

  methods: {
    // 播放视频
    playVideo(name, url) {
      this.$createDialog(
        {
          title: name,
          footer: false,
        },
        () => {
          return <VideoPlayer src={url} />
        }
      ).show()
    },
  },
}
</script>
