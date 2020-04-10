<template>
  <div class="gb_wrap">
    <el-card class="Mb24">
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="请输入关键字"
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
        ref="notify_list"
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
        @click="handleCreateMessage"
      >
        新增站内信
      </el-button>

      <Txcel
        ref="table"
        v-loading="mixTableLoading"
        :data="tableList"
        :columns="questionCols"
        :pager="{
          page: pager.page,
          page_size: pager.page_size,
          layout: 'total,prev,pager,next,jumper',
          total: tableTotal,
        }"
        class="Txcel"
        @change="handleTableChange"
      />
    </el-card>

    <el-dialog
      title="新增消息"
      :visible.sync="createMessageDialogVis"
      width="60%"
    >
      <el-form :model="form" ref="createForm" label-width="100px">
        <el-form-item
          label="接收人"
          prop="user_ids"
          :error="formError.user_ids"
          :rules="{
            required: true,
            type: 'array',
            message: '请选择发送对象',
            trigger: 'change',
          }"
        >
          <el-select v-model="form.user_ids" multiple filterable>
            <el-option
              v-for="type in usersOpts"
              :key="type.value"
              :label="type.label"
              :value="type.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="发送类型"
          prop="msg_type"
          :error="formError.msg_type"
          :rules="{
            required: true,
            message: '请选择发送类型',
            trigger: 'change',
          }"
        >
          <el-select v-model="form.msg_type" filterable>
            <el-option
              v-for="type in formItemList"
              :key="type.value"
              :label="type.label"
              :value="type.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="content"
          label="发送内容"
          :error="formError.content"
          :rules="{
            required: true,
            message: '请输入内容',
            trigger: 'change',
          }"
        >
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogCancel">取 消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import table from '@/mixins/table'
import { getMapOptions } from '@/utils/mappings'
import { errorFormat } from '@/utils/errorFormat'
import { fetchSiteMessage, postSiteMessage } from '@/apis/system'
import { fetchUserListSimple } from '@/apis/users'
import { questionCols } from './tableConfig'
import { filterFields, filtersMutateInit } from './formConfig'
import RegularFilter from '@/components/regular_filter'
import { fetchMessageCommonStat } from '@/apis/regularfilter'

const pagerInit = {
  page: 1,
  page_size: 10,
}

const formInit = {
  user_ids: [],
  content: '',
  msg_type: '',
}

const tableMixins = table({
  pagerInit: pagerInit,
  filtersInit: { search: '' },
  filtersMutateInit,
})

export default {
  name: 'QuestionList',

  mixins: [tableMixins],

  components: {
    RegularFilter,
  },

  data() {
    return {
      MessageList: [],
      usersOpts: [],
      createMessageDialogVis: false,
      formError: {},
      form: { ...formInit },
      regularConfig: {
        appName: 'notify_list',
        mutate: filtersMutateInit,
        appStstc: fetchMessageCommonStat,
      },
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchSiteMessage
    },

    questionCols() {
      return questionCols(this)
    },

    filterFields() {
      return filterFields(this)
    },

    questionStatusType() {
      return getMapOptions('questionStatusType')
    },
  },

  methods: {
    handleCreateMessage() {
      this.createMessageDialogVis = true
    },
    handleDialogCancel() {
      this.$refs.createForm.resetFields()
      this.createMessageDialogVis = false
    },

    handleDialogSubmit() {
      this.$refs.createForm.validate((valid) => {
        if (valid) {
          postSiteMessage(this.form)
            .then(() => {
              this.$message.success('新增消息成功')
              this.handleDialogCancel()
              this.pager = { ...pagerInit }
              this.fetchTableList()
            })
            .catch((err) => {
              this.formError = errorFormat(err.data)
            })
        }
      })
    },
  },

  mounted() {
    this.fetchTableList()
    this.fetchOptions('msg_type')
    fetchUserListSimple({ page_size: 999999 }).then((data) => {
      const users = data.results || []
      this.usersOpts = users.map((user) => ({
        label: user.name,
        value: user.user_id,
      }))
    })
  },
}
</script>
