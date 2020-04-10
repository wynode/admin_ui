export default {
  name: 'WrapRadioGroup',

  render() {
    const { options, ...others } = this.$attrs
    const radioChildren = options.map((child) => {
      return <el-radio label={child.value}>{child.label}</el-radio>
    })

    return (
      <el-radio-group
        {...{ attrs: others }}
        onInput={(val) => {
          this.$emit('input', val)
        }}>
        {radioChildren}
      </el-radio-group>
    )
  },
}
