<template>
  <div>
    <el-card>
      <el-tabs v-model="activeMoudle">
        <el-tab-pane label="净网配置" name="purifyConfig"></el-tab-pane>
      </el-tabs>
      <components :is="activeMoudle"></components>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeMoudle: 'purifyConfig',
    }
  },
  components: {
    purifyConfig: () => import('./tabs/PurifyConfig/PurifyConfig'),
  },
}
</script>

<style lang="scss"></style>
