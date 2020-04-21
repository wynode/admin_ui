<template>
  <el-form ref="effectForm" :model="form" v-bind="formAttrs">
    <slot></slot>

    <slot name="btnGroup">
      <div v-if="needToolBtnGroup" class="effect_btn_group">
        <el-button type="primary" size="small" @click="onSubmit">
          {{ submitText }}
        </el-button>
        <el-button plain size="small" @click="onCancel">
          {{ cancelText }}
        </el-button>
      </div>
    </slot>
  </el-form>
</template>

<script>
export default {
  name: 'EffectForm',

  provide() {
    return {
      form: this.form,
      registerField: this._registerField,
    }
  },

  props: {
    needToolBtnGroup: {
      type: Boolean,
      default: true,
    },

    submitText: {
      type: String,
      default: '确定',
    },

    cancelText: {
      type: String,
      default: '取消',
    },

    validator: {
      type: [Boolean, Function],
      default: false,
    },

    effects: {
      type: Function,
      default: () => undefined,
    },
  },

  data() {
    return {
      form: {},
      fields: {},
    }
  },

  computed: {
    formAttrs() {
      /* eslint-disable no-unused-vars */
      const { validator, ...formAttrs } = this.$attrs
      return formAttrs
    },
  },

  methods: {
    // 注册表单组件
    _registerField(fieldName, instance) {
      this.$set(this.fields, fieldName, instance)
    },

    // 获取当前表单字段实例
    _getCurrentField(fieldName) {
      return this.fields[fieldName] || null
    },

    // 表单字段变化时触发
    _onFieldChange(fieldName, callback) {
      return this.$watch(`form.${fieldName}`, (newVal, oldVal) => {
        if (oldVal !== newVal) {
          const field = this._getCurrentField(fieldName)
          callback(newVal, this.form, field)
        }
      })
    },

    // 表单字段初始化完毕后触发
    _onFieldInit(callback) {
      // TODO 最好的实现是每调用一次 _registerField 就触发 callback
      this.$nextTick(() => {
        callback(this.fields, this)
      })
    },

    /**
     * @method
     * 订阅表单事件
     * NOTE 考虑不提供给外部使用
     */
    subscribe(event, ...args) {
      if (event === 'onFieldInit') {
        const [callback] = args
        return this._onFieldInit(callback)
      }

      if (event === 'onFieldChange') {
        const [fieldName, callback] = args
        return this._onFieldChange(fieldName, callback)
      }
    },

    /**
     * @method
     * 设置表单字段参数
     * NOTE 考虑不提供给外部使用
     */
    setFieldState(fieldName, callback) {
      const thisField = this.fields[fieldName]
      callback(thisField)
    },

    /**
     * @method
     * 获取表单所有字段键对值
     */
    getForm() {
      return this.form
    },

    /**
     * @method
     * 更改表单字段值
     */
    setForm(fieldName, newVal) {
      this.$set(this.form, fieldName, newVal)
    },

    /**
     * @method
     * 设置表单字段错误信息，与 el-form-item error 属性相同
     * formErrors 一定为 Object
     */
    setFieldError(formErrors) {
      Object.keys(formErrors).forEach((fieldName) => {
        const errMsg = formErrors[fieldName]
        this.setFieldState(fieldName, (field) => {
          if (field) {
            // NOTE element-ui 内部对手动设置 error 使用了 watch 监听，以下操作仅仅为了让 error 的值产生变化；
            field.fieldErrorMsg = ''
            this.$nextTick(() => {
              field.fieldErrorMsg = errMsg
            })
          }
        })
      })
    },

    /**
     * @method
     * 表单校验
     */
    async useValidator() {
      const result = await this.$refs.effectForm.validate().catch(() => false)
      this.$emit('validate', result)
      if (result) {
        this.$emit('submit', this.form)
      }
      return result
    },

    /**
     * 重置表单，移除所有表单字段的值和双向绑定，移除所有表单字段校验信息。
     * TODO 重置表单考虑使用 defaultValue 恢复表单默认值。
     * HACK 这里表单的数据重置，el-form 只能依赖于 clearValidate，使用 resetFields 会导致数据的双向绑定失效。
     */
    resetFormFields() {
      Object.keys(this.fields).forEach((fieldName) => {
        /**
         * NOTE 这里虽然 $delete 中断了数据绑定，一旦操作表单字段后，Field 组件里会重新使用 $set 建立新的绑定，
         * 详见 Field 组件 fieldValue 计算属性的实现。
         */
        this.$delete(this.form, fieldName)
      })

      this.$nextTick(() => {
        this.$refs.effectForm.clearValidate()
      })
    },
    // 重置除了时间外（_time）的表单
    resetExceptTimeFormFields() {
      Object.keys(this.fields).forEach((fieldName) => {
        if (!fieldName.includes('_time')) {
          this.$delete(this.form, fieldName)
        }
      })

      this.$nextTick(() => {
        this.$refs.effectForm.clearValidate()
      })
    },

    /**
     * @method
     * 提交表单
     */
    onSubmit() {
      if (this.validator) {
        this.useValidator()
      } else {
        this.$emit('submit', this.form)
      }
    },

    /**
     * @method
     * 重置表单
     */
    onCancel() {
      this.resetFormFields()
      this.$emit('cancel')
    },
  },

  mounted() {
    this.effects(this.subscribe, {
      setFieldState: this.setFieldState,
      setForm: this.setForm,
    })
  },
}
</script>
