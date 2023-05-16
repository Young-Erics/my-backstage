import request from '@/utils/request'
// 登录，获取信息
export function loginsso(params) {
  return request({
    url: '/loginsso',
    params
  })
}
// 获取菜单
export function getMenu() {
  return request({
    url: '/sysmenu'
  })
}
