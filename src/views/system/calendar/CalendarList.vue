<template>
  <div>
    <el-card class="Mb24">
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="标题"
          @keyup.enter.native="handleSearch"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch"
          ></el-button>
        </el-input>
      </div>

      <EffectForm
        ref="effectForm"
        inline
        size="small"
        label-position="top"
        cancelText="重置"
        @submit="handleSearchFilter"
        @cancel="handleFilterReset"
      >
        <EffectFormField
          v-for="field in filterFields"
          v-bind="field"
          :key="field.name"
        />
      </EffectForm>
    </el-card>

    <el-card>
      <el-button
        size="small"
        type="primary"
        class="Mb20"
        @click="handleCreateCalendar"
      >
        新增事件
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
  fetchCalendar,
  postCalendar,
  patchCalendar,
  deleteCalendar,
} from '@/apis/system'
import { rowCols } from './tableConfig'
import { filterFields, filtersMutateInit } from './formConfig'
import EditCalendar from './EditCalendar'
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
  name: 'CalendarList',

  mixins: [tableMixins],

  computed: {
    fetchTableListMethod() {
      return fetchCalendar
    },

    filterFields() {
      return filterFields(this)
    },

    rowCols() {
      return rowCols(this)
    },
  },

  methods: {
    // 处理搜索过滤
    handleSearchFilter(form) {
      if (form.month_day) {
        let monthDay = form.month_day.split('-') || [null, null]
        form.date__mont = parseInt(monthDay[0])
        form.date__day = parseInt(monthDay[1])
      }
      this.handleFilter(form)
    },

    // 新建事件
    async postCreateCalendar(instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            const form = slotRef.$refs.effectForm.getForm()
            await postCalendar({ ...form })
            this.$notify.success('新建事件成功!')
            this.pager = { ...pagerInit }
            this.fetchTableList(this.filtersCache)
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
        this.$notify.error(error.data.msg || '新建失败!')
      }
    },
    async handleCreateCalendar() {
      this.$createDialog(
        {
          title: '新建事件',
          onSubmit: debounce(async (instance, slotRef) => {
            this.postCreateCalendar(instance, slotRef)
          }, 200),
        },
        () => <EditCalendar />
      ).show()
    },

    // 编辑事件
    async patchEditCalendar(row, instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            const form = slotRef.$refs.effectForm.getForm()
            await patchCalendar(row.id, { ...form })
            this.$notify.success('编辑事件成功!')
            this.pager = { ...pagerInit }
            this.fetchTableList(this.filtersCache)
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },
    handleEditCalendar(row) {
      this.$createDialog(
        {
          title: '编辑事件',
          onSubmit: debounce(async (instance, slotRef) => {
            this.patchEditCalendar(row, instance, slotRef)
          }, 200),
        },
        () => <EditCalendar meta={row} />
      ).show()
    },

    // 删除事件
    async handleDeleteCalendar(row) {
      const ifDel = await this.$confirm('确定要删除事件吗', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch(() => {
        this.$notify.info('操作已取消')
        return false
      })

      if (ifDel) {
        await deleteCalendar(row.id)
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

<style lang="scss">
.cl_date_picker_popper {
  .el-date-picker__header-label {
    &:nth-of-type(1) {
      display: none;
    }
  }
}
</style>
