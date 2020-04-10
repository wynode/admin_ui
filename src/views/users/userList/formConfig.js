import Mutation from '@what-a-faka/obj-mutation'
import { join, numberJoin } from '@/utils/common'

export const filterFields = (vm) => {
  return [
    {
      type: 'string',
      title: '地域',
      name: 'base__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: [
          { label: '成都', value: '成都' },
          { label: '重庆', value: '重庆' },
        ],
      },
    }, // 地域

    {
      type: 'number',
      title: '所在部门',
      name: 'department__id__in',
      widget: 'cascader',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.departmentOpts,
        props: {
          multiple: true,
          checkStrictly: true,
        },
      },
    }, // 所在部门

    {
      type: 'number',
      title: '岗位名称',
      name: 'position__id__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.positionOpts,
      },
    }, // 岗位名称
    {
      type: 'string',
      title: '角色',
      name: 'roles_filter',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.rolesList,
      },
    }, // 角色
    {
      type: 'string',
      title: '用户状态',
      name: 'status__in',
      widget: 'select',
      xProps: {
        filterable: true,
        multiple: true,
        options: vm.userStatusOpts,
      },
    }, // 用户状态

    // {
    //   type: 'string',
    //   title: '达人段位',
    //   name: 'user_check_point__check_point__category__in',
    //   widget: 'select',
    //   xProps: {
    //     filterable: true,
    //     multiple: true,
    //     options: getMapOptions('userStatus'),
    //   },
    // }, // 达人段位

    {
      type: 'string',
      title: '通关数',
      name: 'usercheckpointrankinglist__all_success_count__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    }, // 通关数

    {
      type: 'string',
      title: '冲关星',
      name: 'usercheckpointrankinglist__all_ranking__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    }, // 冲关星
    /////
    {
      type: 'string',
      title: '积分余额',
      name: 'userscore__score_balance__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    }, // 冲关星

    {
      type: 'string',
      title: '总积分',
      name: 'userscore__score_total__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    }, // 冲关星

    {
      type: 'string',
      title: '消费积分',
      name: 'userscore__score_consume__range',
      widget: 'inputNumberRange',
      xProps: {
        min: 0,
        controls: false,
      },
    }, // 冲关星

    {
      type: 'string',
      title: '姓名',
      name: 'name__in',
      widget: 'text',
      xProps: {
        rows: 1,
        type: 'textarea',
      },
    },
  ]
}

export const filterFieldsMutation = new Mutation({
  department__id__in: {
    format: (value) => {
      if (Array.isArray(value)) {
        // NOTE 数组 v 可能为空，导致 dp 里最终数据可能会出现 undefined
        const dp = value.map((v) => v[v.length - 1])
        return join(dp)
      }
      return value
    },
  },
  status__in: { format: join },
  roles_filter: { format: join },
  position__id__in: { format: join },
  usercheckpointrankinglist__all_success_count__range: { format: numberJoin },
  usercheckpointrankinglist__all_ranking__range: { format: numberJoin },
  userscore__score_balance__range: { format: numberJoin },
  userscore__score_total__range: { format: numberJoin },
  userscore__score_consume__range: { format: numberJoin },
})
