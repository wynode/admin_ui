export const ChangeFields = () => {
  return [
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

export const IpForbiddenFields = (vm) => {
  return [
    {
      title: '省份名称',
      name: 'provinceName',
      widget: 'select',
      xProps: {
        filterable: true,
        options: vm.proviceList,
      },
    },
    {
      title: '城市名称',
      name: 'cityName',
      widget: 'text',
    },
    {
      title: '邮编',
      name: 'zipCode',
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
