import Layout from '@/layout/index.vue'
// import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/originmonitormana',
    component: Layout,
    redirect: '/originmonitormana/sourcePanorama',
    meta: { title: '数据源端检测管理' },
    alwayShow: true,
    children: [
      {
        path: 'collectionDemandPlan',
        name: 'collectionDemandPlan',
        component: () => import('@/views/originmonitormana/collectionDemandPlan.vue'),
        meta: { title: '采集需求计划', cache: true }
      },
      {
        path: 'sourcePanorama',
        name: 'sourcePanorama',
        component: () => import('@/views/originmonitormana/sourcePanorama.vue'),
        meta: { title: '数据来源全景', cache: true }
      },
      {
        path: 'orgClassification',
        name: 'orgClassification',
        component: () => import('@/views/originmonitormana/orgClassification.vue'),
        meta: { title: '来源机构分类', cache: true }
      }
    ]
  },
  {
    path: '/collectionmonitormana',
    component: Layout,
    // redirect: '/collectionmonitormana/collectionLedgerDetail',
    meta: { title: '数据采集检测管理' },
    alwayShow: true,
    children: [
      {
        path: 'collectionLedgerOrg',
        name: 'collectionLedgerOrg',
        component: () => import('@/views/collectionmonitormana/collectionLedgerorg.vue'),
        meta: { title: '数据采集台账(机构)', cache: true },
        children: [
          {
            path: 'collectionFigure',
            name: 'collectionFigure',
            component: () => import('@/views/collectionmonitormana/collectionFigure.vue'),
            meta: { title: '采集台账一览（图形）', cache: true }
          },
          {
            path: 'collectionList',
            name: 'collectionList',
            component: () => import('@/views/collectionmonitormana/collectionList.vue'),
            meta: { title: '采集台账一览（列表）', cache: true }
          }
        ]
      },
      {
        path: 'collectionReport',
        name: 'collectionReport',
        component: () => import('@/views/collectionmonitormana/collectionReport.vue'),
        meta: { title: '数据采集报告', cache: true }
      }
    ]
  },
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
        meta: { title: '数据采集台账(明细)', cache: true, hideTabs: true }
      }
    ]
  },
  {
    path: '/medicaltreatment',
    component: Layout,
    meta: { title: '医疗救治专项检测' },
    alwayShow: true,
    children: [
      {
        path: 'keyIndex',
        name: 'keyIndex',
        component: () => import('@/views/medicaltreatment/keyIndex.vue'),
        meta: { title: '14项重点指标检测', cache: true }
      }
    ]
  },
  // 按科室查看详情
  {
    path: '/departmentDetail',
    component: Layout,
    meta: { title: '14项重点指标检测' },
    hideMenu: true,
    children: [
      {
        path: 'depdetail',
        name: 'depdetail',
        component: () => import('@/views/departmentDetail/index.vue'),
        meta: { title: '按科室查看详情', cache: true, hideTabs: true }
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
        meta: { title: '按人员查看详情', cache: true, hideTabs: true }
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
        meta: { title: '查看住院信息', cache: true, hideTabs: true }
      },
      {
        path: 'outpatient',
        name: 'outpatient',
        component: () => import('@/views/personDetail/outpatient.vue'),
        meta: { title: '查看门诊信息', cache: true, hideTabs: true }
      },
      {
        path: 'medicalRecord',
        name: 'medicalRecord',
        component: () => import('@/views/personDetail/medicalRecord.vue'),
        meta: { title: '查看电子病历', cache: true, hideTabs: true }
      },
      {
        path: 'operation',
        name: 'operation',
        component: () => import('@/views/personDetail/operation.vue'),
        meta: { title: '查看手术信息', cache: true, hideTabs: true }
      }
    ]
  },
  //
  {
    path: '/sharedmonitormanage',
    component: Layout,
    meta: { title: '数据共享监控管理' },
    alwayShow: true,
    children: [
      {
        path: 'sharedMonitorLedger',
        name: 'sharedMonitorLedger',
        component: () => import('@/views/sharedmonitormanage/sharedMonitorLedger.vue'),
        meta: { title: '共享监控台账', cache: true }
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
        meta: { title: '共享表单情况', cache: true, hideTabs: true }
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
        meta: { title: '共享记录情况', cache: true, hideTabs: true }
      }
    ]
  },
  {
    path: '/function',
    component: Layout,
    meta: { title: '功能' },
    alwayShow: true,
    children: [
      {
        path: 'icons',
        name: 'icons',
        component: () => import('@/views/function/icons/icons.vue'),
        meta: { title: '图标方案', cache: true }
      }
    ]
  },
  {
    path: '/directive',
    component: Layout,
    meta: { title: '指令' },
    alwayShow: true,
    children: [
      {
        path: 'custom',
        name: 'custom',
        component: () => import('@/views/directive/custom.vue'),
        meta: { title: '自定义指令', cache: true }
      }
    ]
  }
]

export default route
