
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/bitcoin', component: () => import('pages/BitcoinPage.vue') },
      {
      path: '/BitcoinMultisigAddressPage/:key?/:signs?/:holders?/:keyList?/:address?/:name?',
      component: () => import('pages/BitcoinMultisigAddressPage.vue'), 
      name: 'BitcoinMultisigPage'
      },
      {
        path:'/BitcoinAddressPage/:key?/:name?/:address?', 
        component: () => import('pages/BitcoinAddressPage.vue'), 
        name: 'BitcoinPage' 
      },
      { path: '/ethereum', component: () => import('pages/EthereumPage.vue') },
      { path: '/startPage', component: () => import('pages/Index.vue') },
      { path: '/addresses', component: () => import('pages/addresses.vue') },
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
