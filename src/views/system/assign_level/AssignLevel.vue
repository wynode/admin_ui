<template>
  <div>
    <el-card>
      <div class="Mb24">
        <el-button size="small" type="primary" @click="newAssignLevel">
          新增领单等级
        </el-button>
      </div>

      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="assignLevelCols"
        :pager="{
          layout: 'total,prev,pager,next,jumper',
          page: pager.page,
          page_size: pager.page_size,
          total: tableTotal,
        }"
        @change="handleTableChange"
      />
    </el-card>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import {
  fetchAssignLevel,
  postAssignLevel,
  patchAssignLevel,
  deleteAssignLevel,
} from '@/apis/system'
import tableMixins from '@/mixins/table'
import { allErrors, errorFormat } from '@/utils/errorFormat'
import { assignLevelCols } from './tableConfig'
import AssignLevelForm from './AssignLevelForm.vue'

const pagerInit = {
  page: 1,
  page_size: 10,
}

const table = tableMixins({
  pagerInit,
})

export default {
  name: 'Banner',

  mixins: [table],

  computed: {
    fetchTableListMethod() {
      return fetchAssignLevel
    },

    assignLevelCols() {
      return assignLevelCols(this)
    },
  },

  methods: {
    async handleNewAssignLevel(instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            const form = slotRef.$refs.effectForm.getForm()
            await postAssignLevel(form)
            this.$notify.success('新增成功')
            this.pager = { ...pagerInit }
            this.fetchTableList()
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },

    async handleModifyBanner(row, instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            const form = slotRef.$refs.effectForm.getForm()
            await patchAssignLevel(row.id, form)
            this.$notify.success('修改成功')
            this.fetchTableList(this.filtersCache)
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },

    newAssignLevel() {
      this.$createDialog(
        {
          title: '新增领单等级',
          onSubmit: debounce(async (instance, slotRef) => {
            this.handleNewAssignLevel(instance, slotRef)
          }, 200),
        },
        () => <AssignLevelForm />
      ).show()
    },

    modifyAssignLevel(row) {
      const effects = (subscribe) => {
        subscribe('onFieldInit', (fields, form) => {
          Object.keys(form.fields).forEach((fieldName) => {
            form.setForm(fieldName, row[fieldName])
          })
        })
      }

      this.$createDialog(
        {
          title: '编辑领单等级',
          onSubmit: debounce(async (instance, slotRef) => {
            this.handleModifyBanner(row, instance, slotRef)
          }, 200),
        },
        () => <AssignLevelForm effects={effects} />
      ).show()
    },

    async delAssignLevel(row) {
      const ifDel = await this.$confirm('请确认此删除操作, 是否继续?', '提示', {
        type: 'warning',
      }).catch(() => {
        this.$notify.info('操作取消')
        return false
      })

      if (ifDel) {
        try {
          await deleteAssignLevel(row.id)
          this.$notify.success('删除成功')
          this.fetchTableList(this.filtersCache)
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

<style></style>
