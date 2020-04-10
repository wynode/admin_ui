<template>
  <div>
    <el-card class="Mb24">
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
        <el-button size="small" type="primary" @click="newBanner">
          新增轮播
        </el-button>
      </div>

      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="geniusCols"
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
  fetchBannerSetting,
  postBannerSetting,
  patchBannerSetting,
  deleteBannerSetting,
} from '@/apis/system'
import tableMixins from '@/mixins/table'
import { allErrors, errorFormat } from '@/utils/errorFormat'
import { geniusCols } from './tableConfig'
import { filtersFields, filtersMutation } from './formConfig'
import BannerForm from './BannerForm.vue'

const pagerInit = {
  page: 1,
  page_size: 10,
}

const table = tableMixins({
  pagerInit,
  filtersMutateInit: filtersMutation,
})

export default {
  name: 'Banner',

  mixins: [table],

  computed: {
    fetchTableListMethod() {
      return fetchBannerSetting
    },

    filtersFields() {
      return filtersFields(this)
    },

    geniusCols() {
      return geniusCols(this)
    },
  },

  methods: {
    showBannerImg(row) {
      this.$createDialog({ footer: false, center: true, width: '30%' }, () => (
        <img class="Db Wst" src={row.pic_url} alt="" />
      )).show()
    },

    async handleNewBanner(instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            const form = slotRef.$refs.effectForm.getForm()
            if (form.click_url.startsWith('http')) {
              const url = form.click_url
              form.click_url = `{"type": "web", "param": {}, "url": "${url}"}`
            }
            await postBannerSetting(form)
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
            if (form.click_url.startsWith('http')) {
              const url = form.click_url
              form.click_url = `{"type": "web", "param": {}, "url": "${url}"}`
            } else if (form.click_url === '') {
              form.click_url = ``
            }
            await patchBannerSetting(row.id, form)
            this.$notify.success('修改成功')
            this.fetchTableList(this.filtersCache)
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },

    newBanner() {
      this.$createDialog(
        {
          title: '新增轮播',
          onSubmit: debounce(async (instance, slotRef) => {
            this.handleNewBanner(instance, slotRef)
          }, 200),
        },
        () => <BannerForm />
      ).show()
    },

    modifyBanner(row) {
      const effects = (subscribe) => {
        subscribe('onFieldInit', (fields, form) => {
          Object.keys(form.fields).forEach((fieldName) => {
            if (fieldName === 'click_url' && row[fieldName].includes('"web"')) {
              const val = JSON.parse(row[fieldName])
              row[fieldName] = val.url
            }
            form.setForm(fieldName, row[fieldName])
          })
        })
      }

      this.$createDialog(
        {
          title: '修改轮播',
          onSubmit: debounce(async (instance, slotRef) => {
            this.handleModifyBanner(row, instance, slotRef)
          }, 200),
        },
        () => <BannerForm effects={effects} />
      ).show()
    },

    async delBanner(row) {
      const ifDel = await this.$confirm('请确认此删除操作, 是否继续?', '提示', {
        type: 'warning',
      }).catch(() => {
        this.$notify.info('操作取消')
        return false
      })

      if (ifDel) {
        try {
          await deleteBannerSetting(row.id)
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
