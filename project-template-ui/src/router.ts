import { createRouter, createWebHashHistory } from 'vue-router'
//import HomeView from '@/views/HomeView.vue'
//import InfoCard from './components/InfoCard.vue'
import MarketPlaceView from '@/views/MarketPlaceView.vue'
import ItemView from '@/views/ItemView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'marketplace',
      component: MarketPlaceView,
    },
    {
      path: '/item',
      name: 'item',
      component: ItemView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },
  ],
})

export default router
