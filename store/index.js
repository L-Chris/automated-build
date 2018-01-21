import Vue from 'vue'
import Vuex from 'vuex'
import User from '~/services/models/User'
import {parsePath, filterBy, parseRoutesToMenu} from '~/utils'
import {routes} from '~/utils/const'
import * as types from './mutation-types'

Vue.use(Vuex)

export default () => new Vuex.Store({
  state: {
    routes,
    user: {
      permission: []
    }
  },
  getters: {
    menuList: state => {
      let routes = JSON.parse(JSON.stringify(state.routes))
      const permissionMap = parsePath('permissionMap')(state.user)
      if (!permissionMap) return []
      filterBy(routes, v => !(v.meta && v.meta.permission) || permissionMap[v.meta.permission])
      return parseRoutesToMenu(routes)
    }
  },
  mutations: {
    [types.SET_USER] (state, data) {
      state.user = data
    }
  },
  actions: {
    async findCurrentUser ({commit}, params) {
      let res = await User.findCurrent()
      commit(types.SET_USER, res)
      return res
    },
    async login ({account, password, remember = true} = {}) {
      let res = await User.login({account, password})
      if (remember) {
        localStorage.setItem('account', account)
        localStorage.setItem('password', password)
      }
      return res
    },
    async autoLogin ({dispatch, state}) {
      await dispatch('findCurrentUser')
      if (state.user.id) return
      const {account, password} = localStorage
      if (!account || !password) return
      await dispatch('login', {account, password}).then(async (res) => {
        await dispatch('findCurrentUser')
      }).catch(err => {
        console.log(err)
        localStorage.removeItem('account')
        localStorage.removeItem('password')
        Promise.resolve(500)
      })
    },
    async logout () {
      await User.logout()
      localStorage.removeItem('account')
      localStorage.removeItem('password')
    }
  },
  modules: {
  },
  strict: process.env.NODE_ENV !== 'production'
})
