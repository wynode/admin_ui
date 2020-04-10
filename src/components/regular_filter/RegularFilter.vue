<template>
  <div :class="$style.regular_filter">
    <label :class="$style.regular_filter_label">常用筛选:</label>

    <ul :class="$style.regular_filter_list">
      <li
        v-for="filter in filters"
        :key="filter.id"
        :class="{
          [$style.regular_filter_item]: true,
          [$style.regular_filter_item_active]: filter.id === currentFilter.id,
        }"
        @click="useSpecFilterFn(filter)"
      >
        <span>{{ filter.name }}</span>
        <span
          v-show="statistic[filter.id]"
          :class="$style.regular_filter_badge"
        >
          {{ statistic[filter.id] }}
        </span>
      </li>

      <li :class="$style.regular_filter_action">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="addFilterVis = true"
        ></el-button>
        <el-button
          v-if="filters.length"
          v-auth="'delete_common_filter'"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          @click="deleteFilterVis = true"
        ></el-button>
      </li>
    </ul>

    <!-- 添加常用筛选 -->
    <el-dialog
      title="保存筛选"
      :visible.sync="addFilterVis"
      width="33.3333%"
      @open="openAddFilter"
    >
      <el-form
        ref="addFilterForm"
        :model="addFilterForm"
        :rules="addFilterFormRules"
        label-width="80px"
        label-position="left"
      >
        <el-form-item prop="name" label="名称">
          <el-input v-model="addFilterForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="sequence" label="排序">
          <el-input v-model.number="addFilterForm.sequence"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" size="small" @click="submitAdd">
          保存
        </el-button>
        <el-button size="small" @click="addFilterVis = false">返回</el-button>
      </div>
    </el-dialog>

    <!-- 删除常用筛选 -->
    <el-dialog
      title="删除筛选"
      :visible.sync="deleteFilterVis"
      width="33.3333%"
    >
      <el-checkbox-group v-model="pk_list">
        <el-checkbox v-for="item in filters" :label="item.id" :key="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>

      <div slot="footer">
        <el-button size="small" type="primary" @click="submitDelete">
          删除
        </el-button>
        <el-button size="small" @click="deleteFilterVis = false">
          返回
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import isInteger from 'lodash/isInteger'
import {
  fetchRegularFilters,
  postRegularFilters,
  deleteRegularFilters,
} from '@/apis/regularfilter'

const addFilterFormInit = {
  name: '',
  sequence: 0,
  app_name: '',
  params: {},
  orig_params: {},
}

export default {
  props: {
    appName: String,
    formRef: Object,
    mutate: Object,
    appStstc: Function,
    search: String,
  },

  data() {
    return {
      addFilterVis: false,
      deleteFilterVis: false,

      filters: [],
      addFilterForm: { ...addFilterFormInit },

      statistic: [],
      pk_list: [],
      currentFilter: {},
    }
  },

  computed: {
    addFilterFormRules() {
      return {
        name: [
          { required: true, message: '请输入名称' },
          // { max: 10, message: '不可以超过10个字' },
        ],
        sequence: { required: true, type: 'number', validator: this.checkInt },
      }
    },
  },

  methods: {
    fetchRegularFilters() {
      return fetchRegularFilters({
        app_name: this.appName,
        page: 1,
        page_size: 10000,
      })
        .then((data) => {
          this.filters = data.results || []
          this.appStstc()
            .then((stc) => {
              this.statistic = stc || {}
            })
            .catch(() => {
              this.$notify.error('常用筛选统计失败')
            })
        })
        .catch(() => this.$notify.error('常用筛选获取失败'))
    },

    checkInt(rule, value, cb) {
      if (isInteger(value)) {
        cb()
      } else {
        cb(new Error('请输入整数类型'))
      }
    },

    reset() {
      this.currentFilter = {}
    },

    useSpecFilterFn(currentFilter) {
      this.currentFilter = { ...currentFilter }
      this.$emit('change', currentFilter.orig_params)
    },

    async openAddFilter() {
      this.addFilterForm = { ...addFilterFormInit }
      this.$nextTick(() => {
        this.$refs.addFilterForm.resetFields()
      })
    },

    submitAdd() {
      const formFields = { ...this.formRef.form, search: this.search }
      const realFields = this.mutate.parse(formFields)
      const orig_params = {}
      Object.keys(realFields).forEach((field) => {
        orig_params[field] = formFields[field]
      })
      const payload = {
        ...this.addFilterForm,
        app_name: this.appName,
        orig_params,
        params: this.mutate.parse(formFields),
      }
      this.$refs.addFilterForm.validate((valid) => {
        if (valid) {
          postRegularFilters(payload)
            .then((data) => {
              this.$message.success('保存筛选成功')
              this.fetchRegularFilters()
              this.addFilterVis = false
              this.useSpecFilterFn(data)
              this.$emit('created')
            })
            .catch(() => {
              this.$notify.error('保存筛选失败')
            })
        }
      })
    },

    submitDelete() {
      return deleteRegularFilters({ pk_list: this.pk_list })
        .then(() => {
          this.$message.success('删除筛选成功')
          this.fetchRegularFilters()
          this.deleteFilterVis = false
          this.$emit('deleted')
        })
        .catch(() => {
          this.$notify.error('删除筛选失败')
        })
    },
  },

  created() {
    this.fetchRegularFilters()
  },
}
</script>

<style lang="scss" module>
.regular_filter {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.regular_filter_label {
  font-weight: 900;
}

.regular_filter_list {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 8px;
}

%regular_filter_item {
  flex: 0 0 auto;
  padding: 4px 8px;
  line-height: 1;
  border-radius: 2px;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  transition: color 200ms ease;
}

.regular_filter_item {
  @extend %regular_filter_item;

  &:hover {
    color: #845bea;
  }
}

.regular_filter_item_active {
  @extend %regular_filter_item;
  color: #845bea;
}

.regular_filter_action {
  flex: 0 0 auto;
  margin-left: 8px;

  .el-button + .el-button {
    margin-left: 0;
  }
}

.regular_filter_badge {
  display: inline-block;
  margin-left: 4px;
  padding: 2px 6px;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
  color: #fff;
  background-color: #845bea;
  border-radius: 10px;
}
</style>
