<template>
  <div class="ip_forbidden">
    <el-card>
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
          v-for="field in IpForbiddenFields"
          v-bind="field"
          :key="field.name"
        />
      </EffectForm>
    </el-card>
    <el-card class="Mt15">
      <Txcel
        v-loading="mixTableLoading"
        element-loading-text="数据加载中"
        class="Txcel"
        :data="tableList"
        :columns="paramsListCols"
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
import { fetchIPForbidden, patchIPForbidden } from '@/apis/all'
import { paramsListCols } from './tableConfig'
import { IpForbiddenFields } from './formConfig'
// import EditIPForbidden from './EditIPForbidden'
import { fetchProvince } from '@/apis/all'

const table = tableMixins({
  pagerInit: { page: 1, page_size: 10 },
})

export default {
  name: 'UserList',

  mixins: [table],

  data() {
    return {
      proviceList: [],
      forbidden: false,
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchIPForbidden
    },
    IpForbiddenFields() {
      return IpForbiddenFields(this)
    },

    paramsListCols() {
      return paramsListCols(this)
    },
  },

  methods: {
    async modifyParams(row, value) {
      let isForbidden = 0
      if (value) {
        isForbidden = 1
      }
      await patchIPForbidden({
        id: row.id,
        isForbidden,
      })
      this.fetchTableList(this.filtersCache)
      // this.$createDialog(
      //   {
      //     title: '修改参数过滤规则',
      //     width: '600px',
      //     validate: false,
      //     onSubmit: async (instance, slotRef) => {
      //       const form = slotRef.$refs.effectForm.getForm()
      //       await patchIPForbidden({
      //         id: row.id,
      //         ...form,
      //       })
      //       this.fetchTableList(this.filtersCache)
      //       this.$notify.success('修改成功')
      //       instance.close()
      //     },
      //   },
      //   () => <EditIPForbidden meta={row} />
      // ).show()
    },
  },

  mounted() {
    this.fetchTableList()
    fetchProvince().then((data) => {
      this.proviceList = data.result.list.map((item) => {
        return {
          label: item.provinceName,
          value: item.provinceName,
        }
      })
    })
  },
}
</script>

<style lang="scss">
.ip_forbidden {
  .el-switch {
    .el-switch__label--right.is-active {
      span {
        color: rgb(245, 108, 108);
      }
    }
  }
}
</style>
