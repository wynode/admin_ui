export const FormFields = () => {
  return [
    {
      title: 'type',
      name: 'type',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: '全部', value: '' },
          { label: '全匹配', value: 1 },
          { label: '正则匹配', value: 2 },
        ],
      },
    },
    // {
    //   title: 'name',
    //   name: 'name',
    //   widget: 'text',
    // },
  ]
}

export const SQLFieldCols = () => {
  return [
    {
      title: 'pathRule',
      name: 'pathRule',
      widget: 'text',
    },
    {
      title: 'name',
      name: 'name',
      widget: 'text',
    },
    {
      title: 'type',
      name: 'type',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: '全匹配', value: 1 },
          { label: '正则匹配', value: 2 },
        ],
      },
    },
    {
      title: 'note',
      name: 'note',
      widget: 'text',
    },
  ]
}
