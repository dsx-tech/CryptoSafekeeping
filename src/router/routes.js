
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/bitcoin', component: () => import('pages/BitcoinPage.vue') },
      { path: '/EthereumMultisigCreationPage/:walletName?', component: () => import('pages/EthereumMultisigCreationPage.vue'), name: 'EthereumMultisigCreation'},   
      { path: '/EthereumMultisigAddressPage/:signs?/:holders?/:ownersList?/:address?/:name?', component: () => import('pages/EthereumMultisigAddressPage.vue'), name: 'EthereumMultisigPage'},
      { path: '/EthereumAddressPage/:key?/:name?/:address?', component: () => import('pages/EthereumAddressPage.vue'), name: 'EthereumPage'},

      { path: '/ethereum', component: () => import('pages/EthereumPage.vue') },
      { path: '/startPage', component: () => import('pages/Index.vue') },
      //{ path: '/AddressPage', component: () => import('pages/AddressPage.vue') },
      { path: '/BitcoinMultisigAddressPage/:key?/:signs?/:holders?/:keyList?/:address?/:name?', component: () => import('pages/BitcoinMultisigAddressPage.vue'), name: 'BitcoinMultisigPage'},
      { path: '/BitcoinAddressPage/:key?/:name?/:address?', component: () => import('pages/BitcoinAddressPage.vue'), name: 'BitcoinPage'},
      { path: '/addresses', component: () => import('pages/addresses.vue') },

      { path: '/ethereum', component: () => import('pages/EthereumPage.vue'), name: 'Ethereum' },
      { path: '/startPage', component: () => import('pages/Index.vue') },
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
