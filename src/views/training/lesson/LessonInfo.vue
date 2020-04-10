<template>
  <div>
    <el-card>
      <div class="info_top">
        <div class="info_top_line1">
          <p class="info_item">
            课程封面：
            <span><img class="info_cover" :src="lesson.cover" /></span>
          </p>
          <p class="info_item">
            课程名称：
            <span>{{ lesson.name }}</span>
          </p>
          <p class="info_item">
            课程分类：
            <span>{{ lesson.category_name }}</span>
          </p>
          <p class="edit_button">
            <el-link type="primary" @click="handleEditLesson">
              <i class="el-icon-edit"></i>
              编辑
            </el-link>
          </p>
        </div>
        <div class="info_top_line2">
          <p class="info_item">
            讲师：
            <span>{{ lesson.lecturer_name }}</span>
          </p>
          <p class="info_item">
            播放数量：
            <span>{{ lesson.view_num }}</span>
          </p>
          <p class="info_item">
            评分：
            <span>{{ lesson.avg_star || '暂无评分' }}</span>
          </p>
          <p class="edit_button"></p>
        </div>
      </div>
    </el-card>

    <el-card class="box-card Mt24">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="简介" name="introduction">
          <pre>{{ lesson.intro }}</pre>
        </el-tab-pane>
        <el-tab-pane label="讲解" name="explain">
          <pre>{{ lesson.explain }}</pre>
        </el-tab-pane>
        <el-tab-pane label="评论" name="remark"><Remark></Remark></el-tab-pane>
        <el-tab-pane label="关联课程" name="related">
          <Related :relatedLessons="lesson.related_lessons"></Related>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import {
  fetchLessonById,
  fetchCategory,
  patchLesson,
  fetchLesson,
} from '@/apis/training'
import LessonRemark from './tabs/remark/LessonRemark'
import RelatedLessons from './tabs/related/RelatedLessons'
import EditLesson from './EditLesson.vue'
import debounce from 'lodash/debounce'
import { errorFormat } from '@/utils/errorFormat'

export default {
  name: 'LessonInfo',

  components: {
    Remark: LessonRemark,
    Related: RelatedLessons,
  },

  data() {
    return {
      activeTab: 'introduction',
      lesson: {},
      lessonCategory: [],
    }
  },

  methods: {
    // 获取课程信息
    fetchLesson() {
      const { id } = this.$route.params
      fetchLessonById(id).then((data) => {
        this.lesson = data
      })
    },

    // 获取分类
    fetchCategoryList() {
      fetchCategory().then((response) => {
        this.lessonCategory = response.results
      })
    },

    // 编辑课程
    async patchEditLesson(instance, slotRef) {
      try {
        if (slotRef.$refs.effectForm) {
          const { effectForm } = slotRef.$refs
          if (await effectForm.useValidator()) {
            const form = slotRef.$refs.effectForm.getForm()
            await patchLesson(this.lesson.id, { ...form })
            this.$notify.success('编辑课程成功')
            this.fetchLesson()
            instance.close()
          }
        }
      } catch (error) {
        errorFormat(error.data)
      }
    },

    handleEditLesson() {
      this.$createDialog(
        {
          title: '编辑课程',
          onSubmit: debounce(async (instance, slotRef) => {
            this.patchEditLesson(instance, slotRef)
          }, 200),
        },
        () => (
          <EditLesson
            meta={this.lesson}
            relatedLessons={this.lesson.related_lessons}
          />
        )
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
    this.fetchLesson()
    this.fetchCategoryList()
  },
}
</script>

<style lang="scss">
.info_top {
  width: 100%;
  .info_cover {
    max-height: 90px;
    max-width: 160px;
  }
  .info_item {
    display: flex;
    flex: 1;
    align-items: flex-start;
  }
  .edit_button {
    display: flex;
    align-items: flex-start;
    width: 60px;
  }
  .info_top_line1 {
    width: 100%;
    display: flex;
  }
  .info_top_line2 {
    margin-top: 20px;
    display: flex;
  }
}
</style>
