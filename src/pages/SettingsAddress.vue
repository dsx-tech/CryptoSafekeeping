<template>
<q-page>
  <div v-if = "done">
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

         <q-card-section>
          <div class="text-h6">Your name:</div>
        </q-card-section>

          <q-card-section class="q-pt-none">
          <q-input dense v-model="yourName" autofocus @keyup.enter="Count = false" />
        </q-card-section>
        <button class="nextButton" @click="Back()">Back </button>
        <button class="nextButton" @click="BackInform(countHolders, countSigns, name, yourName)"> OK </button>
  </div>
  <div v-else>
        <q-card-section>
        <div>
          <p>Your private key:<br>{{ privateKey }}</p>
           <p>Your public key:<br>{{ publicKey }}</p>
        </div>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <button class="nextButton" @click="Back()">Back </button>
          
        </q-card-actions>
  </div>
</q-page>
</template>
<script>
import managBD from 'src/scripts/Bitcoin/ManagBD.js'
import settings from 'src/scripts/Bitcoin/settings.js'
let bitcoin = require('bitcoinjs-lib')

export default {
  data () {
    return {
      done: true,
      countHolders: '',
      countSigns: '',
      privateKey:'',
      publicKey:'',
      yourName:'',
      name: this.$route.params.name,
    }
  },
  methods: {
    Back(){
      this.$router.go(-1)
    },
    BackInform(holders, signs, name, userName){
      
      if(holders != 0 || signs != 0)
      { 
        this.done = false
        var yourKey = bitcoin.ECPair.makeRandom({ network: settings.data() }) 
        this.privateKey = yourKey.privateKey.toString('hex')
        this.publicKey = yourKey.publicKey.toString('hex')
        let user = [{
          name: userName,
          key: this.publicKey
        }]
        let json = JSON.stringify(user);
        console.log(json)
        managBD.InsertMultisigDb('', name, yourKey.toWIF(), holders, signs, json) 
      }
      else alert("error")
    },
  }
}
</script>