import get from 'lodash/get'
import * as dateFormat from '@/utils/dateFormat'
import { byteToMGb } from '@/utils/common'
import { translate } from '@/utils/mappings'

const filters = {}
export default filters.install = (Vue) => {
  Vue.filter('date', dateFormat.dateFormat)
  Vue.filter('byteToMGb', byteToMGb)
  Vue.filter('translate', translate)
  Vue.filter('getter', (value, path, defaultValue = '') => {
    return get(value, path, defaultValue)
  })
}
