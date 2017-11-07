import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Content from '@/components/content'
import Search from '@/components/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/content',
      name: 'Content',
      component: Content
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
