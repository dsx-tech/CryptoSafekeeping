<template>
<q-page>
        <q-card-section>
          <div class="text-h6">Choose the number of address holders(maximum 15)</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="countHolders" autofocus @keyup.enter="CountDialog = false" />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Select the number of signatures required to use your wallet(maximum 15)</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="countSigns" autofocus @keyup.enter="CountRequared = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <button class="nextButton" @click="Back()">Back </button>
          <button class="nextButton" @click="BackInform(countHolders, countSigns, name)"> OK </button>
        </q-card-actions>

        <q-card-section>
        <div>
          <p>{{ privateKey }}</p>
           <p>{{ publicKey }}</p>
        </div>
        </q-card-section>
</q-page>
</template>
<script>
import managBD from 'src/scripts/Bitcoin/ManagBD.js'
import settings from 'src/scripts/Bitcoin/settings.js'
let bitcoin = require('bitcoinjs-lib')

export default {
  data () {
    return {
      countHolders: '',
      countSigns: '',
      privateKey:'',
      publicKey:'',
      name: this.$route.params.name,
    }
  },
  methods: {
    Back(){
      this.$router.go(-1)
    },
    BackInform(holders, signs, name){
      if(holders != 0 || signs != 0)
      { 
        var yourKey = bitcoin.ECPair.makeRandom({ network: settings.data() }) 
        this.privateKey = yourKey.privateKey.toString('hex')
        this.publicKey = yourKey.publicKey.toString('hex')
        managBD.InsertMultisigDb('', name, yourKey.toWIF(), holders, signs, '')
        this.$router.go(-1) }
      else alert("error")
    },
  }
}
</script>