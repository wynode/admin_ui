<template>
  <EffectForm
    ref="effectForm"
    label-position="center"
    label-width="80px"
    :needToolBtnGroup="false"
  >
    <EffectFormField
      v-for="field in editLessonFields"
      :key="field.name"
      v-bind="field"
    />
  </EffectForm>
</template>

<script>
import { NOREMAL_UPLOAD_URL } from '@/config'
import { editLessonFields } from './formConfig'
import { fetchCategory, fetchLesson } from '@/apis/training'

export default {
  name: 'EditLesson',

  props: {
    meta: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      NOREMAL_UPLOAD_URL,
      relatedLessonsOptions: [],
      lessonCategory: [],
    }
  },

  watch: {
    meta: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          const { fields, setForm } = this.$refs.effectForm
          if (this.meta) {
            this.relatedLessonsOptions = this.meta.related_lessons.map(
              (lesson) => {
                return {
                  label: lesson.name,
                  value: lesson.id,
                }
              }
            )
            Object.keys(fields).forEach((fieldName) => {
              setForm(fieldName, this.meta[fieldName])
            })
          }
        })
      },
    },
  },

  computed: {
    editLessonFields() {
      return editLessonFields(this)
    },
  },

  methods: {
    // 获取分类
    fetchCategoryList() {
      fetchCategory().then((response) => {
        this.lessonCategory = response.results
      })
    },

    fetchRelatedLessons(query) {
      fetchLesson({ search: query }).then((response) => {
        this.relatedLessonsOptions = response.results.map((lesson) => {
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
  },
}
</script>
