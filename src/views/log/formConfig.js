import { startOfDay, endOfDay } from 'date-fns'

export const ChangeFields = () => {
  return [
    {
      title: '最大保留天数',
      name: 'maxStorageDate',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    },
    {
      title: '记录COOKIE',
      name: 'isWriteCookieData',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户账号', trigger: 'blur' }],
    },
    {
      title: '记录POST',
      name: 'isWritePostData',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户密码', trigger: 'blur' }],
    },
    {
      title: '记录HEADER',
      name: 'isWriteHeaderData',
      widget: 'text',
      // rules: [{ required: true, message: '请填写用户密码', trigger: 'blur' }],
    },
  ]
}

export const accessFields = () => {
  return [
    {
      type: 'datetime',
      title: '日期筛选',
      name: 'date',
      widget: 'datetimepicker',
      defaultValue: new Date(),
      xProps: {
        type: 'date',
        'value-format': 'yyMMdd',
      },
    },
    {
      type: 'datetime',
      title: '时间范围筛选',
      name: 'time_date',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
        'value-format': 'yyyy-MM-dd HH:mm:ss',
      },
    },
    {
      type: 'string',
      title: 'ip筛选',
      name: 'ip',
      widget: 'text',
    },
    {
      type: 'string',
      title: 'uuid筛选',
      name: 'uuid',
      widget: 'text',
    },
  ]
}

export const attackFields = () => {
  return [
    {
      type: 'datetime',
      title: '时间范围筛选',
      name: 'time_date',
      widget: 'datetimepicker',
      defaultValue: [startOfDay(new Date()), endOfDay(new Date())],
      xProps: {
        type: 'datetimerange',
        'value-format': 'yyyy-MM-dd HH:mm:ss',
      },
    },
    {
      type: 'string',
      title: 'ip筛选',
      name: 'ip',
      widget: 'text',
    },
    {
      type: 'string',
      title: 'uuid筛选',
      name: 'uuid',
      widget: 'text',
    },
  ]
}
