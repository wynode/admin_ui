<template>
  <div class="base_setting">
    <el-card>
      <!-- <div v-for="item in 123" :key="item"></div> -->
      <el-form ref="form" :model="form" label-width="auto">
        <div v-for="(value, key, index) in baseList" :key="key" class="Mb40">
          <p class="base_title">{{ key | translate('baseSetting') }}</p>
          <el-form-item
            v-for="(deepvalue, deepkey, deepindex) in value"
            :label="`${showAcckey(deepkey)}：`"
            :key="deepkey"
          >
            <el-input
              v-model="form[deepkey]"
              v-if="showEdit[index * 5 + deepindex]"
            ></el-input>
            <p v-else>{{ deepvalue }}</p>
            <div v-if="showEdit[index * 5 + deepindex]" class="base_btng">
              <el-button
                type="primary"
                size="small"
                @click="handleSubmit(key, deepkey, index * 5 + deepindex)"
              >
                确认
              </el-button>
              <el-button
                size="small"
                @click="handleSwitch(index * 5 + deepindex, false)"
              >
                取消
              </el-button>
            </div>
            <el-button
              type="primary"
              size="small"
              v-else
              @click="handleSwitch(index * 5 + deepindex, true, key, deepkey)"
            >
              修改
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { fetchBaseSetting, patchBaseSetting } from '@/apis/all'

export default {
  data() {
    return {
      showEdit: [false],
      form: {
        MAX_QPS1: '',
        TEMP_BLACK_TIME1: '',
        CONTINUE_TIME: '',
        POST_CHECK: '',
        QPS: '',
        TEMP_BLACK_TIME: '',
        MAX_QPS: '',
        PROXY_IP_COLUMN_NAME: '',
      },
      baseList: {
        DDOS: {},
        BLACK_IP: {},
        UUID: {},
        SYSTEM: {},
      },
    }
  },
  methods: {
    handleSwitch(index, value, key, deepkey) {
      this.$set(this.showEdit, index, value)
      this.form[deepkey] = this.baseList[key][deepkey]
    },

    handleSubmit(key, deepkey, index) {
      let tempDeepkey = deepkey
      if (deepkey == 'MAX_QPS1') {
        tempDeepkey = 'MAX_QPS'
      } else if (deepkey == 'TEMP_BLACK_TIME1') {
        tempDeepkey = 'TEMP_BLACK_TIME'
      }
      patchBaseSetting({
        type: key,
        key: tempDeepkey,
        value: this.form[deepkey],
      }).then((data) => {
        if (data.code == 200) {
          this.$message.success('修改成功')
          this.fetchBaseSettingFn()
          this.handleSwitch(index, false)
        }
      })
    },

    showAcckey(key) {
      if (key == 'MAX_QPS1') {
        return 'MAX_QPS'
      } else if (key == 'TEMP_BLACK_TIME1') {
        return 'TEMP_BLACK_TIME'
      }
      return key
    },
    fetchBaseSettingFn() {
      fetchBaseSetting().then((data) => {
        Object.keys(data.result || {}).forEach((item) => {
          if (item != 'LOG') {
            if (item == 'DDOS') {
              this.baseList[item]['MAX_QPS1'] = data.result[item]['MAX_QPS']
              this.baseList[item]['TEMP_BLACK_TIME1'] =
                data.result[item]['TEMP_BLACK_TIME']
            } else {
              this.baseList[item] = data.result[item]
            }
            // Object.keys(data.result[item]).forEach((v) => {
            //   this.form[v] = data.result[item][v]
            // })
          }
        })
        Object.keys(this.baseList).forEach((item) => {
          Object.keys(this.baseList[item]).forEach((key) => {
            this.form[key] = this.baseList[item][key]
          })
        })
      })
    },
  },

  mounted() {
    this.fetchBaseSettingFn()
  },
}
</script>

<style lang="scss">
.base_setting {
  .base_title {
    font-size: 20px;
    margin: 10px;
  }
  .el-form {
    max-width: 800px;
  }
  .el-form-item {
    margin-left: 80px;
  }
  .el-form-item__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .base_btng {
    display: flex;
    align-items: center;
    margin-left: 40px;
  }
}
</style>
