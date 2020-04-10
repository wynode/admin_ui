import filters from './filters'
import components from './components'

const plugins = [{ plugin: components }, { plugin: filters }]

const install = (Vue) => {
  plugins.forEach(({ plugin, options }) => {
    Vue.use(plugin, options || {})
  })
}

export default { install }
