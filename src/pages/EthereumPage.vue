<template>
  <q-page>
  <q-item class="flex flex-center">
    <button @click="Address"> New Address </button>
  </q-item>
  <q-item class="flex flex-center">
    <button @click="MultisigAddress"> New Multisignature Address </button>
  </q-item>
  <q-item class="flex flex-center">
    <button @click="Scan">ScanQRCode</button>
  </q-item>
  <q-item class="flex flex-center">
    <button @click="CallMultiSig">Create Multisignature Transaction</button>
  </q-item>
  <q-item class="flex flex-center">
    <button @click="ConfirmMultiSig">Confirm Multisignature Transaction</button>
  </q-item>
  <q-item class="flex flex-center">
    <button @click="TokenContract">TokenContract</button>
  </q-item>
  <q-item class="flex flex-center">
    <button @click="TokenMultiContractSubmit">Token Multi-Sig Contract Submition</button>
  </q-item>

  <div class="q-pa-md" style="max-width: 350px">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Addresses</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>

        <q-item-section>
          <q-item-label @click= "GoToAddress(contact.name, contact.address, contact.key)">{{ contact.name }}</q-item-label>
        </q-item-section>

      </q-item>
    </q-list>
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Multisig addresses</q-toolbar-title>
    </q-toolbar>
    </q-list>
     <q-list bordered>
      <q-item v-for="multisigContact in multisigContacts" :key="multisigContact.id" class="q-my-sm" clickable v-ripple>

        <q-item-section>
          <q-item-label @click= "GoToMultisigAddress(multisigContact.key, multisigContact.holders, multisigContact.signs, multisigContact.keyList, multisigContact.address, multisigContact.name)">{{ multisigContact.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-item class="flex flex-center">
      <button @click="inception = true"> New Address </button>
    </q-item>
  </div>

  <q-dialog v-model="inception">
      <q-card>
        <q-card-section>
          <div class="text-h6">Choose wallet type</div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Standart" @click="Address" v-close-popup/>
          <q-btn flat label="Multisig" @click="CountDialog = true" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="CountDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Choose the number of address holders(maximum 15)</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="countHolders" autofocus @keyup.enter="CountDialog = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Ок" @click="CountRequared = true" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="CountRequared" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Select the number of signatures required to use your wallet(maximum 15)</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="owners" type="textarea" float-label="Textarea" :max-height="100" :min-rows="7" />
          <q-input dense v-model="countSigns" autofocus @keyup.enter="CountRequared = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Ok" @click="MultisigAddress(Number(countHolders), Number(countSigns), String(owners))" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <canvas id="qr"></canvas>
  </q-page>
    
  </div>
</template>

<style>
  #qr{
     margin-left: 15%;
    margin-right: 15%;
     width:70%;
  }
</style>

<script src="../scripts/Ethereum/index.js"></script>
