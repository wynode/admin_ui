import WrapSelect from './component/WrapSelect'
import WrapRadioGroup from './component/WrapRadioGroup'
import WrapCheckboxGroup from './component/WrapCheckboxGroup'
import Upload from './component/Upload'
import InputNumberRange from './component/InputNumberRange'
// import UEditor from './component/UEditor'
import DynamicLabels from './component/DynamicLabels'
import MultipleInput from './component/MultipleInput'

export default {
  text: {
    component: 'el-input',
  },

  radio: {
    component: WrapRadioGroup,
  },

  checkbox: {
    component: WrapCheckboxGroup,
  },

  select: {
    component: WrapSelect,
  },

  // UEditor: {
  //   component: UEditor,
  // },

  datetimepicker: {
    component: 'el-date-picker',
    xProps: {
      rangeSeparator: '至',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      placeholder: '请选择时间',
      'value-format': 'yyyy-MM-dd HH:mm:ss',
    },
  },

  cascader: {
    component: 'el-cascader',
  },

  inputNumber: {
    component: 'el-input-number',
  },

  inputNumberRange: {
    component: InputNumberRange,
  },

  upload: {
    component: Upload,
  },

  dynamicLabels: {
    component: DynamicLabels,
  },

  multipleInput: {
    component: MultipleInput,
  },
}
