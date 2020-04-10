export default {
  name: 'WrapCheckboxGroup',

  render() {
    const { options, value, ...others } = this.$attrs
    const children = options.map((child) => {
      return <el-checkbox label={child.value}>{child.label}</el-checkbox>
    })

    return (
      <el-checkbox-group
        {...{ attrs: others }}
        value={value == null ? [] : value}
        onInput={(val) => {
          this.$emit('input', val)
        }}>
        {children}
      </el-checkbox-group>
    )
  },
}
