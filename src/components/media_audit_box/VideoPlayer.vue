<template>
  <div ref="videoPlayer"></div>
</template>

<script>
import Chimee from 'chimee-player'
import flv from 'chimee-kernel-flv'
import hls from 'chimee-kernel-hls'
import chimeePluginControlbar from 'chimee-plugin-controlbar'
import chimeePluginCenterState from 'chimee-plugin-center-state'

const playerConfig = {
  controls: true,
  autoplay: false,
  preload: 'metadata',
  kernels: {
    flv,
    hls,
  },
  plugin: [
    chimeePluginCenterState.name,
    {
      name: chimeePluginControlbar.name,
      children: {
        play: {},
        progressBar: {},
        progressTime: {},
        volume: {},
        screen: {},
        playbackrate: {
          list: [
            { name: '0.5倍速', value: 0.5 },
            { name: '1倍速', value: 1, default: true },
            { name: '1.5倍速', value: 1.5 },
            { name: '2倍速', value: 2 },
          ],
        },
      },
    },
  ],
}

export default {
  name: 'VideoPlayer',

  props: {
    src: String,
  },

  watch: {
    src: {
      immediate: true,
      handler(newVal) {
        if (this.player) {
          this.player.load(newVal)
        }
      },
    },
  },

  mounted() {
    this.player = new Chimee({
      ...playerConfig,
      wrapper: this.$refs.videoPlayer,
      src: this.src,
    })
  },
}
</script>

<style lang="scss">
.player_container {
  .small {
    chimee-volume {
      display: none;
    }
    chimee-progresstime {
      display: none;
    }
    chimee-screen {
      display: none;
    }
    chimee-playbackrate {
      padding-left: 0;
      font-size: 14px;
      chimee-playbackrate-list {
        bottom: 0.2em;
      }
      ul {
        line-height: 1.5em;
        padding: 0.2em 0;
      }
    }
    chimee-control-wrap {
      bottom: 0 !important;
    }
    chimee-control {
      visibility: visible;
    }
  }
}
</style>
