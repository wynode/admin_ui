export const types = {
  toggleDialog: 'toggleDialog',
}

const dialogInit = {
  visible: false,
  title: '',
  footer: true,
  closeAuto: true,
  meta: {}, // 存放一些额外的数据，比如一个编辑弹窗，可以将回填的数据存放在这里；
  component: () => {},
  onConfirm: () => {},
  onCancel: () => {},
  onClose: () => {},
  onOpen: () => {},
}

/* eslint-disable no-param-reassign */
export default {
  namespaced: true,

  state: {
    assignOrderVis: { ...dialogInit },
    followup: { ...dialogInit },
    infoResult: { ...dialogInit },
    contactResult: { ...dialogInit },
    finallyResult: { ...dialogInit },
    rollBack: { ...dialogInit },
    dialogHub: { ...dialogInit },
  },

  mutations: {
    [types.toggleDialog](state, { name, reset, ...options }) {
      if (reset) {
        state[name] = { ...dialogInit }
      } else {
        state[name] = { ...state[name], ...options }
      }
    },
  },

  actions: {
    toggleDialog({ commit }, data) {
      commit(types.toggleDialog, data)
    },
  },

  getters: {},
}
