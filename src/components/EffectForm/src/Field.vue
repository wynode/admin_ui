<template>
  <el-form-item
    v-if="ifRender"
    :label="title"
    :prop="name"
    :rules="rules"
    :error="fieldErrorMsg"
  >
    <component
      v-if="currentWidget"
      v-model="fieldValue"
      v-bind="myProps"
      :is="currentWidget.component"
      style="width: 90%"
    ></component>
    <span v-if="myProps.ext">{{ myProps.ext }}</span>
    <p v-if="myProps.remark" class="field_remark">{{ myProps.remark }}</p>
  </el-form-item>
</template>

<script>
import widgets from './widgets'

export default {
  name: 'EffectFormField',

  inject: ['form', 'registerField'],

  props: {
    type: String, // TODO 可以做字段类型校验
    title: String,
    name: String,
    widget: [String, Function], // Function 具体返回一个 VNode
    xProps: Object, // 存放具体的表单组件所需属性，目前支持 element-ui
    rules: Array,
    fileList: Array,
    defaultValue: null,
    effect: {
      // TODO 实现
      type: Function,
      default: () => null,
    },
    customWidget: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      ifRender: true,
      fieldErrorMsg: '',
    }
  },

  computed: {
    currentWidget() {
      // TODO 配置组件不存在时，渲染出错提示组件 Notify
      return this.customWidget || widgets[this.widget] || null
    },

    myProps() {
      if (this.currentWidget) {
        return {
          ...this.currentWidget.xProps,
          ...this.xProps,
        }
      }
      return this.xProps
    },

    fieldValue: {
      get() {
        return this.form[this.name]
      },
      set(nextValue) {
        // NOTE 这里的 $set 是清除表单数据后，恢复和 EffectForm.form 双向绑定的关键
        this.$set(this.form, this.name, nextValue)
      },
    },
  },

  mounted() {
    if (this.defaultValue) {
      this.fieldValue = this.defaultValue
    }

    this.registerField(this.name, this)
  },
}
</script>

<style lang="scss">
.field_remark {
  margin-bottom: -18px;
  line-height: 1.5;
  color: #999;
  font-size: 14px;
}
</style>
