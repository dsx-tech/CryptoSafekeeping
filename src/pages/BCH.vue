<template>
  <q-page>
    <q-dialog v-model="creating" class="dialog">
      <q-card>
        <q-card-section>
        <div>
          <div>
            <p>Wallet name:</p>
            <q-input filled autofocus v-model="walletName" :placeholder="walletName"/>
          </div>
          <div>
            <p>Choose the net:</p>
            <q-select outlined v-model="chosenNet" :options="nets"/>
          </div>
        </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Create" color="primary" v-close-popup @click="Address(String(walletName), String(chosenNet))"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
          <q-btn label="Standart" @click="creating = true" v-close-popup style="margin: 10px 20px"/>
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
    
    <q-dialog v-model="importKey">
      <q-card class="dialog" style="width: 500px; max-width: 80vw; margin: auto;">
        <q-card-section>
          <div class="text-h6">
              <p>Enter wallet name</p>
            </div>
          <q-input dense v-model="walletName" autofocus @keyup.enter="CountDialog = false"  />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">
            <p>Choose the network:</p>
          </div>
          <q-select outlined v-model="chosenNet" :options="nets"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="importKey = false" v-close-popup/>
          <q-btn flat label="Import key" @click="ImportKey(String(walletName), String(chosenNet))" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>


    <div v-if="showCamera" class="camera">
      <qrcode-stream :camera="camera" @decode="onDecode">
      </qrcode-stream>
      <q-btn label="Cancel" class="mainButton" @click="showCamera = false"/>
    </div>



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
          <q-item-label @click= "GoToAddress(contact.name, contact.address, contact.key, contact.net)">{{ contact.name }}</q-item-label>
        </q-item-section>

      </q-item>
     </q-list>
          
        </q-tab-panel>

        <q-tab-panel name="multisig">
           <q-list>
                 <q-item v-for="multisigContact in multisigContacts" :key="multisigContact.id" class="q-my-sm" clickable v-ripple>
               <q-item-section>
                  <q-item-label @click= "GoToMultisigAddress(multisigContact.key, multisigContact.holders, multisigContact.signs, multisigContact.keylist, multisigContact.address, multisigContact.name, multisigContact.net)">{{ multisigContact.name }}</q-item-label>
               </q-item-section>
                 </q-item>
                </q-list>
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
      <q-item class="flex flex-center row" style="padding: 8px 0px">
        <button class="mainButton col" @click="importKey = true" style="height: 100px"> Import private key </button>
        <button class="mainButton col" @click="inception = true" style="height: 100px"> New Address </button>
      </q-item>
    <button class="mainButton" @click="GoBack()" style="margin: 10px 20px"> Back </button>
  </div>
  </q-page>
</template>
<script src="../scripts/BCH/index.js"></script>
<style src="../css/BCH/BCH.css"></style>