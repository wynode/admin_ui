import Mutation from '@what-a-faka/obj-mutation'
// import { fetchOptions } from '@/apis/options'
import { allErrors } from '@/utils/errorFormat'
import requests from '@/apis/requests'
import exportCsv from '@/utils/exportCSV'
/**
 * TODO 需要重构为 interface
 * TODO 需要重新整理请求逻辑
 */
export default ({
  pagerInit = {},
  filtersInit = {},
  filtersMutateInit = new Mutation(),
}) => {
  return {
    data() {
      return {
        pager: { ...pagerInit },
        ordering: '',
        tableList: [],
        tableTotal: 0,
        mixTableLoading: true,
        filters: { ...filtersInit },
        filtersCache: {},
        filtersMutate: filtersMutateInit,
        formItemList: [],
      }
    },

    methods: {
      handleFilter(form) {
        let payload = { ...form }
        try {
          Object.keys(payload).forEach((item) => {
            // 如果筛选项为inputNumberRange的类型，需要填写完整才能查询
            if (item.includes('__range')) {
              const indexOne = payload[item][0]
              const indexTwo = payload[item][1]
              if (!(indexOne && indexTwo) && (indexOne || indexTwo)) {
                throw false
              }
            }
          })
        } catch {
          this.$message.info('请输入完整的范围筛选')
          return
        }
        this.pager = { ...pagerInit }
        this.ordering = ''
        this.fetchTableList(payload)
      },

      async fetchTableList(params = {}) {
        this.mixTableLoading = true
        try {
          this.filtersCache = {
            page: this.pager.page,
            pageSize: this.pager.page_size,
            ...this.filters,
            ordering: this.ordering,
            ...params,
          }
          const res = await this.fetchTableListMethod(
            this.filtersMutate.parse(this.filtersCache)
          )
          this.tableList = res.result.list || []
          this.tableTotal = res.result.total
        } catch (error) {
          allErrors(error.data || error)
        } finally {
          this.mixTableLoading = false
        }
      },

      handleTableChange(pager, sort) {
        if (pager) {
          this.pager.page = pager.page
          this.pager.page_size = pager.page_size
        }
        if (sort) {
          const ordering = {
            ascending: '',
            descending: '-',
          }
          this.ordering =
            sort.column && sort.order
              ? `${ordering[sort.order]}${sort.prop}`
              : ''
        }
        this.fetchTableList(
          this.$refs.effectForm ? this.$refs.effectForm.getForm() : this.filters
        )
      },

      handleSearch(isSaveTime) {
        if (isSaveTime) {
          this.$refs.effectForm
            ? this.$refs.effectForm.resetExceptTimeFormFields()
            : ''
          const form = this.$refs.effectForm.form
          this.fetchTableList({ ...pagerInit, ordering: '', ...form })
        } else {
          this.$refs.effectForm ? this.$refs.effectForm.resetFormFields() : ''
          this.fetchTableList({ ...pagerInit, ordering: '' })
        }
      },

      handleFilterReset() {
        this.filters = { ...filtersInit }
        this.pager = { ...pagerInit }
        this.ordering = ''
        this.fetchTableList()
      },

      handleRegulareFilter(form) {
        this.$refs.effectForm.resetFormFields()
        this.filters.search = form.search || ''
        Object.keys(form)
          .filter((v) => v != 'search')
          .forEach((field) => {
            this.$refs.effectForm.setForm(field, form[field])
          })
        this.pager = { ...pagerInit }
        this.fetchTableList(form)
      },

      // fetchOptions(option) {
      //   // TODO 删除对 formItemList 依赖
      //   return fetchOptions(option).then((res) => {
      //     this.formItemList = res
      //     return res
      //   })
      // },

      async handleExportCSV(url, name) {
        this.$confirm('是否确认导出以下内容？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            requests
              .get(url, { params: this.filtersMutate.parse(this.filtersCache) })
              .then((result) => {
                exportCsv(result, name)
              })
              .catch(() => {
                this.$message.error('导出失败')
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消导出',
            })
          })
      },
    },
  }
}
