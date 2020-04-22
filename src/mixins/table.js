import Mutation from '@what-a-faka/obj-mutation'
// import { fetchOptions } from '@/apis/options'
import { allErrors } from '@/utils/errorFormat'
import requests from '@/apis/requests'
import exportCsv from '@/utils/exportCSV'
import { translate } from '@/utils/mappings'
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
            orderType: this.ordering,
            ...params,
          }

          const res = await this.fetchTableListMethod(
            this.filtersMutate.parse(this.filtersCache)
          )
          if (this.$route.name === 'monitorDiskSplit') {
            this.tableList = res.result
          } else {
            this.tableList = res.result.list || []
          }
          if (
            this.$route.name === 'logAccess' ||
            this.$route.name === 'ipList'
          ) {
            if (this.tableList.length > 9) {
              this.tableTotal = 100000
            } else {
              this.tableTotal = 0
            }
          } else {
            this.tableTotal = res.result.total
          }
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
            descending: '',
          }
          this.ordering =
            sort.column && sort.order
              ? `${ordering[sort.order]}${translate(sort.prop, 'ordering')}`
              : ''
        }
        const form = this.$refs.effectForm
          ? this.$refs.effectForm.getForm()
          : this.filters
        const payload = { ...form }
        if (payload.time_date) {
          const startTime = payload.time_date ? payload.time_date[0] : ''
          const endTime = payload.time_date ? payload.time_date[1] : ''
          if (startTime) {
            payload.startTime = startTime
            payload.endTime = endTime
            delete payload.time_date
          }
        }
        this.fetchTableList(payload)
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
