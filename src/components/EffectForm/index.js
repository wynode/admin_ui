import EffectForm from './src/EffectForm.vue'
import EffectFormField from './src/Field.vue'

const install = function(Vue) {
  Vue.component(EffectForm.name, EffectForm)
  Vue.component(EffectFormField.name, EffectFormField)
}

export default {
  install,
  EffectForm,
  EffectFormField,
}
