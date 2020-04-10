/*  eslint-disable prefer-rest-params,no-plusplus,prefer-spread */

/**
 *
 * @param {String} componentName
 * @param {String} eventName
 * @param {Array} params
 */
function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    const name = child.$options.name

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params))
    }
  })
}

export default {
  methods: {
    broadcast(componentName, eventName, ...params) {
      // params is Array
      broadcast.call(this, componentName, eventName, params)
    },

    dispatch(componentName, eventName, ...params) {
      let parent = this.$parent || this.$root // 没有父节点的时候，在组件内部扩散事件
      let { name } = parent.$options

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.componentName
        }
      }

      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
  },
}
