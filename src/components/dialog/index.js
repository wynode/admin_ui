import Component from './Dialog'
import store from '@/stores'

function Dialog(Vue, data, renderContent) {
  const instance = new Vue({
    store,
    render(h) {
      let children = renderContent ? renderContent(h) : []
      if (!Array.isArray(renderContent)) {
        children = [children]
      }
      return h(
        Component,
        {
          props: {
            ...data,
          },
        },
        children
      )
    },
    methods: {
      init() {
        document.body.appendChild(this.$el)
      },

      destroy() {
        this.$destroy()
        document.body.removeChild(this.$el)
      },
    },
  })
  instance.$mount()
  instance.init()
  return instance.$children[0]
}

function install(Vue) {
  Vue.prototype.$createDialog = Dialog.bind(this, Vue)
}

export default { install }
