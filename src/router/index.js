// import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('./login/index.vue');
const Index = () => import('./index/index.vue');
const Product = () => import('./product/index.vue');
const Order = () => import('./order/index.vue');
const Reservearea = () => import('./reservearea/index.vue');
const Delivery = () => import('./delivery/index.vue');

const Weight = () => import('./weight/index.vue');
const OrderWeight = () => import('./weight/order_index.vue');

Vue.use(Router);

export default new Router({
  mode: 'hash', // history, hash
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }, 
    {
      path: '/home',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/home/product',
          name: 'product',
          component: Product,
          children: []
        },
        {
          path: '/home/order',
          name: 'order',
          component: Order,
          children: []
        },
        {
          path: '/home/reservearea',
          name: 'reservearea',
          component: Reservearea,
          children: []
        },
        {
          path: '/home/delivery',
          name: 'delivery',
          component: Delivery,
          children: []
        }
        
      ]
    },
    {
      path: '/weight',
      name: 'weight',
      component: Weight,
    },
    {
      path: '/oweight',
      name: 'oweight',
      component: OrderWeight,
    }
  ]
});
