<template>
  <div>
    <el-card>
      <div class="up_top">
        <div class="up_top_line1">
          <p class="Mr56">
            姓名：
            <span>{{ userProfileData.name }}</span>
          </p>
          <p class="Ml56">
            岗位名称：
            <span>{{ userProfileData.position }}</span>
          </p>
        </div>
        <div class="up_top_line2">
          所在部门：
          <span>{{ userProfileData.department_cn }}</span>
        </div>
      </div>
    </el-card>

    <el-card class="box-card Mt24">
      <el-tabs v-model="activeMoudle">
        <!-- <el-tab-pane label="成就信息" name="achievement"></el-tab-pane> -->
        <el-tab-pane label="冲关数据" name="checkpoint"></el-tab-pane>
        <el-tab-pane label="净网数据" name="purify"></el-tab-pane>
        <el-tab-pane label="能力矩阵" name="radar"></el-tab-pane>
      </el-tabs>
      <components :is="activeMoudle"></components>
    </el-card>
  </div>
</template>

<script>
import { fetchUserProfileById } from '@/apis/users.js'

export default {
  components: {
    achievement: () => import('./tabs/Achievement'),
    checkpoint: () => import('./tabs/CheckPointData'),
    purify: () => import('./tabs/PurifyData'),
    radar: () => import('./tabs/RadarData'),
  },

  data() {
    return {
      activeMoudle: 'checkpoint',
      userProfileData: {},
    }
  },

  mounted() {
    const { id } = this.$route.params
    fetchUserProfileById(id).then((data) => {
      this.userProfileData = data
    })
  },
}
</script>

<style lang="scss">
.up_top {
  .up_top_line1 {
    display: flex;
  }
  .up_top_line2 {
    margin-top: 16px;
  }
}
</style>
