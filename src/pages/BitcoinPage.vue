
<template>
  <q-page>
  <q-dialog v-model="inception">
      <q-card>
        <q-card-section>
          <div class="text-h6">Enter wallet name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="walletName" autofocus @keyup.enter="CountDialog = false"  />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Choose wallet type</div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Standart" @click="Address(String(walletName))" v-close-popup/>
          <q-btn flat label="Multisig" @click="GoToSettings(String(walletName))" v-close-popup/>
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
          <q-btn flat label="Ок" @click="GoToSettings()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="CountRequared" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Select the number of signatures required to use your wallet(maximum 15)</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="countSigns" autofocus @keyup.enter="CountRequared = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Ok" @click="GoToSettings()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    


   <div class="q-pa-md" style="max-width: 600px">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="addresses" label="Addresses" />
        <q-tab name="multisig" label="Multisig addresses" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="addresses">
          <q-list>
             <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>

           <q-item-section>
          <q-item-label @click= "GoToAddress(contact.name, contact.address, contact.key)">{{ contact.name }}</q-item-label>
        </q-item-section>

      </q-item>
     </q-list>
          
        </q-tab-panel>

        <q-tab-panel name="multisig">
           <q-list>
                 <q-item v-for="multisigContact in multisigContacts" :key="multisigContact.id" class="q-my-sm" clickable v-ripple>
               <q-item-section>
                  <q-item-label @click= "GoToMultisigAddress(multisigContact.key, multisigContact.holders, multisigContact.signs, multisigContact.keylist, multisigContact.address, multisigContact.name)">{{ multisigContact.name }}</q-item-label>
               </q-item-section>
                 </q-item>
                </q-list>
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
       <q-item class="flex flex-center">
      <button class="nextButton" @click="inception = true"> New Address </button>
    </q-item>
    <button class="nextButton" @click="GoBack()"> Back </button>
  </div>
  </q-page>
</template>
<script src="../scripts/Bitcoin/index.js"></script>

