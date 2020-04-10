<template>
  <div class="gb_wrap">
    <el-card class="Mb24">
      <div class="Df Mb24">
        <el-input
          v-model="filters.search"
          class="g_search Mla"
          placeholder="课程名称、讲师"
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
        class="Mb20"
        @click="handleCreateLesson"
      >
        新建
      </el-button>

      <Txcel
        ref="table"
        v-loading="mixTableLoading"
        class="Txcel"
        :data="tableList"
        :columns="rowCols"
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
import table from '@/mixins/table'
import {
  fetchCategory,
  postLesson,
  fetchLesson,
  patchLesson,
  deleteLesson,
} from '@/apis/training'
import { rowCols } from './tableConfig'
import { filterFields, filtersMutateInit } from './formConfig'
import EditLesson from './EditLesson.vue'
import VideoPlayer from '@/components/media_audit_box/VideoPlayer.vue'
import debounce from 'lodash/debounce'
import { errorFormat } from '@/utils/errorFormat'

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
  name: 'LessonList',

  mixins: [tableMixins],

  data() {
    return {
      lessonCategory: [],
      selectRelatedLessonsOptions: [],
    }
  },

  computed: {
    fetchTableListMethod() {
      return fetchLesson
    },

    filterFields() {
      return filterFields(this)
    },

    rowCols() {
      return rowCols(this)
    },
  },

  methods: {
    // 新建课程
    async postCreateLesson(instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            const form = slotRef.$refs.effectForm.getForm()
            await postLesson({ ...form })
            this.$notify.success('新建课程成功!')
            this.pager = { ...pagerInit }
            this.fetchTableList(this.filtersCache)
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },

    async handleCreateLesson() {
      this.$createDialog(
        {
          title: '新建课程',
          onSubmit: debounce(async (instance, slotRef) => {
            this.postCreateLesson(instance, slotRef)
          }, 200),
        },
        () => <EditLesson />
      ).show()
    },

    // 编辑课程
    async patchEditLesson(row, instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            const form = slotRef.$refs.effectForm.getForm()
            await patchLesson(row.id, { ...form })
            this.$notify.success('编辑课程成功!')
            this.pager = { ...pagerInit }
            this.fetchTableList(this.filtersCache)
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },

    handleEditLesson(row) {
      this.$createDialog(
        {
          title: '编辑课程',
          onSubmit: debounce(async (instance, slotRef) => {
            this.patchEditLesson(row, instance, slotRef)
          }, 200),
        },
        () => <EditLesson meta={row} />
      ).show()
    },

    // 删除课程
    async handleDeleteLesson(row) {
      const ifDel = await this.$confirm('确定要删除课程吗', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch(() => {
        this.$notify.info('操作已取消')
        return false
      })

      if (ifDel) {
        await deleteLesson(row.id)
        this.$message.success('删除成功')
        this.fetchTableList(this.filtersCache)
      }
    },

    // 获取分类
    fetchCategoryList() {
      fetchCategory().then((response) => {
        this.lessonCategory = response.results
      })
    },

    // 播放视频
    playVideo(name, url) {
      this.$createDialog(
        {
          title: name,
          footer: false,
        },
        () => {
          return <VideoPlayer src={url} />
        }
      ).show()
    },

    // 拉取关联课程选项
    fetchSelectRelatedLessons(query) {
      fetchLesson({ search: query }).then((response) => {
        this.selectRelatedLessonsOptions = response.results.map((lesson) => {
          return {
            label: lesson.name,
            value: lesson.id,
          }
        })
      })
    },
  },

  mounted() {
    this.fetchCategoryList()
    this.fetchTableList()
  },
}
</script>
