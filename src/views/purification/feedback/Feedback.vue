<template>
  <div>
    <el-card>
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="净网内容、内容 ID"
          @keyup.enter.native="handleSearch(true)"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="handleSearch(true)"
          ></el-button>
        </el-input>
      </div>

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
      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="playDetailCols"
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
import tableMixins from '@/mixins/table'
import { fetchUserList } from '@/apis/users'
import { fetchPurifyConfigSimpale } from '@/apis/purification'
import { fetchClientFeedback, patchClientFeedback } from '@/apis/feedback'
import { fetchClientFeedbackCommonStat } from '@/apis/regularfilter'
import { fetchOptions, fetchNoOptions } from '@/apis/options'
import { playDetailCols } from './tableConfig'
import { filterFields, filterFieldsMutation } from './formConfig'
import FeedbackForm from './FeedbackForm'
import { errorFormat } from '@/utils/errorFormat'
import debounce from 'lodash/debounce'

const pagerInit = { page: 1, page_size: 10 }

let filter1 = {
  search: '',
}
const table = tableMixins({
  pagerInit,
  filtersInit: filter1,
  filtersMutateInit: filterFieldsMutation,
})

export default {
  name: 'PureContentDetail',

  mixins: [table],

  data() {
    return {
      purifyTypeOpts: [],
      usersOpts: [],
      thirdTagsOpts: [],
      secondTagsFilterOpts: [],
      contentTypeChoices: [],
      customerChoices: [],

      secondTagsOpts: [],
      purifyId: '',
      error_first_result: '',
      error_second_result: '',
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchClientFeedback
    },

    playDetailCols() {
      return playDetailCols(this)
    },

    filterFields() {
      return filterFields(this)
    },

    regularConfig() {
      return {
        appName: 'auditfeedbackadminview',
        mutate: filterFieldsMutation,
        appStstc: fetchClientFeedbackCommonStat,
      }
    },
  },

  methods: {
    async handleFeedbackUpdated(dialog, effectForm, row) {
      const { form, useValidator } = effectForm
      try {
        if (await useValidator()) {
          const payload = { ...form }
          await patchClientFeedback(row.id, payload)
          this.$notify.success('修改成功')
          this.pager = { ...pagerInit }
          this.fetchTableList()
          dialog.close()
        }
      } catch (error) {
        const errors = errorFormat(error.data || error)
        effectForm.setFieldError(errors)
      }
    },

    handleEditOpStatus(row) {
      this.$createDialog(
        {
          title: '异议处理',
          width: '600px',
          onSubmit: debounce((dialog, formRef) => {
            this.handleFeedbackUpdated(dialog, formRef.$refs.effectForm, row)
          }, 500),
        },
        () => (
          <FeedbackForm
            meta={row}
            secondTagsFilterOpts={this.secondTagsFilterOpts}
          />
        )
      ).show()
    },
  },

  mounted() {
    this.fetchTableList()
    fetchPurifyConfigSimpale({ page_size: 99999 }).then((data) => {
      const options = data.results || []
      this.purifyTypeOpts = options.map((opt) => ({
        label: opt.name,
        value: opt.id,
      }))
    })
    fetchUserList({ page_size: 999999 }).then((data) => {
      const users = data.results || []
      this.usersOpts = users.map((user) => ({
        label: user.name,
        value: user.id,
      }))
    })
    fetchOptions('third_tags_filter').then((data) => {
      this.thirdTagsOpts = data[0].options
    })
    fetchOptions('second_tags_filter').then((data) => {
      this.secondTagsFilterOpts = data[0].options
    })
    fetchOptions('content_type').then((data) => {
      this.contentTypeChoices = data || []
    })
    fetchNoOptions('/purify/admin/customer/').then((data) => {
      this.customerChoices =
        data.results.map((item) => {
          return {
            label: item.name,
            value: item.id,
          }
        }) || []
    })
  },
}
</script>
