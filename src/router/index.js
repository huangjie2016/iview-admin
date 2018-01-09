import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/Login'
import User from '@/views/user'
import Table from '@/components/table'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/table',
          title: 'table',
          name: 'Table',
          component: Table
        },
        {
          path: '/user',
          title: 'user',
          name: 'User',
          component: User
        },
      ]
    },
    {
      path: '/login',
      title: 'title',
      name: 'login',
      component: Login
    }
  ]
})
