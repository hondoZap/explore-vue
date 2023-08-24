import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '@/views/HomeView.vue'
// import InfoCard from './components/InfoCard.vue'
import MarketPlaceView from '@/views/MarketPlaceView.vue'
import ItemView from '@/views/ItemView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import SalesTab from '@/views/Marketplace/SalesTab.vue'
import SwagTab from '@/views/Marketplace/SwagTab.vue'
import ClearanceTab from '@/views/Marketplace/ClearanceTab.vue'
import IdeasTab from '@/views/Marketplace/IdeasTab.vue'
import SpecialRequestsTab from '@/views/Marketplace/SpecialRequestsTab.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/market',
    },
    {
      path: '/market',
      name: 'marketplace',
      component: MarketPlaceView,
      children: [
        {
          path: 'sales',
          name: 'sales_tab',
          component: SalesTab,
        },
        {
          path: 'swag',
          name: 'swag_tab',
          component: SwagTab,
        },
        {
          path: 'clearance',
          name: 'clearance_tab',
          component: ClearanceTab,
        },
        {
          path: 'ideas',
          name: 'ideas_tab',
          component: IdeasTab,
        },
        {
          path: 'specialrequests',
          name: 'special_requests_tab',
          component: SpecialRequestsTab,
        },
      ],
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
