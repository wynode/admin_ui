<template>
  <el-card>
    <div class="Mb24">
      <el-button size="small" type="primary" @click="newGenius">
        新增段位
      </el-button>
    </div>

    <Txcel
      v-loading="mixTableLoading"
      element-loading-text="数据加载中"
      class="Txcel"
      :data="tableList"
      :columns="geniusCols"
      :pager="false"
    />
  </el-card>
</template>

<script>
import debounce from 'lodash/debounce'
import {
  fetchGeniusSetting,
  postGeniusSetting,
  patchGeniusSetting,
  deleteGeniusSetting,
} from '@/apis/fame'
import tableMixins from '@/mixins/table'
import { allErrors, errorFormat } from '@/utils/errorFormat'
import { geniusCols } from './tableConfig'
import GeniusForm from './GeniusForm.vue'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 1000 },
})

export default {
  name: 'Genius',

  mixins: [table],

  computed: {
    fetchTableListMethod() {
      return fetchGeniusSetting
    },

    geniusCols() {
      return geniusCols(this)
    },
  },

  methods: {
    async handleNewGenius(instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          await postGeniusSetting(slotRef.$refs.effectForm.getForm())
          this.$notify.success('新增成功')
          this.fetchTableList()
          instance.close()
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },

    async handleModifyGenius(row, instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          await patchGeniusSetting(row.id, slotRef.$refs.effectForm.getForm())
          this.$notify.success('修改成功')
          this.fetchTableList()
          instance.close()
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },

    newGenius() {
      this.$createDialog(
        {
          title: '新增段位',
          onSubmit: debounce(async (instance, slotRef) => {
            this.handleNewGenius(instance, slotRef)
          }, 200),
        },
        () => <GeniusForm />
      ).show()
    },

    modifyGenius(row) {
      const effects = (subscribe) => {
        subscribe('onFieldInit', (fields, form) => {
          Object.keys(form.fields).forEach((fieldName) => {
            form.setForm(fieldName, row[fieldName])
          })
        })
      }

      this.$createDialog(
        {
          title: '修改段位',
          onSubmit: debounce(async (instance, slotRef) => {
            this.handleModifyGenius(row, instance, slotRef)
          }, 200),
        },
        () => <GeniusForm ref="modifyForm" effects={effects} />
      ).show()
    },

    async delGenius(row) {
      const ifDel = await this.$confirm('请确认此删除操作, 是否继续?', '提示', {
        type: 'warning',
      }).catch(() => {
        this.$notify.info('操作取消')
        return false
      })

      if (ifDel) {
        try {
          await deleteGeniusSetting(row.id)
          this.$notify.success('删除成功')
          this.fetchTableList()
        } catch (error) {
          allErrors(error.data || error)
        }
      }
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>

<style lang="scss">
.MaxW {
  img {
    max-width: 100px;
  }
}
</style>
