export const ChangeFields = () => {
  return [
    {
      title: 'countryName',
      name: 'countryName',
      widget: 'text',
    },
    {
      title: 'countryCode',
      name: 'countryCode',
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

export const ChangeFields2 = () => {
  return [
    {
      title: 'countryName',
      name: 'countryName',
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
