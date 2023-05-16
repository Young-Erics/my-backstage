import Layout from '@/layout/index.vue'
const route = [
  {
    path: '/collectionLedgerOrg',
    component: Layout,
    meta: { title: '数据采集台账(机构)' },
    hideMenu: true,
    children: [
      {
        path: 'collectionLedgerDetail',
        name: 'collectionLedgerDetail',
        component: () => import('@/views/collectionmonitormana/collectionLedgerDetail.vue'),
        meta: { title: '数据采集台账(明细)', cache: false, hideTabs: true }
      }
    ]
  },
  // 采集需求详情
  {
    path: '/collectionDemandPlan',
    component: Layout,
    meta: { title: '采集需求计划' },
    hideMenu: true,
    children: [
      {
        path: 'collectionDetail',
        name: 'collectionDetail',
        component: () => import('@/views/originmonitormana/collectionDetail.vue'),
        meta: { title: '采集需求详情', cache: false, hideTabs: true }
      }
    ]
  },
  // 按科室查看详情
  {
    path: '/departmentDetail',
    component: Layout,
    meta: { title: '重点指标检测' },
    hideMenu: true,
    children: [
      {
        path: 'depdetail',
        name: 'depdetail',
        component: () => import('@/views/departmentDetail/index.vue'),
        meta: { title: '按科室查看详情', cache: false, hideTabs: true }
      }
    ]
  },
  // 按人员查看详情
  {
    path: '/personDetail',
    component: Layout,
    meta: { title: '按科室查看详情' },
    hideMenu: true,
    children: [
      {
        path: 'perdetail',
        name: 'perdetail',
        component: () => import('@/views/personDetail/index.vue'),
        meta: { title: '按人员查看详情', cache: false, hideTabs: true }
      }
    ]
  },
  // 按人员查问题
  {
    path: '/personQue',
    component: Layout,
    redirect: '/personQue/inHospital',
    meta: { title: '按人员查看详情' },
    hideMenu: true,
    children: [
      {
        path: 'inHospital',
        name: 'inHospital',
        component: () => import('@/views/personDetail/inHospital.vue'),
        meta: { title: '查看住院信息', cache: false, hideTabs: true }
      },
      {
        path: 'outpatient',
        name: 'outpatient',
        component: () => import('@/views/personDetail/outpatient.vue'),
        meta: { title: '查看门诊信息', cache: false, hideTabs: true }
      },
      {
        path: 'medicalRecord',
        name: 'medicalRecord',
        component: () => import('@/views/personDetail/medicalRecord.vue'),
        meta: { title: '查看电子病历', cache: false, hideTabs: true }
      },
      {
        path: 'operation',
        name: 'operation',
        component: () => import('@/views/personDetail/operation.vue'),
        meta: { title: '查看手术信息', cache: false, hideTabs: true }
      }
    ]
  },
  {
    path: '/sharedMonitorLedger',
    component: Layout,
    meta: { title: '共享监控台账' },
    hideMenu: true,
    children: [
      {
        path: 'sharedForm',
        name: 'sharedForm',
        component: () => import('@/views/sharedmonitormanage/sharedForm.vue'),
        meta: { title: '共享表单情况', cache: false, hideTabs: true }
      }
    ]
  },
  {
    path: '/sharedForm',
    component: Layout,
    meta: { title: '共享表单情况' },
    hideMenu: true,
    children: [
      {
        path: 'sharedRecord',
        name: 'sharedRecord',
        component: () => import('@/views/sharedmonitormanage/sharedRecord.vue'),
        meta: { title: '共享记录情况', cache: false, hideTabs: true }
      }
    ]
  }
]
export default route
