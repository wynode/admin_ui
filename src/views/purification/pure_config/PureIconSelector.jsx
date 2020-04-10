export default {
  name: 'PureIconSelector',

  props: {
    value: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      current: null,
    }
  },

  computed: {
    icons() {
      return this.$attrs.icons || []
    },
  },

  watch: {
    value() {
      this.current = this.value || null
    },
  },

  methods: {
    onSelect(item) {
      this.$emit('input', item.id)
    },
  },

  render() {
    let cardStyle = {
      display: 'inline-block',
      width: '60px',
      height: '60px',
      marginRight: '10px',
      padding: '5px',
      borderColor: 'transparent',
    }
    let cardSelectStyle = {
      display: 'inline-block',
      width: '60px',
      height: '60px',
      marginRight: '10px',
      padding: '5px',
      borderColor: '#845bea',
    }
    let imgStyle = {
      width: '100%',
      height: 'auto',
    }
    return (
      <div>
        {this.icons.map((item) => {
          return (
            <el-card
              style={item.id === this.current ? cardSelectStyle : cardStyle}
              body-style={{ padding: '0px' }}
              shadow="hover">
              <img
                onClick={() => this.onSelect(item)}
                style={imgStyle}
                src={item.lock_url}
                alt={item.name}
              />
            </el-card>
          )
        })}
      </div>
    )
  },
}
