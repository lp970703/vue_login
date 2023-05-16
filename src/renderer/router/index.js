/*
 * @Description: 
 * @Author: 
 * @Date: 2021-09-22 14:17:09
 * @LastEditTime: 2023-04-27 16:03:33
 * @LastEditors: weiguo.cao weiguo.cao@cyclone-robotics@example.com
 * @Reference: 
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// export default new Router({
let router = new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/renderer/components/page/login/login'),
    },
    {
      path: '/404',
      name: 'notfount',
      component: () => import('@/renderer/components/common/404'),
    },
    {
      path: '/403',
      name: 'notlogin',
      component: () => import('@/renderer/components/common/403'),
    },
    {
      path: '/HelloWorld',
      name: 'helloWorld',
      component: () => import('@/renderer/components/page/HelloWorld'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/renderer/components/page/login/register'),
    },
  ]
})
export default router
// router.beforeEach((to,from,next)=>{
//   if(to.meta.length>0&&localStorage.getItem('roles')){
//     var promise=localStorage.getItem('roles')
//     let result = false;
//     for(var item of promise){
//         if(to.meta.includes(item)){
//             result = true;
//             break;
//         }
//     }
//     if(result){
//       next()
//     }else{
//       next({
//         path: '/404',
//       })
//     }
//   }else{
//     next()
//   }
// })