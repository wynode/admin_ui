export const ChangeFields = () => {
  return [
    {
      title: 'uaName',
      name: 'uaName',
      widget: 'text',
    },
    {
      title: 'uaMatchStr',
      name: 'uaMatchStr',
      widget: 'text',
    },
    {
      title: '是否禁用',
      name: 'isForbidden',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: '禁用', value: 1 },
          { label: '正常', value: 0 },
        ],
      },
    },
  ]
}

export const FormFields = () => {
  return [
    {
      title: '是否禁用',
      name: 'isForbidden',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: '全部', value: '' },
          { label: '禁用', value: 1 },
          { label: '正常', value: 0 },
        ],
      },
    },
  ]
}
