import resource from '@/utils/resource'
import request from '@/utils/request'
const qs = require('qs')

export function getchartmock (url) {
  return request({
    url: url,
    method: 'get'
  })
}


export function getFormData (id) {
  return request({
    url: `/form.json?formid=${id}`,
    method: 'get'
  })
}

export function updateLayoutReq (params) {
  const {layout} = params
  return request({
    url: `/form.json`,
    method: 'post',
    params:{layout}
  })
}

export function getChartData (url) {
  return request({
    url,
    method: 'get'
  })
}

