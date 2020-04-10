export default {
  name: 'InputNumberRanger',

  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      minVal: this.value[0],
      maxVal: this.value[1],
    }
  },

  methods: {
    minChange(val) {
      this.$emit('input', [val, this.maxVal])
    },

    maxChange(val) {
      this.$emit('input', [this.minVal, val])
    },
  },

  render() {
    this.minVal = this.value[0]
    this.maxVal = this.value[1]

    return (
      <div class="Whsnw">
        <el-input-number
          {...{ attrs: this.$attrs }}
          placeholder="最小值"
          value={this.minVal}
          onInput={this.minChange}
        />
        <span class="Di el-icon-minus"></span>
        <el-input-number
          {...{ attrs: this.$attrs }}
          placeholder="最大值"
          value={this.maxVal}
          onInput={this.maxChange}
        />
      </div>
    )
  },
}
