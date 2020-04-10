<template>
  <div>
    <el-card>
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="净网内容、内容ID"
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
        ref="practiceauditorderadminview"
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

    <el-card class="Mt24">
      <div class="Mb16">
        <el-button size="small" type="primary" @click="handleExport">
          导出
        </el-button>
        <el-button size="small" type="primary" @click="handleImport">
          导入
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click="checkSelection() && handleEditContentStatus()"
        >
          修改内容状态
        </el-button>
        <el-button size="small" type="primary">
          <a :href="link">
            模板链接
          </a>
        </el-button>
      </div>

      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="playContentCols"
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
import debounce from 'lodash/debounce'
import tableMixins from '@/mixins/table'
import { fetchPurifyConfigSimpale } from '@/apis/purification'
import {
  fetchPlaygroundContentList,
  postPlaygroundContentStatus,
  patchContentEdit,
  fetchContentCommonStat,
  deleteContentById,
  fetchUserContentExport,
  importPlaygroundContentList,
} from '@/apis/playground'
import { getMapOptions } from '@/utils/mappings'
import PlaygroundContentForm from './subComponents/PlaygroundContentForm'
import { playContentCols } from './tableConfig'
import { filterFields, filterFieldsMutation } from './formConfig'
import { allErrors } from '@/utils/errorFormat'
import RegularFilter from '@/components/regular_filter'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
  filtersInit: { search: '' },
  filtersMutateInit: filterFieldsMutation,
})

const DELAY_TIME = 500

export default {
  name: 'Content',

  mixins: [table],

  components: {
    RegularFilter,
  },

  data() {
    return {
      purifyOpts: [],
      modifyContentStatus: '',
      link:
        'https://new-ppb-1251001081.cos.ap-chengdu.myqcloud.com' +
        '/%E9%9D%B6%E5%9C%BA%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF2.xls',
      questionList: [],
      departmentOpts: [],
      regularConfig: {
        appName: 'practiceauditorderadminview',
        mutate: filterFieldsMutation,
        appStstc: fetchContentCommonStat,
      },
    }
  },

  computed: {
    userStatusOpts() {
      return getMapOptions('practiceOrderStatus')
    },

    fetchTableListMethod() {
      return fetchPlaygroundContentList
    },

    playContentCols() {
      return playContentCols(this)
    },

    filterFields() {
      return filterFields(this)
    },

    purifyTypeOpts() {
      return this.purifyOpts.map((item) => {
        return {
          label: item.name,
          value: item.id,
        }
      })
    },
  },

  methods: {
    // 删除
    deletePureConfig(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteContentById(row.id)
            .then(() => {
              this.$message.success('删除成功')
              this.fetchTableList(this.filtersCache)
            })
            .catch((error) => {
              this.$message.error(error.data ? error.data[0] : '删除失败')
            })
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },

    // 修改内容状态
    handleEditContentStatus() {
      this.$createDialog(
        {
          title: '修改内容状态',
          validate: false,
          onSubmit: debounce(async (instance) => {
            try {
              await postPlaygroundContentStatus({
                ids: this.questionList,
                status: this.modifyContentStatus,
              })
              this.fetchTableList(this.filtersCache)
              this.$notify.success('修改成功')
              instance.close()
              this.modifyContentStatus = []
            } catch (error) {
              allErrors(error.data || error)
            }
          }, DELAY_TIME),
        },
        () => (
          <el-radio-group v-model={this.modifyContentStatus}>
            {this.userStatusOpts.map((status) => {
              return <el-radio label={status.value}>{status.label}</el-radio>
            })}
          </el-radio-group>
        )
      ).show()
    },

    handleSelectionChange(select) {
      this.questionList = select.map((s) => s.id)
    },

    // 修改内容状态是否有选项
    checkSelection() {
      if (this.questionList.length <= 0) {
        this.$notify.info('请勾选内容')
        return false
      }
      return true
    },

    // 导出
    handleExport: debounce(async function handleExport() {
      try {
        await fetchUserContentExport(
          filterFieldsMutation.parse(this.filtersCache)
        )
        this.$notify.success('导出成功，请稍后在邮件中查看')
      } catch (error) {
        allErrors(error.data || error)
      }
    }, DELAY_TIME),

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

          try {
            await importPlaygroundContentList(formData, {
              headers: {
                'Content-Type': 'h/form-data',
              },
            })
          } catch (e) {
            this.$notify({
              message: '导入失败',
              type: 'error',
              offset: 50,
            })
            this.$notify({
              message: e.data.message,
              type: 'error',
              offset: 100,
            })

            this.$notify({
              message: e.data.exception_message,
              type: 'error',
              offset: 150,
            })
          }
          this.pager.page = 1
          this.fetchTableList()
          res.close()
        }
      }
      el.click()
    }, DELAY_TIME),

    // 编辑
    modifyPureConfig(row) {
      this.$createDialog(
        {
          title: '编辑内容',
          validate: false,
          onSubmit: debounce(async (instance, slotRef) => {
            let editVal = slotRef.$refs.effectForm.getForm()
            editVal.pictures = editVal.upload_file
            const result = await slotRef.$refs.effectForm.useValidator()
            if (result) {
              try {
                await patchContentEdit(row.id, editVal)
                this.fetchTableList(this.filtersCache)
                this.$notify.success('编辑成功')
                instance.close()
                this.modifyContentStatus = []
              } catch (error) {
                allErrors(error.data || error)
              }
            }
          }, DELAY_TIME),
        },
        () => <PlaygroundContentForm meta={row} />
      ).show()
    },
  },

  mounted() {
    this.fetchTableList()
    fetchPurifyConfigSimpale({ page_size: 999999 }).then((data) => {
      this.purifyOpts = data.results || []
    })
  },
}
</script>

<style></style>
