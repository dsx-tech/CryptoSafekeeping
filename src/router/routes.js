
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/bitcoin', component: () => import('pages/BitcoinPage.vue') },
      { path: '/ethereum', component: () => import('pages/EthereumPage.vue') },
      { path: '/startPage', component: () => import('pages/Index.vue') },
      { path: '/AddressPage', component: () => import('pages/AddressPage.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
