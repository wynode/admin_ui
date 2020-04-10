<script>
export default {
  name: 'AsideMenu',

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    renderMenuItem() {
      const { title, icon, router, perms } = this.item
      if (!this.$_auth.verify(perms)) {
        return null
      }
      return (
        <el-menu-item index={router.name} route={router}>
          {icon ? <i class={icon}></i> : null}
          <span slot="title">{title}</span>
        </el-menu-item>
      )
    },

    renderSubMenu() {
      const { title, icon, svgIcon, children, perms } = this.item
      if (!this.$_auth.verify(perms)) {
        return null
      }
      return (
        <el-submenu index={title}>
          <template slot="title">
            {icon ? <i class={icon}></i> : null}
            {svgIcon ? (
              <svg class="svgIcon">
                <use xlinkHref={`#${svgIcon}`}></use>
              </svg>
            ) : null}
            <span>{title}</span>
          </template>
          {children.map((childItem) => (
            <AsideMenu item={childItem} />
          ))}
        </el-submenu>
      )
    },
  },

  render() {
    return Array.isArray(this.item.children) && this.item.children.length
      ? this.renderSubMenu()
      : this.renderMenuItem()
  },
}
</script>
