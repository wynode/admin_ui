<template>
  <EffectForm
    class="FormWrapper"
    size="small"
    label-width="auto"
    :validator="true"
    :effects="handleFormEffects"
    @submit="onSubmit"
  >
    <EffectFormField v-for="field in fields" :key="field.name" v-bind="field" />
  </EffectForm>
</template>

<script>
export default {
  computed: {
    fields() {
      return [
        {
          type: 'string',
          title: '姓名',
          name: 'name',
          widget: 'text',
          defaultValue: '懂你的人',
          rules: [{ required: true, message: '姓名字段必填', trigger: 'blur' }],
        }, // name
        {
          type: 'string',
          title: '性别',
          name: 'gender',
          widget: 'select',
          defaultValue: 'male',
          xProps: {
            options: [
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
            ],
          },
        }, // gender
        {
          type: 'boolean',
          title: '职业状态',
          name: 'active',
          widget: 'radio',
          rules: [
            { required: true, message: '请选择职业状态', trigger: 'blur' },
          ],
          xProps: {
            options: [
              { label: '在职', value: true },
              { label: '离职', value: false },
            ],
          },
        }, // active
        {
          type: 'string',
          title: '职业',
          name: 'profession',
          widget: 'select',
          xProps: {
            multiple: true,
            options: [
              { label: '职业1', value: 'p1' },
              { label: '职业2', value: 'p2' },
              { label: '职业3', value: 'p3' },
            ],
          },
        }, // profession
        {
          type: 'array',
          title: '希望工作的城市',
          name: 'address',
          widget: 'checkbox',
          xProps: {
            options: [
              { label: '成都', value: 'cd' },
              { label: '重庆', value: 'cq' },
              { label: '月球', value: 'moon' },
            ],
          },
        }, // address
      ]
    },
  },

  /* eslint-disable no-console */
  methods: {
    handleFormEffects(subscribe, { setFieldState }) {
      subscribe('onFieldInit', (fields) => {
        if (fields.profession) {
          fields.profession.ifRender = false
        }
      })

      subscribe('onFieldChange', 'active', (value, form, activeRef) => {
        console.log(form, activeRef)
        setFieldState('profession', (proRef) => {
          proRef.ifRender = value
        })
      })
    },

    onSubmit(values) {
      console.log(values)
    },
  },
}
</script>

<style lang="scss">
.FormWrapper {
  width: 50%;
}
</style>
