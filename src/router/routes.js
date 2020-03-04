
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/bitcoin', component: () => import('pages/BitcoinPage.vue'), name: 'Bitcoin' },
      { path: '/ethereum', component: () => import('pages/EthereumPage.vue') },
      { path: '/startPage', component: () => import('pages/Index.vue') },
      { path: '/AddressPage', component: () => import('pages/AddressPage.vue') },
      { path: '/BitcoinMultisigAddressPage/:key?/:signs?/:holders?/:keyList?/:address?/:name?', component: () => import('pages/BitcoinMultisigAddressPage.vue'), name: 'BitcoinMultisigPage'},
      { path: '/BitcoinAddressPage/:key?/:name?/:address?', component: () => import('pages/BitcoinAddressPage.vue'), name: 'BitcoinPage'}
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
