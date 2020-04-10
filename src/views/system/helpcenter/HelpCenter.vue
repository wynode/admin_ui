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
        label-position="top"
        size="small"
        @submit="handleFilter"
        @cancel="handleFilterReset"
      >
        <EffectFormField
          v-for="field in filtersFields"
          :key="field.name"
          v-bind="field"
        />
      </EffectForm>
    </el-card>

    <el-card>
      <div class="Mb24">
        <el-button size="small" type="primary" @click="newHelpCenter">
          新增帮助
        </el-button>
        <router-link
          :to="{ name: 'helpCenterSort' }"
          target="_blank"
          class="Ml8"
        >
          <el-button size="small" type="primary" icon="el-icon-sort">
            帮助排序
          </el-button>
        </router-link>
      </div>

      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="tableCols"
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
  fetchHelpCenterSetting,
  postHelpCenterSetting,
  patchHelpCenterSetting,
  deleteHelpCenterSetting,
} from '@/apis/system'
import tableMixins from '@/mixins/table'
import { allErrors, errorFormat } from '@/utils/errorFormat'
import { tableCols } from './tableConfig'
import { filtersFields, filtersMutation } from './formConfig'
import HelpCenterForm from './HelpCenterForm.vue'

const pagerInit = {
  page: 1,
  page_size: 10,
}
const table = tableMixins({
  pagerInit,
  filtersMutateInit: filtersMutation,
})

export default {
  name: 'HelpCenter',
  mixins: [table],

  computed: {
    fetchTableListMethod() {
      return fetchHelpCenterSetting
    },

    filtersFields() {
      return filtersFields(this)
    },

    tableCols() {
      return tableCols(this)
    },
  },

  methods: {
    async handleNewHelpCenter(instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            const data = slotRef.$refs.effectForm.getForm()
            // data['parent'] =
            //   data['parent'] &&
            //   (data['parent'].length > 0
            //     ? data['parent'][data['parent'].length - 1]
            //     : null)
            await postHelpCenterSetting(data)
            this.$notify.success('新增成功')
            this.pager = { ...pagerInit }
            this.fetchTableList()
            instance.close()
          }
        }
      } catch (error) {
        this.$notify.success(error)
        errorFormat(error.data)
      }
    },

    async handleModifyHelpCenter(row, instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            const data = slotRef.$refs.effectForm.getForm()

            // data['parent'] =
            //   data['parent'] &&
            //   (data['parent'].length > 0
            //     ? data['parent'][data['parent'].length - 1]
            //     : null)
            await patchHelpCenterSetting(row.id, data)
            this.$notify.success('修改成功')
            this.fetchTableList(this.filtersCache)
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },

    newHelpCenter() {
      const effects = (subscribe, { setFieldState }) => {
        // subscribe('onFieldInit', (fields) => {
        //   const is_article = fields.wiki_type === 'article'
        //   setFieldState('content', (ref) => {
        //     ref.ifRender = is_article
        //   })
        // })

        subscribe('onFieldChange', 'wiki_type', (value) => {
          const is_article = value === 'article'
          setFieldState('parent', (ref) => {
            ref.ifRender = is_article
          })
          setFieldState('content', (ref) => {
            ref.ifRender = is_article
          })
        })
      }

      this.$createDialog(
        {
          title: '新增帮助',
          onSubmit: debounce(async (instance, slotRef) => {
            this.handleNewHelpCenter(instance, slotRef)
          }, 200),
        },
        () => <HelpCenterForm effects={effects} />
      ).show()
    },

    modifyHelpCenter(row) {
      const effects = (subscribe, { setFieldState }) => {
        subscribe('onFieldInit', (fields, form) => {
          Object.keys(form.fields).forEach((fieldName) => {
            form.setForm(
              fieldName,
              fieldName === 'parent' ? row[fieldName][0] : row[fieldName]
            )
          })
          const is_article = fields.wiki_type === 'article'
          setFieldState('content', (ref) => {
            ref.ifRender = is_article
          })
        })

        subscribe('onFieldChange', 'wiki_type', (value) => {
          const is_article = value === 'article'
          setFieldState('parent', (ref) => {
            ref.ifRender = is_article
          })
          setFieldState('content', (ref) => {
            ref.ifRender = is_article
          })
        })
      }

      this.$createDialog(
        {
          title: '修改帮助',
          onSubmit: debounce(async (instance, slotRef) => {
            this.handleModifyHelpCenter(row, instance, slotRef)
          }, 200),
        },
        () => <HelpCenterForm effects={effects} />
      ).show()
    },

    async delHelpCenter(row) {
      const ifDel = await this.$confirm('请确认此删除操作, 是否继续?', '提示', {
        type: 'warning',
      }).catch(() => {
        this.$notify.info('操作取消')
        return false
      })

      if (ifDel) {
        try {
          await deleteHelpCenterSetting({ ids: [row.id] })
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
