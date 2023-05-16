import request from '@/utils/request'
/**
 *  获取所有行政区划
 */
export function getAllArea() {
  return request({
    url: '/seachareaall'
  })
}
/**
 * 5.1.8.	依据用户权限获取行政区划 error
 */
export function getAuthArea() {
  return request({
    url: '/seachareaself'
  })
}
/**
 * 5.1.9.	依据行政区划获取机构
 */
export function getOrgByArea(params) {
  return request({
    url: '/seachorgareacd',
    params
  })
}
/**
 * 数据采集台账（机构）
 */
export function getOrgLedger(data) {
  return request({
    url: '/seachactorglst',
    method: 'post',
    data
  })
}
/**
 *  数据采集台账（明细）
 */
export function getDetailLedger(data) {
  return request({
    url: '/seachacttablst',
    method: 'post',
    data
  })
}
/**
 *  重点指标检测
 */
export function getKeyIndex(data) {
  return request({
    url: '/seachfocalorglst',
    method: 'post',
    data
  })
}
// 按科室查看详情
export function checkDepDetail(data) {
  return request({
    url: '/seachfocaldeptlst',
    method: 'post',
    data
  })
}
// 获取业务指标分类
export function getBusiType(params) {
  return request({
    url: '/seachbusitype',
    params
  })
}
// 按人员查看列表
export function getPersonList(data) {
  return request({
    url: '/seachfocalpsonlst',
    method: 'post',
    data
  })
}
// 按人员查看详情
export function getPersonDetail(data) {
  return request({
    url: '/seachproblemdata',
    method: 'post',
    data
  })
}
