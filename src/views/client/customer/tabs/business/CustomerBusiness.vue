<template>
  <div><BusinessList v-if="customer" :customer="customer"></BusinessList></div>
</template>

<script>
import BusinessList from '../../../business/BusinessList'

export default {
  name: 'CustomerBusiness',

  props: {
    customer: {
      type: Number,
    },
  },

  components: {
    BusinessList: BusinessList,
  },
}
</script>

<style scoped></style>
