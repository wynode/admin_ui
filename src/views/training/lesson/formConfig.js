import Mutation from '@what-a-faka/obj-mutation'
import { join } from '@/utils/common'

export const filterFields = (vm) => {
  return [
    {
      type: 'array',
      name: 'category_id__in',
      title: '课程分类',
      widget: 'select',
      xProps: {
        multiple: true,
        options: vm.lessonCategory.map((category) => {
          return {
            label: category.name,
            value: category.id,
          }
        }),
      },
    },

    {
      type: 'string',
      name: 'rel_lessons',
      title: '关联课程',
      widget: 'select',
      xProps: {
        placeholder: '请选择关联课程',
        filterable: true,
        remote: true,
        remoteMethod: (query) => vm.fetchSelectRelatedLessons(query),
        options: vm.selectRelatedLessonsOptions,
      },
    },
  ]
}

export const filtersMutateInit = new Mutation({
  category_id__in: { format: join },
  rel_lessons: { format: join },
})

export const editLessonFields = (vm) => {
  return [
    {
      type: 'string',
      title: '课程名称',
      name: 'name',
      widget: 'text',
      rules: [
        { required: true, message: '课程名称必填' },
        { max: 100, message: '不可以超过100个字' },
      ],
      xProps: {
        placeholder: '请输入课程名称',
      },
    }, // 课程名称

    {
      type: 'array',
      title: '课程分类',
      name: 'category',
      widget: 'select',
      rules: [{ required: true, message: '课程分类必填' }],
      xProps: {
        placeholder: '请选择课程分类',
        options: vm.lessonCategory.map((category) => {
          return {
            label: category.name,
            value: category.id,
          }
        }),
      },
    }, // 课程分类

    {
      type: 'string',
      title: '讲师',
      name: 'lecturer_name',
      widget: 'text',
      rules: [
        { required: true, message: '讲师名称必填' },
        { max: 100, message: '不可以超过100个字' },
      ],
      xProps: {
        placeholder: '请输入讲师名称',
      },
    }, // 讲师

    {
      type: 'array',
      title: '关联课程',
      name: 'rel_lessons',
      widget: 'select',
      xProps: {
        placeholder: '请选择关联课程',
        multiple: true,
        filterable: true,
        remote: true,
        remoteMethod: (query) => vm.fetchRelatedLessons(query),
        options: vm.relatedLessonsOptions,
      },
    }, // 课程分类

    {
      type: 'file',
      title: '上传封面',
      name: 'cover',
      widget: 'upload',
      xProps: {
        type: 'img',
        targetUrl: vm.NOREMAL_UPLOAD_URL,
        disabled: false,
        deleteText: '删除封面',
      },
    }, // 课程封面

    {
      type: 'file',
      title: '上传视频',
      name: 'url',
      widget: 'upload',
      rules: [{ required: true, message: '请上传视频课程' }],
      xProps: {
        type: 'video',
        targetUrl: vm.NOREMAL_UPLOAD_URL,
        fileTypes: ['mp4', 'avi', 'wmv', 'flv'],
        disabled: false,
        showDelete: false,
      },
    }, // 课程视频

    {
      type: 'string',
      title: '简介',
      name: 'intro',
      widget: 'text',
      rules: [{ required: true, message: '简介必填' }],
      xProps: {
        placeholder: '请输入课程简介',
        type: 'textarea',
      },
    }, // 简介

    {
      type: 'string',
      title: '讲解',
      name: 'explain',
      widget: 'text',
      rules: [{ required: true, message: '讲解必填' }],
      xProps: {
        placeholder: '请输入课程讲解',
        type: 'textarea',
      },
    }, // 讲解
  ]
}
