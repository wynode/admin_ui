<template>
  <div class="gb_wrap">
    <el-card>
      <el-button
        size="small"
        type="primary"
        class="Mb20"
        @click="handleCreateCategory"
      >
        新建分类
      </el-button>

      <Txcel
        ref="table"
        v-loading="mixTableLoading"
        class="Txcel"
        :data="tableList"
        :columns="rowCols"
        :pager="{
          page: pager.page,
          page_size: pager.page_size,
          layout: 'total,prev,pager,next,jumper',
          total: tableTotal,
        }"
        @change="handleTableChange"
      />
    </el-card>
  </div>
</template>

<script>
import table from '@/mixins/table'
import {
  fetchCategory,
  postCategory,
  patchCategory,
  deleteCategory,
} from '@/apis/training'
import { rowCols } from './tableConfig'
import { filtersMutateInit } from './formConfig'
import EditCategory from './EditCategory'
import debounce from 'lodash/debounce'
import { errorFormat } from '@/utils/errorFormat'

const pagerInit = {
  page: 1,
  page_size: 10,
}

const tableMixins = table({
  pagerInit,
  filtersInit: { search: '' },
  filtersMutateInit,
})

export default {
  name: 'CategoryList',

  mixins: [tableMixins],

  data() {
    return {
      dialogAttrs: {},
      dialogEvents: {},
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchCategory
    },

    rowCols() {
      return rowCols(this)
    },
  },

  methods: {
    // 新建分类
    async handleCreateCategory() {
      this.$createDialog(
        {
          title: '新建分类',
          width: '700px',
          onSubmit: debounce(async (instance, slotRef) => {
            try {
              if (slotRef.$refs.effectForm) {
                const { effectForm } = slotRef.$refs
                if (await effectForm.useValidator()) {
                  const form = slotRef.$refs.effectForm.getForm()
                  await postCategory({ ...form })
                  this.$notify.success('新建分类成功!')
                  this.pager = { ...pagerInit }
                  this.fetchTableList(this.filtersCache)
                  instance.close()
                }
              }
            } catch (error) {
              errorFormat(error.data)
            }
          }, 200),
        },
        () => <EditCategory />
      ).show()
    },

    // 编辑分类
    handleEditCategory(row) {
      this.$createDialog(
        {
          title: '编辑分类',
          width: '700px',
          onSubmit: debounce(async (instance, slotRef) => {
            try {
              if (slotRef.$refs.effectForm) {
                const { effectForm } = slotRef.$refs
                if (await effectForm.useValidator()) {
                  const form = slotRef.$refs.effectForm.getForm()
                  await patchCategory(row.id, { ...form })
                  this.$notify.success('编辑分类成功!')
                  this.pager = { ...pagerInit }
                  this.fetchTableList(this.filtersCache)
                  instance.close()
                }
              }
            } catch (error) {
              errorFormat(error.data)
              this.$notify.error(error.data.msg || '修改失败')
            }
          }, 200),
        },
        () => <EditCategory meta={row} />
      ).show()
    },

    async handleDeleteCategory(row) {
      const ifDel = await this.$confirm('确定要删除分类吗', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch(() => {
        this.$notify.info('操作已取消')
        return false
      })

      if (ifDel) {
        await deleteCategory(row.id)
        this.$message.success('删除成功')
        this.fetchTableList(this.filtersCache)
      }
    },
  },

  mounted() {
    this.fetchTableList()
  },
}
</script>
