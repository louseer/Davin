import Vue from 'vue'
import VueRouter from 'vue-router'
import Console from 'pages/console/index'
import Project from 'pages/project/index'
import Preview from 'pages/project/preview'
import Dashboard from 'pages/project/dashboard'
import Report from 'pages/project/report'
import Analysis from 'pages/project/analysis'
import DashboardList from 'pages/project/dashboardlist'
import ReportsList from 'pages/project/reportslist'
import Roles from 'pages/project/roles'
import Users from 'pages/project/users'
import DataSources from 'pages/project/datasources'
import Tables from 'pages/project/tables'
import SQLModels from 'pages/project/sqlmodels'
import DataMap from 'pages/project/datamap'
import Setting from 'pages/project/setting'
import DomCanvas from 'pages/databoard/index.vue';
import formEditor from 'pages/reportform/edit.vue';
import Edit from 'pages/databoard/edit.vue';

Vue.use(VueRouter)
const routes = [
  {
    path:'/',
    name:'home',
    redirect: { path:'/edie' }
  },
  {
    path:'/edie',
    name:'edie',
    component:Edit
  },
  // {
  //   path:'/edit/dashboard',
  //   name:'editdashboard',
  //   component:dashboardEditor,
  // },
  {
    path:'/edit/form/:id',
    name:'editform',
    component:formEditor,
  },
  {
    path:'/project/:proId',
    name:'project',
    component:Project,
    children:[
      {
        path:'preview',
        name:'preview',
        component:Preview,
        children:[
          {
            path:'dashboard/:id',
            name:'dashboard',
            component:Dashboard
          },
          {
            path:'report/:id',
            name:'report',
            component:Report
          },
          {
            path:'analysis/:id',
            name:'analysis',
            component:Analysis
          }
        ]
      },
      {
        path:'dashboards',
        name:'dashboards',
        component:DashboardList
      },
      {
        path:'reports',
        name:'reports',
        component:ReportsList
      },
      {
        path:'roles',
        name:'roles',
        component:Roles
      },
      {
        path:'users',
        name:'users',
        component:Users
      },
      {
        path:'datasources',
        name:'datasources',
        component:DataSources
      },
      {
        path:'tables',
        name:'tables',
        component:Tables
      },
      {
        path:'sqlmodels',
        name:'sqlmodels',
        component:SQLModels
      },
      {
        path:'datamap',
        name:'datamap',
        component:DataMap
      },
      {
        path:'setting',
        name:'setting',
        component:Setting
      },
      {
        path:'/domcanvas',
        name:'domcanvas',
        component:DomCanvas
      }
    ]
  },
  // {
  //   path:'/',
  //   name:'home',
  //   component:Console,
  //   children:[
  //     {
  //       path:'help',
  //       components:[

  //       ]
  //     }
  //   ]
  // }
]

export default new VueRouter({
  routes
})