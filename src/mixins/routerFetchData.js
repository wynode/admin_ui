import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('injectData', ['fetchAllTags']),
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchAllTags()
    })
  },

  beforeRouteUpdate(to, from, next) {
    this.fetchAllTags()
    next()
  },
}
