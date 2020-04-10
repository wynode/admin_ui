export default {
  name: 'WrapSelect',

  methods: {
    backupValue(multiple) {
      return multiple ? [] : ''
    },
  },

  render() {
    const { options, ...others } = this.$attrs
    let children = ''
    if (options) {
      children = options.map((child) => {
        return <el-option label={child.label} value={child.value}></el-option>
      })
    }

    return (
      <el-select
        {...{ attrs: others }}
        class="Wst"
        onInput={(val) => {
          this.$emit('input', val)
        }}>
        {children}
      </el-select>
    )
  },
}
