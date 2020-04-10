<template>
  <div class="gb_wrap">
    <el-card class="Mb24">
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="关键词"
          @keyup.enter.native="handleSearch"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch"
          ></el-button>
        </el-input>
      </div>

      <regular-filter
        ref="keywordsadminview"
        :form-ref="$refs.effectForm"
        v-bind="regularConfig"
        :search="filters.search"
        @change="handleRegulareFilter"
      ></regular-filter>

      <EffectForm
        ref="effectForm"
        inline
        size="small"
        label-position="top"
        cancelText="重置"
        @submit="handleFilter"
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
        class="Mb20 Mr20"
        @click="newKeyword"
      >
        新建
      </el-button>
      <el-button size="small" type="primary" @click="handleImport">
        导入
      </el-button>

      <el-button size="small" type="primary">
        <a
          href="https://new-ppb-1251001081.cos.ap-chengdu.myqcloud.com/关键词导入模板.xls"
        >
          模板链接
        </a>
      </el-button>

      <el-button
        size="small"
        type="danger"
        class="Mb20"
        @click="checkSelection() && handleBatchDelete()"
      >
        批量删除
      </el-button>

      <Txcel
        ref="table"
        v-loading="mixTableLoading"
        class="Txcel"
        :data="tableList"
        :columns="questionCols"
        :rowSelection="{ onChange: handleSelectionChange }"
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
import RegularFilter from '@/components/regular_filter'
import debounce from 'lodash/debounce'
import table from '@/mixins/table'
import { errorFormat } from '@/utils/errorFormat'
import {
  fetchkeywordsList,
  importkeywordsList,
  postKeyword,
  patchKeyword,
  deleteKeyword,
  fetchKeywordCommonStat,
  batchDelete,
} from '@/apis/keywords'
import { fetchOptions } from '@/apis/options'
import { pureCols } from './tableConfig'
import { filterFields, filtersMutateInit } from './formConfig'
import EditorForm from './editForm.vue'
import { fetchManagers } from '@/apis/manager'

const DELAY_TIME = 500

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
  name: 'Keyword',

  mixins: [tableMixins],

  data() {
    return {
      kw_categoryOpt: [],
      formError: {},
      managerOpts: [],
      regularConfig: {
        appName: 'keywordsadminview',
        mutate: filtersMutateInit,
        appStstc: fetchKeywordCommonStat,
      },
      selectedIds: [],
    }
  },

  components: {
    RegularFilter,
  },

  computed: {
    fetchTableListMethod() {
      return fetchkeywordsList
    },

    questionCols() {
      return pureCols(this)
    },

    filterFields() {
      return filterFields(this)
    },
  },

  methods: {
    checkSelection() {
      if (this.selectedIds.length <= 0) {
        this.$notify.info('请勾选员工')
        return false
      }
      return true
    },

    handleSelectionChange(selected) {
      this.selectedIds = selected.map((item) => item.id)
    },

    handleBatchDelete() {
      this.$confirm('确认批量删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          batchDelete({
            ids: this.selectedIds,
          })
            .then(() => {
              this.$message.success('批量删除成功')
              this.fetchTableList(this.filtersCache)
              this.fetch_options()
            })
            .catch((error) => {
              this.$message.error(error.data ? error.data[0] : '批量删除失败')
            })
        })
        .catch(() => {
          this.$message.info('已取消批量删除')
        })
    },

    async handlePurifyConfigAdded(dialog, effectForm) {
      const { form, useValidator } = effectForm
      try {
        if (await useValidator()) {
          await postKeyword(form)
          this.$notify.success('新建成功')
          this.pager = { ...pagerInit }
          this.fetchTableList()
          this.fetch_options()

          dialog.close()
        }
      } catch (error) {
        const errors = errorFormat(error.data || error)
        effectForm.setFieldError(errors)
      }
    },

    async handlePurifyConfigUpdated(dialog, effectForm, row) {
      const { form, useValidator } = effectForm
      try {
        if (await useValidator()) {
          await patchKeyword(row.id, form)
          this.$notify.success('修改成功')
          this.pager = { ...pagerInit }
          this.fetchTableList()
          this.fetch_options()

          dialog.close()
        }
      } catch (error) {
        const errors = errorFormat(error.data || error)
        effectForm.setFieldError(errors)
      }
    },

    newKeyword() {
      this.$createDialog(
        {
          title: '新增净网类型',
          onSubmit: debounce((dialog, formRef) => {
            this.handlePurifyConfigAdded(dialog, formRef.$refs.effectForm)
          }, 500),
        },
        () => <EditorForm />
      ).show()
    },

    modifyKeyword(row) {
      this.$createDialog(
        {
          title: '编辑净网类型',
          onSubmit: debounce((dialog, formRef) => {
            this.handlePurifyConfigUpdated(
              dialog,
              formRef.$refs.effectForm,
              row
            )
          }, 500),
        },
        () => <EditorForm meta={row} />
      ).show()
    },
    // 删除
    deleteKeyword(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteKeyword(row.id)
            .then(() => {
              this.$message.success('删除成功')
              this.fetchTableList(this.filtersCache)
              this.fetch_options()
            })
            .catch((error) => {
              this.$message.error(error.data ? error.data[0] : '删除失败')
            })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },

    // 导入
    handleImport: debounce(async function handleImport() {
      const el = document.createElement('input')
      el.type = 'file'
      el.onchange = async (event) => {
        const file = event.target.files[0]
        if (file) {
          if (!file.name.endsWith('xls')) {
            this.$notify.error('文件类型不匹配')
            return
          }
          const formData = new FormData()
          formData.append('upload_file', file)

          const res = this.$message({
            showClose: true,
            message: '导入操作耗时较长, 请耐心等待!',
            type: 'success',
          })

          await importkeywordsList(formData, {
            headers: {
              'Content-Type': 'h/form-data',
            },
          })
          this.pager.page = 1
          this.fetchTableList()
          this.fetch_options()
          res.close()
        }
      }
      el.click()
    }, DELAY_TIME),

    fetch_options() {
      fetchOptions('kw_category').then((data) => {
        this.kw_categoryOpt = data[0] || []
      })
    },
  },

  mounted() {
    this.fetchTableList()
    this.fetch_options()

    fetchManagers({ page_size: 99999 }).then((data) => {
      const managers = data.results || []
      this.managerOpts = managers.map((m) => ({
        label: m.staff_name,
        value: m.staff_id,
      }))
    })
  },
}
</script>
