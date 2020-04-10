<template>
  <div class="Df Fldc Posr Px20 Bgcl4">
    <div class="Fxfxd Py20">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in items" :key="item">
          {{ item }}
        </el-breadcrumb-item>
      </el-breadcrumb>

      <h2 class="Mt16 Fz20 Fwb">{{ title }}</h2>

      <slot>
        <div v-if="description" class="Mt16">{{ description }}</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBoard',

  props: {
    title: String,
    items: {
      type: Array,
      default: () => [],
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>
