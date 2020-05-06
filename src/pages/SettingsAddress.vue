<template>
<q-page>
  <div v-if = "done">
        <q-card-section>
          <div class="text" >Choose the number of address holders(maximum 15)</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dark filled  class = "text" dense v-model="countHolders" autofocus @keyup.enter="CountDialog = false" />
        </q-card-section>

        <q-card-section>
          <div class="text">Select the number of signatures required to use your wallet(maximum 15)</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input  dark filled class="text" dense v-model="countSigns" autofocus @keyup.enter="CountRequared = false" />
        </q-card-section>

         <q-card-section>
          <div class="text">Your name:</div>
        </q-card-section>

          <q-card-section style="color=white">
          <q-input   dark filled class = "text" dense v-model="yourName" autofocus @keyup.enter="Count = false" />
        </q-card-section>
        <div class="row justify-between" style="padding: 20px 0px">
          <p class="text">Choose the net:</p>
          <q-select class="col-2" style="text-transform: uppercase;" outlined v-model="chosenNet" :options="nets"/>
        </div>
        <button class="mainButton" @click="Back()">Back </button>
        <button class="mainButton" @click="BackInform(countHolders, countSigns, name, yourName, chosenNet)"> OK </button>
  </div>
  <div v-else>
        <q-card-section>
        <div>
          <p class = "white">Your private key:<br>{{ privateKey }}</p>
           <p class = "white">Your public key:<br>{{ publicKey }}</p>
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
      nets: ['bitcoin', 'testnet', 'regtest'],
      chosenNet: '',
    }
  },
  methods: {
    Back(){
      this.$router.go(-1)
    },
    BackInform(holders, signs, name, userName, net){
      
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
        managBD.InsertMultisigDb('', name, yourKey.toWIF(), holders, signs, json, net) 
      }
      else alert("error")
    },
  }
}
</script>

<style src="../css/Bitcoin/Bitcoin.css"></style>