export const filterFields = () => {
  return [
    {
      type: 'datetime',
      title: '时间范围',
      name: 'date',
      widget: 'datetimepicker',
      xProps: {
        type: 'date',
        'value-format': 'yyMMdd',
      },
    },
  ]
}
