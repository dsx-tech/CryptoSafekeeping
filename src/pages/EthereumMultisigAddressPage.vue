<template>
 <div class="q-pa-sm">
   <q-card class="no-margin">
   <h6> Your name:</h6>
   <p> {{name}} </p>
   <h6> Your address:</h6>
   <p> {{address}} </p>
   <q-item class="flex flex-center">
      <button @click="ExportKey()"> Export your public key </button>
   </q-item>
   </q-card>
   <h6>Owners:</h6>
   <ul>
       <li v-for="item in ownersList" :key="item">{{ item }}</li>
   </ul>
   <q-item class="flex flex-center">
    <button @click="ScanForMultisig(key, holders, signs, BufferKeyList)"> Sign transaction </button>
  </q-item>
  <button @click="Back()">Back</button>
 </div>
</template>

<script>
export default{
  data(){
   return{
    show: false, 
    signs: this.$route.params.signs,
    holders: this.$route.params.holders,
    ownersList: this.$route.params.ownersList,
    address: this.$route.params.address,
    name: this.$route.params.name
   }
  },
  methods: {
    ExportKey(key){
    if (key !== Boolean(false)) {
            cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, key, function (success) {
              alert('encode success: ' + success)
            }, function (fail) {
              alert('encoding failed: ' + fail)
            }
            )
          } else {
            alert('error')
          }
    },
    Back(){
        this.$router.push ({name: 'Ethereum' })
    }  
  }
}
</script>
