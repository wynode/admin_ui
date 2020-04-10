<template>
  <div>
    <PureConfig v-if="customer" :customer="customer"></PureConfig>
  </div>
</template>

<script>
import PureConfig from '../../../../purification/pure_config/PureConfig'

export default {
  name: 'CustomerPurification',

  props: {
    customer: {
      type: Number,
    },
  },

  components: {
    PureConfig: PureConfig,
  },
}
</script>

<style scoped></style>
