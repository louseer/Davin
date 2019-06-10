export default {
  state: {
    userInfo: {
      name: 'user-暂无'
    }
  },

  mutations: {
    setUserInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: {
    async getUserInfo (context) {
      let result = await new Promise((resolve) => {
        setTimeout(() => {
          context.commit('setUserInfo', { name: '夏天阳' })
          resolve({ name: '夏天阳' })
        }, 1000)
      })
      return result
    }
  }
}
