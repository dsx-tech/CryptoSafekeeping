
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/bitcoin/:signs?/:holders?', component: () => import('pages/BitcoinPage.vue'), name: 'Bitcoin' },
      { path: '/EthereumMultisigCreationPage/:walletName?', component: () => import('pages/EthereumMultisigCreationPage.vue'), name: 'EthereumMultisigCreation'},   
      { path: '/EthereumMultisigAddressPage/:signs?/:holders?/:keylist?/:address?/:name?', component: () => import('pages/EthereumMultisigAddressPage.vue'), name: 'EthereumMultisigPage'},
      { path: '/EthereumAddressPage/:key?/:name?/:address?', component: () => import('pages/EthereumAddressPage.vue'), name: 'EthereumPage'},
      { path: '/BitcoinMultisigAddressPage/:key?/:signs?/:holders?/:keyList?/:address?/:name?', component: () => import('pages/BitcoinMultisigAddressPage.vue'), name: 'BitcoinMultisigPage'},
      { path: '/BitcoinAddressPage/:key?/:name?/:address?', component: () => import('pages/BitcoinAddressPage.vue'), name: 'BitcoinPage'},
      { path: '/addresses', component: () => import('pages/addresses.vue') },
      { path: '/ethereum', component: () => import('pages/EthereumPage.vue'), name: 'Ethereum' },
      { path: '/startPage', component: () => import('pages/Index.vue') },
      { path: '/settingsAddress/:name?', component: () => import('pages/SettingsAddress.vue'), name: 'SettingsPage' },
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
