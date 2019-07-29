import axios from 'axios'
import store from '@/store'
import httpCode from './httpCode'

const requestService = axios.create({
  baseURL: '/DVAAP/v1',
  timeout: 600000
})

let requestTimes = 0
requestService.interceptors.request.use(
  config => {
    store.commit('showLoading', true)
    ++requestTimes
    return config
  },
  error => {
    store.commit('showLoading', false)
    --requestTimes
    console.error('[request error]: ', error)
    Promise.reject(error)
  }
)

requestService.interceptors.response.use(
  response => {
    !--requestTimes && store.commit('showLoading', false)
    if (response.data && response.status === 200) {
      return response.data
    }else {
      return Promise.reject("出现错误，请检查算子流以及算子流配置信息！")
    }

   // return Promise.reject(response.data.message)
  },
  error => {
    !--requestTimes && store.commit('showLoading', false)
    return Promise.reject(error)
  }
)

export default requestService
